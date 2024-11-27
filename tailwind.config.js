/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"
  ],
  safelist: [
    'bg-[url(./images/sunny.jpg)]',
    'bg-[url(./images/rainy.jpg)]',
    'bg-[url(./images/snowy.jpg)]',
    'bg-[url(./images/windy.jpg)]',
    'bg-[url(./images/foggy.jpg)]',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sunny': "url('./src/images/sunny.jpg')",
        'rainy': "url('./src/images/sunny.jpg')",
        'snowy': "url('./src/images/snowy.jpg')",
        'windy': "url('./src/images/windy.jpg')",
        'foggy': "url('./src/images/foggy.jpg')",
      }
    },
  },
  plugins: [],
}