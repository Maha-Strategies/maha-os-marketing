/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'maha-gold': '#D4AF37',
        'maha-rust': '#B7410E',
        'maha-dark': '#0A0A0A',
      },
    },
  },
  plugins: [],
}