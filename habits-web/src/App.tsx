import Header from "./components/Header";
import SummaryTable from "./components/SummaryTable";
import { applyTheme } from "./styles/themes/utils";
import { skyTheme, darkTheme } from "./styles/themes/base";
import "./lib/dayjs";
import { useEffect } from "react";
import DarkModeSwitch from "./components/DarkModeSwitch";

function App() {
  useEffect(() => {
    applyTheme(skyTheme);
    applyTheme(darkTheme);
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
      <DarkModeSwitch />
    </div>
  );
}

export default App;
