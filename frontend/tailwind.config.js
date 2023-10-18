/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./src/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        "light-background": "#e6e6e6",
        "light-border": "#c4c4c4",

        "light-theme-green": "#0f6313",
        "light-theme-green-active": "#0c4a0f",
      },
    },
  },
  plugins: [],
}