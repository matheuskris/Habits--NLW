import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, FormEventHandler, useState } from "react";
import { api } from "../../lib/axios";

const availableWeekDay = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];
type FormFields = {
  title: string;
  weekDays: number[];
};
const initialFormFields: FormFields = {
  title: "",
  weekDays: [],
};

function NewHabitForm() {
  const [formFields, setFormFields] = useState(initialFormFields);

  function handleWeekDay(e: Checkbox.CheckedState, weekDayIndex: number) {
    const isChecked = e.valueOf();
    const newWeekDays = Array.from(formFields.weekDays);
    if (isChecked) {
      newWeekDays.push(weekDayIndex);
      setFormFields({
        ...formFields,
        weekDays: newWeekDays,
      });
    } else {
      const NWD = newWeekDays.filter((WD) => WD !== weekDayIndex);
      setFormFields({
        ...formFields,
        weekDays: NWD,
      });
    }
  }

  async function handleCreateNewHabit(e: FormEvent) {
    e.preventDefault();

    if (!formFields.title || formFields.weekDays.length === 0) {
      return;
    }

    await api.post("habits", formFields);

    console.log(formFields);
    alert("Hábito criado com sucesso");
    setFormFields(initialFormFields);
  }

  return (
    <>
      <form
        onSubmit={handleCreateNewHabit}
        className="w-full flex flex-col mt-6"
      >
        <label htmlFor="title" className="font-semibold leading-tight">
          Qual seu comprometimento?
        </label>
        <input
          type="text"
          id="title"
          placeholder="ex.: dormir, exercitar etc"
          autoFocus
          className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
          value={formFields.title}
          onChange={(e) =>
            setFormFields({ ...formFields, title: e.target.value })
          }
        />
        <label htmlFor="" className="font-semibold leading-tight mt-4">
          Qual a recorrência
        </label>

        <div className="flex flex-col gap-2 mt-3">
          {availableWeekDay.map((weekDay, i) => (
            <Checkbox.Root
              key={weekDay}
              className="flex items-center gap-3 group"
              checked={formFields.weekDays.includes(i)}
              onCheckedChange={(e) => handleWeekDay(e, i)}
            >
              <div className="h-8 w-8 transition-colors rounded-lg flex items-center justify-center bg-zinc-900 border border-solid border-zinc-800 group-data-[state=checked]:bg-BTN-base group-data-[state=checked]:border-BTN-b3">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white leading-tight">{weekDay}</span>
            </Checkbox.Root>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-BTN-base hover:bg-BTN-b2 transition-colors"
        >
          Confirmar
        </button>
      </form>
    </>
  );
}

export default NewHabitForm;
