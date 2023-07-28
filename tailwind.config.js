/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

const MyClass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transition: "transform 1s",
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
      "-webkit-backface-visibility": "hidden",
    },
  });
});

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        changeOpacity: "changeOpacity 0.3s ease-in",
        moveWave1: "moveWave1 3s ease-in-out infinite alternate",
        moveWave2: "moveWave2 3s 1.2s ease-in-out infinite alternate",
        moveWave3: "moveWave3 3s 0.7s ease-in-out infinite alternate",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        changeOpacity: {
          "100%": { opacity: "1" },
          "0%": { opacity: "0" },
        },
        moveWave1: {
          "100%": { transform: "translateX(-2000px)" },
        },
        moveWave2: {
          "100%": { transform: "translateX(-1800px)" },
        },
        moveWave3: {
          "100%": { transform: "translateX(-1600px)" },
        },
      },
    },
  },
  plugins: [MyClass, require("tailwindcss"), require("autoprefixer")],
};
