/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          950: '#0d0203',
          900: '#1a0507',
          800: '#2a080a',
          700: '#3d1010',
          600: '#5c1a1a',
          500: '#7a2424',
        },
        cream: {
          50: '#fdfaf5',
          100: '#f5f0e8',
          200: '#ede5d5',
          300: '#e0d5c0',
        },
        gold: '#c9a96e',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Times New Roman"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'bounce-soft': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.8s ease forwards',
        'fade-in':    'fade-in 0.6s ease forwards',
        'scale-in':   'scale-in 0.4s ease forwards',
        'spin-slow':  'spin-slow 4s linear infinite',
        'bounce-soft':'bounce-soft 2s ease-in-out infinite',
        'float-slow': 'float-slow 4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
      },
    },
  },
  plugins: [],
}
