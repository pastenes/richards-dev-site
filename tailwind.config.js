module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'pt-serif': ['PT Serif', 'serif'],
        'fira-code': ['Fira Code', 'monospace'],
        montserrat: ['Montserrat, sans-serif'],
        opensans: ['Open Sans, sans-serif'],
      },
      fontSize: {
        'tiny': '.775rem',
      },
      spacing: {
        '480': '480px',
        '600': '600px',
        'nav': '11.5rem',
      }
    },
    colors: {
      black: '#000000',
      neutral: '#c4c4c4',
      dark: '#222222',
      darker: '#141414',
      light: '#fafafa',
      muted: '#a8b2d1',
      green: '#64ffda',
      white: '#ffffff',
      gray: '#EBEBEB',
      blue: '#3CB1E4',
    },
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '640px',
        lg: '1000px',
        xl: '1000px',
      },
    },
  },
  plugins: [],
};
