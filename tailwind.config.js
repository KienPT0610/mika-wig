module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'mika-pink': '#b1e4f4',
        'mika-rose': '#f4c6d6',
        'mika-deep': '#eaa6b8',
        'mika-blue-2': '#004aad',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
