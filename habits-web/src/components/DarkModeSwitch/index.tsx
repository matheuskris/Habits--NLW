import * as Switch from "@radix-ui/react-switch";
import { applyTheme } from "../../styles/themes/utils";
import {
  violetTheme,
  darkTheme,
  tealTheme,
  skyTheme,
  limeTheme,
  brightTheme,
} from "../../styles/themes/base";

function DarkModeSwitch() {
  function handleDarkMode(checked: boolean) {
    console.log(checked);
    if (checked) {
      applyTheme(darkTheme);
    } else {
      applyTheme(brightTheme);
    }
  }

  return (
    <div className="absolute top-4 right-4 flex flex-col items-end gap-3">
      <form>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Switch.Root
            onCheckedChange={handleDarkMode}
            className="bg-white w-6 h-2 rounded-lg relative data-[state=checked]:bg-slate-700"
            id="airplane-mode"
          >
            <Switch.Thumb className="block -translate-x-2 -translate-y-1/4 data-[state=checked]:translate-x-4  transition-all rounded-xl w-4 h-4 bg-primary400 text-primary400" />
          </Switch.Root>
        </div>
      </form>
      <div>
        <ul className="flex flex-col gap-1">
          <li
            className="w-4 h-4 rounded-md border border-violet-500 bg-violet-400 hover:cursor-pointer hover:scale-105"
            onClick={() => {
              applyTheme(violetTheme);
            }}
          ></li>
          <li
            className="w-4 h-4 rounded-md border border-teal-500 bg-teal-400 hover:cursor-pointer hover:scale-105"
            onClick={() => {
              applyTheme(tealTheme);
            }}
          ></li>
          <li
            className="w-4 h-4 rounded-md border border-sky-500 bg-sky-400 hover:cursor-pointer hover:scale-105"
            onClick={() => {
              applyTheme(skyTheme);
            }}
          ></li>
          <li
            className="w-4 h-4 rounded-md border border-lime-500 bg-lime-400 hover:cursor-pointer hover:scale-105"
            onClick={() => {
              applyTheme(limeTheme);
            }}
          ></li>
        </ul>
      </div>
    </div>
  );
}

export default DarkModeSwitch;
