import { createStore } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { dark, light } from "@/constants/Colors";
import { logger } from "@/store/logger";
import { ThemeProps, ThemeState } from "@/store/theme/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import setColorScheme = Appearance.setColorScheme;

export type ThemeStore = ReturnType<typeof createThemeStore>;

export const zustandStorage: StateStorage = {
  setItem: async (name, value) => {
    const jsonValue = JSON.stringify(value);
    return await AsyncStorage.setItem(name, jsonValue);
  },
  getItem: async (name) => {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  },
  removeItem: async (name) => {
    return await AsyncStorage.removeItem(name);
  },
};

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
          setColorScheme(theme);
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
