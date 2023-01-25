import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import ProgressBar from "../ProgressBar";
import clsx from "clsx";
import { Check } from "phosphor-react";
import dayjs from "dayjs";
import HabitsList from "../HabitsList/HabitsList";

type HabitsSquareProps = {
  defaultCompleted?: number;
  amount?: number;
  disabled?: boolean;
  date?: Date;
  defaultAmount?: number;
};

function HabitSquare({
  defaultCompleted,
  defaultAmount,
  disabled,
  date,
}: HabitsSquareProps) {
  const [completed, setCompleted] = useState(defaultCompleted);
  const [amount, setAmount] = useState(defaultAmount);

  const percent = completed && amount ? (completed * 100) / amount : 0;
  const maxPercent = Math.min(percent, 100);

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayAndWeek = dayjs(date).format("dddd");

  function handleCompletedChange(newCompleted: number, newAmount: number) {
    setCompleted(newCompleted);
    setAmount(newAmount);
  }

  return (
    <>
      <Popover.Root>
        <Popover.Trigger
          className={clsx(
            "w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors",
            {
              "opacity-40 cursor-not-allowed": disabled,
              "bg-BGC-800 border-BGC-700": percent === 0,
              "bg-primary900 border-primary700": percent !== 0 && percent < 20,
              "bg-primary800 border-primary600": percent >= 20 && percent < 40,
              "bg-primary700 border-primary500": percent >= 40 && percent < 60,
              "bg-primary600 border-primary400": percent >= 60 && percent < 80,
              "bg-primary500 border-primary300": percent >= 80,
            }
          )}
        />
        {/* <Popover.Anchor /> */}
        <Popover.Portal>
          <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
            <span className="font-semibold text-zinc-400">{dayAndWeek}</span>
            <span className="mt-1 font-extrabold leading-tight text-3xl">
              {dayAndMonth}
            </span>
            <ProgressBar progress={maxPercent} />

            {date && (
              <HabitsList
                date={date}
                handleCompletedChange={handleCompletedChange}
              />
            )}

            {/* <Popover.Close /> */}
            <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
}

export default HabitSquare;
