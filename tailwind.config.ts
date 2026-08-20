import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        ink: "var(--color-text)",
        muted: "var(--color-text-muted)",
        panel: "var(--color-panel)",
        line: "var(--color-line)",
        purple: {
          deep: "var(--color-purple-deep)",
          neon: "var(--color-purple-neon)",
        },
        gold: {
          DEFAULT: "var(--color-gold)",
          bright: "var(--color-gold-bright)",
        },
        burnt: "var(--color-burnt-orange)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Arial Black", "sans-serif"],
        body: ["var(--font-body)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        panel: "0 18px 40px rgba(0, 0, 0, 0.45)",
      },
      minHeight: {
        touch: "48px",
      },
      minWidth: {
        touch: "48px",
      },
    },
  },
  plugins: [],
};

export default config;
