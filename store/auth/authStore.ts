import { logger } from "@/store/logger";
import { createStore } from "zustand";
import { AuthState } from "@/store/auth/interfaces";
import { getUserByEmail, insertUser } from "@/db/queries/users";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "@/store/state.storage";

export type AuthStore = ReturnType<typeof createAuthStore>;

export const createAuthStore = () => {
  return createStore<AuthState>()(
    persist(
      logger((set, get) => ({
        authUser: undefined,
        onLogin: async (db, email, password) => {
          const findUser = await getUserByEmail(db, email);
          if (!findUser) {
            return {
              success: false,
              error:
                "No account found with this email address. Please check your email or sign up for a new account.",
            };
          }

          const isPasswordValid = findUser.password === password;
          if (!isPasswordValid) {
            return {
              success: false,
              error: "Invalid email or password. Please try again.",
            };
          }

          set({ authUser: { email: findUser.email, id: findUser.id } });

          return {
            success: true,
          };
        },
        onLogout: async () => {
          set({ authUser: undefined });
        },
        onRegister: async (db, email, password) => {
          const existingUser = await getUserByEmail(db, email);
          if (existingUser) {
            return {
              success: false,
              error: "This email address already exists.",
            };
          }
          await insertUser(db, email, password);

          return {
            success: true,
          };
        },
      })),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  );
};
