import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--dcbd-ink)",
        canvas: "var(--dcbd-canvas)",
        stone: "var(--dcbd-stone)",
        cream: "var(--dcbd-cream)",
        muted: "var(--dcbd-muted)",
        gold: {
          DEFAULT: "var(--dcbd-gold)",
          dim: "var(--dcbd-gold-dim)",
        },
        pink: "var(--dcbd-pink)",
        purple: {
          DEFAULT: "var(--dcbd-purple)",
          deep: "var(--dcbd-purple-deep)",
          neon: "var(--dcbd-purple-neon)",
        },
        lime: "var(--dcbd-lime)",
        ember: "var(--dcbd-ember)",
        blood: "var(--dcbd-blood)",
        whatsapp: "var(--dcbd-whatsapp)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Arial Black", "sans-serif"],
        estate: ["var(--font-estate)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        graffiti: ["var(--font-graffiti)", "Impact", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 24px var(--glow, var(--dcbd-purple-neon))",
        gold: "0 0 28px rgba(212, 175, 55, 0.35)",
        pink: "0 0 28px rgba(255, 43, 214, 0.45)",
        lime: "0 0 28px rgba(57, 255, 20, 0.35)",
      },
      minHeight: { touch: "44px" },
      minWidth: { touch: "44px" },
      borderWidth: { 3: "3px" },
    },
  },
  plugins: [],
};

export default config;
