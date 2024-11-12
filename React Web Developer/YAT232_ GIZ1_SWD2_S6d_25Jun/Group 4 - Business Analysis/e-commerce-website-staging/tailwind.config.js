/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,jsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "intro-bg": "url('./src/img/hero/hero-1.png')",
        "seperator-bg": "url('./src/img/seperator/3.jpg')",
      },
    },
  },
  plugins: [],
});
