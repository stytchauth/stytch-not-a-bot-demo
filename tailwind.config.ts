import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        neon: "#CAF91F",
        cement: "#ADBCC5",
        charcoal: "#18191B",
      },
    },
  },
};
export default config;
