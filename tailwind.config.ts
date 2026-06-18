import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette (same branding as the app)
        ink: '#0A050A', // main background — near-black with wine tint
        magenta: {
          DEFAULT: '#E91E63', // primary CTAs / accents
          bright: '#FF1A6B', // glows
        },
        lime: '#C6FF00', // energetic accent
        muted: '#B0A4AE', // secondary text
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderColor: {
        subtle: 'rgba(255,255,255,0.08)',
      },
      backgroundColor: {
        subtle: 'rgba(255,255,255,0.04)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(233,30,99,0.55)',
        'glow-lg': '0 0 80px -10px rgba(255,26,107,0.65)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'scroll-hint': {
          '0%': { opacity: '0', transform: 'translateY(0)' },
          '40%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(12px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        float: 'float 4s ease-in-out infinite',
        'scroll-hint': 'scroll-hint 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
