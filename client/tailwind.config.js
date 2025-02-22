/** @type {import('tailwindcss').Config} */

import { transform } from 'framer-motion';

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flag-icon-css/css/flag-icon.min.css"
  ],
  theme: {
    fontFamily : {
      main: ['Poppins', 'sans-serif']
    },
    extend: {
      width: {
        main: '1220px'
      },
      backgroundColor: {
        main: '#ee3131'
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
        '6': '6 6 0%',
        '7': '7 7 0%',
        '8': '8 8 0%',
      },
      colors: {
        main: '#ee3131'
      },
      keyframes: {
        'slice-top-sm': {
          '0%': {
            'webkit-transform': 'translateY(8px)',
            transform: 'translateY(8px)'
          },
          '100%': {
            'webkit-transform': 'translateY(0px)',
            transform: 'translateY(0px)'
          }
        }
      },
      animation: {
        'slice-top-sm': 'slice-top-sm 0.2s linear both'
      }
    },
  },
  plugins: [ require("@tailwindcss/line-clamp")],
}
