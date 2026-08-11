import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        botanical: {
          background: '#060807',
          text: '#f0eee7',
          muted: '#9d9e96',
          accent: '#c48a2a',
          moss: '#758050',
        },
      },
      fontFamily: {
        editorial: ['"Instrument Serif"', 'Georgia', 'serif'],
        interface: ['"DM Sans"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
