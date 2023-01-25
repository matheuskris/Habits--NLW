import { Plus, X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import HabitsLogo from "../../assets/habitsLogo.svg";
import NewHabitForm from "../NewHabitForm";

function Header() {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between mb-8">
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="flex flex-row gap-1 ">
          <span className="w-4 h-4 rounded-md border border-BGC-700 bg-BGC-800" />
          <span className="w-4 h-4 rounded-md border border-primary800 bg-primary700" />
          <span className="w-4 h-4 rounded-md border border-primary700 bg-primary600" />
          <span className="w-4 h-4 rounded-md border border-primary600 bg-primary500" />
          <span className="w-4 h-4 rounded-md border border-primary500 bg-primary400" />
        </div>
        <h1 className="text-txt-base text-4xl">habits</h1>
      </div>

      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="text-txt-base border border-primary500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-primary300 transition-colors"
        >
          <Plus size={30} className="text-primary500" />
          Novo Hábito
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

          <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title className="text-3xl leadind-tight font-extrabold">
              Criar hábito
            </Dialog.Title>

            <NewHabitForm />

            <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200">
              <X size={24} aria-label="Fechar" />{" "}
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}

export default Header;
