module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ["Poppins", "sans-serif"],
        'pt-serif': ["PT Serif", "serif"],
      }
    },
    colors: {
      'neutral': '#c4c4c4',
      'dark': '#222222',
    }
    ,container: {
      padding: '2rem',
      center: true,
    },
  },
  plugins: [],
}
