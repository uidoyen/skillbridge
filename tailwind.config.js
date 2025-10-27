// tailwind.config.js
const { theme } = require("./lib/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: theme.light.colors.primary,
        secondary: theme.light.colors.secondary,
        background: theme.light.colors.background,
        text: theme.light.colors.text,
        border: theme.light.colors.border,
        success: theme.light.colors.success,
        error: theme.light.colors.error,
        warning: theme.light.colors.warning,
      },
      backgroundColor: {
        "bg-default": "var(--background-default)",
        "bg-paper": "var(--background-paper)",
      },
      textColor: {
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-disabled": "var(--text-disabled)",
      },
      borderColor: {
        "border-light": "var(--border-light)",
        "border-main": "var(--border-main)",
        "border-dark": "var(--border-dark)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
