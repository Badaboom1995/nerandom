export {};

module.exports = {
  content: ["./src/**/*.{html,ts, tsx}"],
  theme: {
    minWidth: {
      "30": "700px",
    },
    extend: {
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
