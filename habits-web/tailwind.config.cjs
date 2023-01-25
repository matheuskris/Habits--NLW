/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary300: "var(--theme-1)",
        primary400: "var(--theme-2)",
        primary500: "var(--theme-3)",
        primary600: "var(--theme-4)",
        primary700: "var(--theme-5)",
        primary800: "var(--theme-6)",
        primary900: "var(--theme-7)",
        txt: {
          base: "var(--txt-base)",
          placeholder: "var(--txt-placeholder)",
          checked: "var(--txt-checked)",
        },
        BGC: {
          900: "var(--bg-900)",
          800: "var(--bg-800)",
          700: "var(--bg-700)",
        },
        BTN: {
          base: "var(--button-base)",
          b2: "var(--button-2)",
          b3: "var(--button-3)",
        },
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
