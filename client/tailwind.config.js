/*client/tailwind.config.js*/

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: "#e9c893",
      },
      fontFamily: {
        display: ['"Bodoni Moda"', "serif"],
        body: ['"Hanken Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        pinPulse: {
          "0%": { opacity: "0.55", transform: "translate(-50%,-50%) scale(0.6)" },
          "70%": { opacity: "0", transform: "translate(-50%,-50%) scale(4.4)" },
          "100%": { opacity: "0", transform: "translate(-50%,-50%) scale(4.4)" },
        },
      },
      animation: {
        pinPulse: "pinPulse 3.4s cubic-bezier(.22,1,.36,1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    "hover:bg-purple-400",
    "hover:bg-emerald-300",
    "hover:bg-pink-500",
    "hover:bg-amber-400",

    "hover:bg-amber-400",
    "hover:bg-red-700",
    "hover:bg-yellow-400",
    "hover:bg-amber-600",
    // todos los que uses
  ],
};
