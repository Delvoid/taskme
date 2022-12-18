/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "red-primary": "#EC4E6E",
        default: "#878FA6",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
