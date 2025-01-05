/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hackbio-green': '#27AE60',
        'hackbio-green-light': '#27AE6033',  
        'hackbio-yellow': '#FFAC11',
        'hb-black': '#02133F',
        'hb-bg-green': '#F5FAF5',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}