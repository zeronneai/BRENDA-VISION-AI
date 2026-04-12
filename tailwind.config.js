/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          pink: '#FF1493',
          'pink-light': '#FF69B4',
          'pink-dark': '#C71585',
          purple: '#9B27AF',
          'purple-light': '#CE93D8',
          'purple-dark': '#6A1B9A',
          gold: '#FFB800',
          'gold-light': '#FFD54F',
          dark: '#080810',
          'dark-2': '#0F0F1A',
          'dark-3': '#171726',
          'dark-4': '#1E1E30',
          card: 'rgba(255, 255, 255, 0.05)',
          'card-hover': 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-glow': 'rgba(255, 20, 147, 0.4)',
        }
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #FF1493, #9B27AF)',
        'gradient-brand-r': 'linear-gradient(135deg, #9B27AF, #FF1493)',
        'gradient-gold': 'linear-gradient(135deg, #FFB800, #FF6B00)',
        'gradient-dark': 'linear-gradient(180deg, #080810, #0F0F1A)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,20,147,0.1), rgba(155,39,175,0.1))',
        'gradient-glow': 'radial-gradient(circle at center, rgba(255,20,147,0.15), transparent 70%)',
      },
      boxShadow: {
        'brand': '0 0 30px rgba(255, 20, 147, 0.25)',
        'brand-lg': '0 0 60px rgba(255, 20, 147, 0.3)',
        'gold': '0 0 30px rgba(255, 184, 0, 0.3)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 20, 147, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 20, 147, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
