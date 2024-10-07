module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "360px",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
}
