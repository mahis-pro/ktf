/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8faf6',
        surface: {
          DEFAULT: '#f8faf6',
          container: {
            low: '#f3f4f1',
            highest: '#e1e3e0'
          }
        },
        primary: {
          DEFAULT: '#002519',
          container: '#003D2B'
        },
        secondary: {
          DEFAULT: '#136c40'
        },
        'on-surface': '#191c1a',
        'on-surface-variant': '#404944',
        'outline-variant': '#c0c9c2',
      },
      fontFamily: {
        display: ['Ubuntu', 'sans-serif'],
        body: ['Ubuntu', 'sans-serif']
      },
      borderRadius: {
        xl: '0.75rem',
        md: '0.375rem',
      }
    },
  },
  plugins: [],
}
