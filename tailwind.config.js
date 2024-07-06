module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        abc: ["Montserrat"],
      },
      height: {
        '100': '26rem',
        '128': '32rem', // 512px
        '130': '34rem',
        '144': '36rem', // 576px
        '160': '40rem', // 640px
      },
      width: {
        '100': '26rem',
        '128': '32rem', // 512px
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
