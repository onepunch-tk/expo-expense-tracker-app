import { logger } from "@/store/logger";
import { createStore } from "zustand";
import { AuthState } from "@/store/auth/interfaces";
import { getUserByEmail, insertUser } from "@/db/queries/users";

export type AuthStore = ReturnType<typeof createAuthStore>;

export const createAuthStore = () => {
  return createStore<AuthState>()(
    logger((set, get) => ({
      authUser: undefined,
      onLogin: async (email, password) => {
        return {
          success: true,
        };
      },
      onLogout: async () => {
        set({ authUser: undefined });
      },
      onRegister: async (email, password) => {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
          return {
            success: false,
            error: "This email address already exists.",
          };
        }
        await insertUser(email, password);

        return {
          success: true,
        };
      },
    }))
  );
};
