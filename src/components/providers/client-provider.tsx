"use client";

import { useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  useColorScheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme as defaultTheme } from "@/lib/theme";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: defaultTheme.colors.light,
    },
    dark: {
      palette: defaultTheme.colors.dark,
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
  },
});

function ThemeSynchronizer() {
  const { mode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && mode) {
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [mode, mounted]);

  return null;
}

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme} defaultMode="dark">
      <CssBaseline />
      <ThemeSynchronizer />
      {children}
    </ThemeProvider>
  );
}
