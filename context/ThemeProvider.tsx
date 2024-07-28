import { createContext, PropsWithChildren, useRef } from "react";
import { createThemeStore, ThemeStore } from "@/store/theme/themeStore";

export const ThemeContext = createContext<ThemeStore | null>(null);

function ThemeProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<ThemeStore>();
  if (!storeRef.current) {
    storeRef.current = createThemeStore();
  }

  return (
    <ThemeContext.Provider value={storeRef.current}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
