/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(0, 173, 162)",
        second: "rgb(14, 14, 14)",
        third: "rgba(0, 0, 0, 0.8)",
        test: "#f9f5ee",
        test1:"rgb(65, 117, 5)",
        test2:"rgb(236, 128, 0)",
        menu_color: "rgba(102, 102, 102, 0.85)",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
