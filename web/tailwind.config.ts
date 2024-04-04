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
    // colors: {
      
    //   white: '#FFFFFF',
    //   offwhite: "#FEFEFE",

    //   slate: '#00101C',
    // },
    fontFamily: {
      roboto: ['Roboto Condensed', 'sans-serif'],
      anon: ['Anonymous Pro', 'monospace'],
    },
  },
  plugins: [],
};
export default config;
