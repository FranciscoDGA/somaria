import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          0: "rgb(var(--bg-0-rgb) / <alpha-value>)",
          1: "rgb(var(--bg-1-rgb) / <alpha-value>)",
          2: "rgb(var(--bg-2-rgb) / <alpha-value>)",
        },
        line: "rgb(var(--line-rgb) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--ink-rgb) / <alpha-value>)",
          2: "rgb(var(--ink-2-rgb) / <alpha-value>)",
        },
        green: {
          DEFAULT: "rgb(var(--green-rgb) / <alpha-value>)",
          deep: "rgb(var(--green-deep-rgb) / <alpha-value>)",
        },
        amber: "rgb(var(--amber-rgb) / <alpha-value>)",
        red: "rgb(var(--red-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "16px",
        field: "12px",
      },
      maxWidth: {
        content: "1120px",
        prose: "720px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(74, 222, 128, 0.18), 0 18px 60px -30px rgba(74, 222, 128, 0.25)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(36,49,41,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,49,41,0.5) 1px, transparent 1px)",
        "verdict-green":
          "linear-gradient(135deg, rgba(22,101,52,0.28) 0%, rgba(16,22,19,0.2) 55%, rgba(11,15,13,0) 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
