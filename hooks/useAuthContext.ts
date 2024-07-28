import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useStore } from "zustand";
import { AuthState } from "@/store/auth/interfaces";

export const useAuthContext = <T>(selector: (state: AuthState) => T): T => {
  const store = useContext(AuthContext);
  if (!store) throw new Error("Missing AuthContext.Provider in the tree");
  return useStore(store, selector);
};
