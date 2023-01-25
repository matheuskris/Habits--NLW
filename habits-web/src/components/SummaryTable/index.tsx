import HabitSquare from "../HabitSquare";
import { generateDatesFromYearBeggining } from "../../utils/functions.utils";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDatesFromYearBeggining();
const minimunSquares = 18 * 7; //18 semanas
const amountToFill = minimunSquares - summaryDates.length;

type SummaryData = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

function SummaryTable() {
  const [summaryData, setSummaryData] = useState<SummaryData>([]);

  useEffect(() => {
    api.get("summary").then((response) => setSummaryData(response.data));
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, i) => (
          <div
            key={day + "-" + i}
            className="text-txt-placeholder text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryData.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summaryData.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });
            return (
              <HabitSquare
                defaultAmount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
                date={date}
                key={date.toString()}
              />
            );
          })}
        {amountToFill > 0 &&
          Array.from({ length: amountToFill }).map((_, i) => (
            <HabitSquare key={i} disabled />
          ))}
      </div>
    </div>
  );
}

export default SummaryTable;
