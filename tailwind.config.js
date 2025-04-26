/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#FDC500",
        charcoal: "#0D0D0D",
        "dark-gray": "#1A1A1A",
        "light-gray": "#B3B3B3",
        teal: "#007EA7",
        "dark-blue": "#00296B",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
      },
      boxShadow: {
        custom: "0 4px 20px rgba(0, 0, 0, 0.25)",
        glow: "0 0 15px rgba(253, 197, 0, 0.5)",
        "glow-teal": "0 0 15px rgba(0, 126, 167, 0.5)",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.5s ease-in-out",
        pulse: "pulse 2s infinite",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
        128: "32rem",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "2rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
