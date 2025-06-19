/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./admin.html",
    "./admin-debug.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0A1628',
          green: '#1B4D3E',
          gold: '#B8860B',
          charcoal: '#2C3E50',
          light: '#ECF0F1',
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'Noto Sans KR', 'sans-serif'],
        inter: ['Inter', 'Noto Sans KR', 'sans-serif']
      },
      backdropBlur: {
        'xs': '2px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
