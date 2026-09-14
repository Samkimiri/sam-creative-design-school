import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Several data files store Tailwind class strings (gradient/color
    // combos for gallery projects, courses, blog cards) that are never
    // hardcoded anywhere else - without scanning this directory, Tailwind's
    // JIT compiler drops those classes from the build entirely, so an
    // element styled with them renders with no color/gradient applied.
    "./src/data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A8FE3",
        "primary-dark": "#0D6EBF",
        "primary-light": "#5AB4F0",
        dark: "#0A0F1E",
        "light-gray": "#F0F6FF",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        inter: ["var(--font-inter)"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
