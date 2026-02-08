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
        'hotel-blue': {
          light: '#60A5FA', // Azul claro vibrante
          DEFAULT: '#2563EB', // Azul Royal padrão
          dark: '#1E3A8A', // Azul Marinho profundo
        },
        'hotel-slate': {
          light: '#F8FAFC', // Branco/Gelo
          DEFAULT: '#E2E8F0', // Cinza claro para fundos
          dark: '#64748B', // Cinza médio para bordas/detalhes
        },
        'hotel-text': '#1E293B', // Cinza escuro para texto (Slate 800)
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
