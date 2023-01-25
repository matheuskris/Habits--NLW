import { TWbaseTheme } from "./base";

export function applyTheme(theme: TWbaseTheme) {
  const root = document.documentElement;
  Object.keys(theme).forEach((cssVar) => {
    root.style.setProperty(cssVar, theme[cssVar as keyof TWbaseTheme]);
  });
}
