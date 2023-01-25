import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import dayjs from "dayjs";
import z, { string } from "zod";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (req) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(req.body);

    const habits = await prisma.habit.create({
      data: {
        title,
        created_at: dayjs().subtract(1, "day").toDate(),
        weekDays: {
          create: weekDays.map((weekDay) => ({ week_day: weekDay })),
        },
      },
    });

    return habits;
  });

  app.get("/day", async (req) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(req.query);

    const parsedDate = dayjs(date).startOf("day");
    const dateToFindHabits = parsedDate.add(1, "day");
    const weekDay = dayjs(parsedDate).get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: dateToFindHabits.toDate(),
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits =
      day?.dayHabits.map((dayHabit) => dayHabit.habit_id) ?? [];

    return { possibleHabits, completedHabits, parsedDate, date };
  });

  app.patch("/togglehabit/:id/:date", async (req) => {
    const toggleHabitsParams = z.object({
      id: z.string().uuid(),
      date: z.coerce.date(),
    });

    const { id, date } = toggleHabitsParams.parse(req.params);

    const dayToChange = dayjs(date).startOf("day").toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: dayToChange,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: dayToChange,
        },
      });
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }

    return { success: "oi" };
  });

  app.get("/summary", async () => {
    const summary = await prisma.$queryRaw`
      SELECT
        D.id,
        D.date,
        (
          SELECT 
            cast(count(*) as float)
          FROM day_habits DH 
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
            on H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(strftime("%w", D.date/1000.0, "unixepoch") as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `;
    return summary;
  });

  app.get("/habit", async (req) => {
    const getHabitParams = z.object({
      habitId: z.string().uuid(),
    });

    const { habitId } = getHabitParams.parse(req.query);

    const habit = await prisma.habit.findUnique({
      where: {
        id: habitId,
      },
      include: {
        weekDays: true,
      },
    });

    return habit;
  });
}
