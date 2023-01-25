import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

type HabitsListProps = {
  date: Date;
  handleCompletedChange: (completed: number, newAmount: number) => void;
};

type HabitsInfo = {
  possibleHabits: {
    id: string;
    title: string;
    createdAt: String;
  }[];
  completedHabits: string[];
};

function HabitsList({ date, handleCompletedChange }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  useEffect(() => {
    api
      .get("day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => setHabitsInfo(response.data));
  }, []);

  async function handleToggleHabit(habitId: string) {
    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    handleCompletedChange(
      completedHabits.length,
      habitsInfo!.possibleHabits.length
    );

    await api.patch(`/togglehabit/${habitId}/${date.toDateString()}`);
  }

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            onCheckedChange={() => handleToggleHabit(habit.id)}
            key={habit.id}
            defaultChecked={habitsInfo.completedHabits.includes(habit.id)}
            disabled={false}
            className="flex items-center gap-3 group"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border border-solid border-zinc-800 group-data-[state=checked]:bg-BTN-base group-data-[state=checked]:border-BTN-b3 transition-colors">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-slate-300">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}

export default HabitsList;
