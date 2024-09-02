/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: '#f8f8f8',
        dark: '#171717',
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
}