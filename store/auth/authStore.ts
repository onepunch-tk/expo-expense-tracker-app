import { logger } from "@/store/logger";
import { createStore } from "zustand";
import { AuthState } from "@/store/auth/interfaces";
import { db, users } from "@/db";
import { eq } from "drizzle-orm";

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
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, email),
        });
        if (existingUser) {
          return {
            success: false,
            error: "This email address already exists.",
          };
        }

        await db.insert(users).values({
          email,
          password,
        });

        return {
          success: true,
        };
      },
    }))
  );
};
