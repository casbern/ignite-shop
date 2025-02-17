module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#121214',
          800: '#202024',
          300: '#c4c4cc',
          100: '#e1e1e6',
        },
        green: {
          500: '#00875f',
          300: '#00b37e',
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      
      maxWidth: {
        'custom-calc': 'calc(100vw - ((100vw - 1180px) / 2))'
      },
      minHeight: {
        '656': '656px',
      },
      backgroundImage: {
        'product-gradient': 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)'
      },
      backgroundColor: {
        'product-footer': 'rgba(0,0,0,0.6)'
      }
    },
  },
  plugins: [],
}