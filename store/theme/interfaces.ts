import { Theme } from "@/constants/Colors";

type ThemeType = "dark" | "light";

export interface ThemeProps {
  theme: ThemeType;
}

export interface ThemeState extends ThemeProps {
  colors: () => Theme;
  setTheme: (theme: ThemeType) => void;
}
