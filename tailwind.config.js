/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./app/**/*.{html,ejs}'],
  theme: {
    extend: {
      colors: {
        'cs-n-white': '#F6F6F6',
        'cs-n-dark': '#333333',
      },
    },
  },
  plugins: [],
};
