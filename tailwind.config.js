/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: {
      light: {
        primary: '#FF6B6B',
        'base-100': '#FFFFFF',
      },
      dark: {
        primary: '#4A90E2',
        'base-100': '#1F2937',
      },
    },
  },
}
