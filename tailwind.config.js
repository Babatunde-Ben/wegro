/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F7F7F7",
          100: "#E6E6E6",
          200: "#BFBFBF",
          300: "#A6A6A6",
          400: "#7A7A7A",
          500: "#2F2F2F",
        },

        custom_green: {
          50: "#EEF7F2",
          100: "#D6EBE0",
          200: "#A9D6BE",
          300: "#87C5A4",
          400: "#35C076",
          500: "#00843E",
          600: "#006E34",
          700: "#005829",
          800: "#00421F",
        },
      },
    },
  },
  plugins: [],
};
