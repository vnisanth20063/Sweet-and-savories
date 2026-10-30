import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        burgundy: { DEFAULT: "#5a0f23", deep: "#3a0a17" },
        choc: "#2b1810",
        cream: "#f6ecd9",
        gold: { DEFAULT: "#c9a24b", light: "#f3cf75" },
        saffron: "#f4821f",
      },
      fontFamily: { sans: ["var(--font-outfit)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
