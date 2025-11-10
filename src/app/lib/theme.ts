export const theme = {
  colors: {
    light: {
      primary: {
        light: "#677afb",
        main: "#4e61ea",
        dark: "#3445c8",
        contrastText: "#FFFFFF",
      },
      secondary: {
        light: "#90caf9",
        main: "#3AC57C",
        dark: "#115293",
        contrastText: "#FFFFFF",
      },
      background: {
        default: "#f6f7f8",
        paper: "#fcfcfc",
      },
      text: {
        primary: "#111827",
        secondary: "#6b7280",
        disabled: "#9ca3af",
      },
    },
    dark: {
      primary: {
        light: "#677afb",
        main: "#4e61ea",
        dark: "#3445c8",
        contrastText: "#FFFFFF",
      },
      secondary: {
        light: "#90caf9",
        main: "#3AC57C",
        dark: "#115293",
        contrastText: "#FFFFFF",
      },
      background: {
        default: "#111827",
        paper: "#1f2937",
        card: "#374151",
      },
      text: {
        primary: "#f9fafb",
        secondary: "#d1d5db",
        disabled: "#9ca3af",
      },
    },
  },
} as const;

export type Theme = typeof theme;
export type ThemeMode = "light" | "dark";
