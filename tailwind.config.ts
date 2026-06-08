import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        plum: '#452B30',
        mauve: '#74404C',
        cream: '#F3ECD8',
        'cream-dk': '#EAE0C8',
        sage: '#C7C79E',
        'sage-dk': '#9e9e72',
        text: '#452B30',
        'text-mid': '#74404C',
        muted: '#9e8a80',
        border: 'rgba(69,43,48,0.12)',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        'dm': ['var(--font-dm-sans)', 'sans-serif'],
      },
      animation: {
        slideIn: 'slideIn 0.35s ease',
        shake: 'shake 0.4s ease',
      },
      keyframes: {
        slideIn: {
          from: { opacity: '0', transform: 'translateX(18px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
