/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#111111',
          900: '#0a0a0a',
          800: '#111111',
          700: '#171717',
          600: '#1e1e1e',
          500: '#262626',
        },
        cream: {
          DEFAULT: '#F5F1EA',
          100: '#F8F5EF',
          200: '#F5F1EA',
          300: '#EAE3D8',
          400: '#DDD4C6',
        },
        gold: {
          DEFAULT: '#C6A66B',
          light: '#D4B982',
          dark: '#A8895A',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      letterSpacing: {
        'widest-xl': '0.3em',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'scroll-line': 'scrollLine 2.2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '40%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '60%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
    },
  },
  plugins: [],
};
