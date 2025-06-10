/** @type {import('tailwindcss').Config} */
import textStroke from 'tailwindcss-text-stroke';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-greyd': '#353839',
        'custom-yellow': '#CCDE1A',
        'custom-green' : '#168108',
        'custom-greenl' : '#69AD32',
        'custom-linear1' : '#A4CE82',
        'custom-linear2' : '#3B951B',
        'custom-grey' : '#E7E7E7',
        'custom-greyl' : '#D9D9D9',
      },
    screens: {
      'sm': '640px',
      'md': '768px',
      'mid': '837px',
      'custom': '915px', // Custom breakpoint pour la navbar
      'lg': '1024px',
      'xl': '1280px',
    },
    },
  },
  plugins: [textStroke],
}

