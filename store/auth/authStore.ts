import { logger } from "@/store/logger";
import { createStore } from "zustand";
import { AuthState } from "@/store/auth/interfaces";
import { db } from "@/db";

export type AuthStore = ReturnType<typeof createAuthStore>;

export const createAuthStore = () => {
  return createStore<AuthState>()(
    logger((set, get) => ({
      authUser: undefined,
      onLogin: async (email, password) => {},
      onRegister: async (email, password) => {
        const existingUser = await db.query.users.findFirst();
      },
      onLogout: async () => {
        set({ authUser: undefined });
      },
    }))
  );
};
