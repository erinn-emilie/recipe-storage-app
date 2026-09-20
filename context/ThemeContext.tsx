import { createContext, useContext, useState } from "react";

export type ThemeId = "forest" | "terracotta" | "midnight" | "slate";

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  accent: string;
  bg: string;
  muted: string;
  border: string;
  textSoft: string;
}

export const THEMES: Record<ThemeId, { label: string; colors: ThemeColors; preview: [string, string, string] }> = {
  forest: {
    label: "Forest",
    preview: ["#2D4A3E", "#C4633A", "#FAF7F2"],
    colors: { primary: "#2D4A3E", primaryLight: "#3D6355", accent: "#C4633A", bg: "#FAF7F2", muted: "#8B7355", border: "#E8E0D5", textSoft: "#5C4D3A" },
  },
  terracotta: {
    label: "Terracotta",
    preview: ["#8B3A2A", "#D4A853", "#FDF6EE"],
    colors: { primary: "#8B3A2A", primaryLight: "#A84A38", accent: "#D4A853", bg: "#FDF6EE", muted: "#9B7B60", border: "#EDE0D0", textSoft: "#6B4A35" },
  },
  midnight: {
    label: "Midnight",
    preview: ["#1B2A4A", "#6B9BD2", "#F4F6FA"],
    colors: { primary: "#1B2A4A", primaryLight: "#2B3E6A", accent: "#6B9BD2", bg: "#F4F6FA", muted: "#7A8BA0", border: "#DDE4EE", textSoft: "#4A5A72" },
  },
  slate: {
    label: "Slate",
    preview: ["#3D4A5C", "#A67C52", "#F7F5F2"],
    colors: { primary: "#3D4A5C", primaryLight: "#4E5E72", accent: "#A67C52", bg: "#F7F5F2", muted: "#7A8090", border: "#E2DDD8", textSoft: "#525A68" },
  },
};

interface ThemeCtx {
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeCtx>({
  themeId: "forest",
  setThemeId: () => {},
  colors: THEMES.forest.colors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>("forest");
  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, colors: THEMES[themeId].colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
