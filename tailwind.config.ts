import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        basalt: {
          950: "#09090b", // ink ground
          900: "#101014", // sidebar & panels
          850: "#16161c", // pane card ground
          800: "#1f1f27", // hover states
          700: "#2a2a35", // subtle border
          600: "#3d3d4d",
          400: "#71717a",
          300: "#a1a1aa",
          200: "#e4e4e7",
          100: "#f4f4f5",
        },
        obsidian: {
          accent: "#a88bfa",
          glow: "#7c3aed",
          dim: "#4c1d95",
        },
        telemetry: {
          live: "#34d399",
          warn: "#fbbf24",
          info: "#38bdf8",
          crit: "#f43f5e",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)",
        panel: "0 4px 20px -2px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
