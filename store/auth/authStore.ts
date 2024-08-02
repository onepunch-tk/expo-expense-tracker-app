import { logger } from "@/store/logger";
import { createStore } from "zustand";
import { AuthResponse, AuthState } from "@/store/auth/interfaces";
import { createUser, getUserByEmail } from "@/db/queries/users";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "@/store/state.storage";
import { insertUsersToCategories } from "@/db/queries/categories";

export type AuthStore = ReturnType<typeof createAuthStore>;

export const createAuthStore = () => {
  return createStore<AuthState>()(
    persist(
      logger((set, get) => ({
        authUser: undefined,
        onLogin: async (db, email, password) => {
          const { data: findUser } = await getUserByEmail(db, { email });
          if (!findUser) {
            return {
              user: null,
              error:
                "No account found with this email address. Please check your email or sign up for a new account.",
            };
          }

          const isPasswordValid = findUser.password === password;
          if (!isPasswordValid) {
            return {
              user: null,
              error: "Invalid email or password. Please try again.",
            };
          }

          set({ authUser: { email: findUser.email, id: findUser.id } });

          return {
            user: findUser,
          };
        },
        onLogout: async () => {
          set({ authUser: undefined });
        },
        onRegister: async (db, email, password): Promise<AuthResponse> => {
          const { data: existingUser } = await getUserByEmail(db, { email });
          if (existingUser) {
            return {
              user: null,
              error: "This email address already exists.",
            };
          }
          const { data: createdUser, error } = await createUser(db, {
            email,
            password,
          });
          if (!createdUser) {
            return {
              error: error!!,
              user: null,
            };
          } else {
            await insertUsersToCategories(db, createdUser.id);
            return {
              user: createdUser,
            };
          }
        },
      })),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  );
};
