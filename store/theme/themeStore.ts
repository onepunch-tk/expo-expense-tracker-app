import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { dark, light } from "@/constants/Colors";
import { logger } from "@/store/logger";
import { ThemeProps, ThemeState } from "@/store/theme/interfaces";
import { Appearance } from "react-native";
import { zustandStorage } from "@/store/state.storage";

export type ThemeStore = ReturnType<typeof createThemeStore>;

export const createThemeStore = () => {
  const DEFAULT_PROPS: ThemeProps = {
    theme: "dark",
  };

  return createStore<ThemeState>()(
    persist(
      logger((set, get) => ({
        ...DEFAULT_PROPS,
        colors: () => (get().theme === "dark" ? dark : light),
        setTheme: (theme) => {
          Appearance.setColorScheme(theme);
          set({ theme });
        },
      })),
      {
        name: "theme-storage",
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  );
};
