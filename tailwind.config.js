/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "hbblue-0.5": "#DEEDFD",
        "hbblue-1": "#BDDCFB",
        "hbblue-2": "#2D9CDB",
        "hbblue-3": "#2F80ED",
        "hbgreen-1": "#219653",
        "hblightpurple": "#9B51E033",
        "figma-grey": "#C4C4C440"
      },
    },
  },
  plugins: [],
}