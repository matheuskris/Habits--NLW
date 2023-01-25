import colors from "tailwindcss/colors";

export type TWbaseTheme = {
  "--theme-1"?: string;
  "--theme-2"?: string;
  "--theme-3"?: string;
  "--theme-4"?: string;
  "--theme-5"?: string;
  "--theme-6"?: string;
  "--theme-7"?: string;

  "--button-base"?: string;
  "--button-2"?: string;
  "--button-3"?: string;

  "--txt-base"?: string;
  "--txt-placeholder"?: string;
  "--txt-checked"?: string;

  "--bg-900"?: string;
  "--bg-800"?: string;
  "--bg-700"?: string;
};

export const darkTheme: TWbaseTheme = {
  "--txt-base": colors.black,
  "--txt-placeholder": colors.slate[700],
  "--txt-checked": colors.slate[600],

  "--bg-900": colors.zinc[200],
  "--bg-800": colors.zinc[300],
  "--bg-700": colors.zinc[400],
};

export const brightTheme: TWbaseTheme = {
  "--txt-base": colors.white,
  "--txt-placeholder": colors.slate[400],
  "--txt-checked": colors.slate[300],

  "--bg-900": colors.zinc[900],
  "--bg-800": colors.zinc[800],
  "--bg-700": colors.zinc[700],
};

export const violetTheme: TWbaseTheme = {
  "--theme-1": colors.violet[300],
  "--theme-2": colors.violet[400],
  "--theme-3": colors.violet[500],
  "--theme-4": colors.violet[600],
  "--theme-5": colors.violet[700],
  "--theme-6": colors.violet[800],
  "--theme-7": colors.violet[900],

  "--button-base": colors.green[500],
  "--button-2": colors.green[600],
  "--button-3": colors.green[700],
};

export const tealTheme: TWbaseTheme = {
  "--theme-1": colors.teal[300],
  "--theme-2": colors.teal[400],
  "--theme-3": colors.teal[500],
  "--theme-4": colors.teal[600],
  "--theme-5": colors.teal[700],
  "--theme-6": colors.teal[800],
  "--theme-7": colors.teal[900],

  "--button-base": colors.yellow[500],
  "--button-2": colors.yellow[600],
  "--button-3": colors.yellow[700],
};

export const skyTheme: TWbaseTheme = {
  "--theme-1": colors.sky[300],
  "--theme-2": colors.sky[400],
  "--theme-3": colors.sky[500],
  "--theme-4": colors.sky[600],
  "--theme-5": colors.sky[700],
  "--theme-6": colors.sky[800],
  "--theme-7": colors.sky[900],

  "--button-base": colors.lime[500],
  "--button-2": colors.lime[600],
  "--button-3": colors.lime[700],
};

export const limeTheme: TWbaseTheme = {
  "--theme-1": colors.lime[300],
  "--theme-3": colors.lime[500],
  "--theme-2": colors.lime[400],
  "--theme-4": colors.lime[600],
  "--theme-5": colors.lime[700],
  "--theme-6": colors.lime[800],
  "--theme-7": colors.lime[900],

  "--button-base": colors.pink[500],
  "--button-2": colors.pink[600],
  "--button-3": colors.pink[700],
};
