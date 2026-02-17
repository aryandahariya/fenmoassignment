/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
        },
      },
      fontFamily: {
        display: ["Manrope", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 12px 40px -18px rgba(15, 23, 42, 0.25)",
      },
    },
  },
  plugins: [],
};
