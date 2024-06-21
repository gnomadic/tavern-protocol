import { Signika } from 'next/font/google';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
     tavernGreen:  '#14E943',
     lightgrey: "#858080",
     white: '#FFFFFF',
     black: '#000000',
     red: "#E94714",
     unselected: "#616161",
     selected: "#E3A9FF", 

      
    },
    fontFamily: {
      roboto: ['Roboto Condensed', 'sans-serif'],
      anon: ['Anonymous Pro', 'monospace'],
      // signika: ['Signika, sans-serif'],
      signika: ['var(--font-signika)'],
      outfit: ['var(--font-outfit)'],

    },
  },
  plugins: [],
};
export default config;
