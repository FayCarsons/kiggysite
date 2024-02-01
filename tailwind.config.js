/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        palatino: ["palantino"],
      },
      fontSize: {
        xxs: ["0.6rem", { lineHeight: "0.75rem" }],
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
