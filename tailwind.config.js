/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enables dark: prefix
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Consistent typography
      },
      colors: {
        primary: '#007BFF', // Accent
      },
      animation: {
        'pulse-slow': 'pulse 2s infinite',
      },
    },
  },
  plugins: [],
};