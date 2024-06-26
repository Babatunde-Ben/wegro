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
      },
      animation: {
        "infinite-scroll": "infinite-scroll 20s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
    plugins: [],
  },
};
