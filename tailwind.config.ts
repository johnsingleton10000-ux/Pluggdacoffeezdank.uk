import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050507",
        asphalt: "#0b0a10",
        panel: "#120f18",
        pink: { neon: "#ff3fbc", deep: "#7a1658" },
        green: { neon: "#b8ff3d", toxic: "#7dff00" },
        purple: { neon: "#c26bff", deep: "#2a1544", drip: "#8e38ff" },
        gold: { DEFAULT: "#f1be48", burn: "#c9a227", bright: "#ffe88d" },
        burnt: "#c45c26",
        cream: "#f7ecd7",
        muted: "#b9ad9c",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Arial Black", "sans-serif"],
        graffiti: ["var(--font-graffiti)", "Impact", "sans-serif"],
        estate: ["var(--font-estate)", "Georgia", "serif"],
        body: ["var(--font-body)", "Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        neonPink: "0 0 24px rgba(255, 63, 188, 0.45)",
        neonGreen: "0 0 24px rgba(184, 255, 61, 0.4)",
        neonPurple: "0 0 28px rgba(194, 107, 255, 0.45)",
        gold: "0 0 24px rgba(241, 190, 72, 0.28)",
      },
      minHeight: { touch: "48px" },
      minWidth: { touch: "48px" },
    },
  },
  plugins: [],
};

export default config;
