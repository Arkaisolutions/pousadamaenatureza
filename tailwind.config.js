/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'nature-green': {
          light: '#A7D7C5',
          DEFAULT: '#74B7A1',
          dark: '#5C8D77',
        },
        'nature-brown': {
          light: '#E6D4B8',
          DEFAULT: '#D3B893',
          dark: '#A17C5B',
        },
        'nature-text': '#3C3C3C',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
