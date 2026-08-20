import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./domains/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        canvas: "var(--color-canvas)",
        panel: "var(--color-panel)",
        raised: "var(--color-raised)",
        line: "var(--color-line)",
        cream: "var(--color-cream)",
        muted: "var(--color-muted)",
        "purple-deep": "var(--color-purple-deep)",
        "purple-neon": "var(--color-purple-neon)",
        gold: {
          DEFAULT: "var(--color-gold)",
          dim: "var(--color-gold-dim)",
        },
        ember: "var(--color-ember)",
        danger: "var(--color-danger)",
        success: "var(--color-success)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Arial Black", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        stamp: "4px 4px 0 var(--color-ink)",
        inset: "inset 0 0 0 3px var(--color-ink)",
      },
      borderWidth: {
        3: "3px",
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
    },
  },
  plugins: [],
};

export default config;
