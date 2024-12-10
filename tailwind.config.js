/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'md': '425px',
      },
      colors: {
        'primary': '#04AA6D',
      }
    },
  },
  plugins: [],
}

