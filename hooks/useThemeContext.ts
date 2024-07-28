import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeProvider";
import { useStore } from "zustand";
import { ThemeState } from "@/store/theme/interfaces";

export const useThemeContext = <T>(selector: (state: ThemeState) => T): T => {
  const store = useContext(ThemeContext);
  if (!store) throw new Error("Missing ThemeContext.Provider in the tree");
  return useStore(store, selector);
};
