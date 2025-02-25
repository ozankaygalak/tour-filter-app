/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      zIndex: {
        20: '20',
        30: '30',
        50: '50',
        100: '100',
      },
      colors: {
        primary: {
          400: "#F2A945",
          500: "#F78410",
          600: "#E07516",
        },
      },
    },
  },
  plugins: [],
}
