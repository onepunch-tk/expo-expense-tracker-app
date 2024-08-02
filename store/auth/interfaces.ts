import { User } from "@/db/types";
import { ExpoDbType, SQLJsDbType } from "@/db/dirzzle";

export interface AuthProps {
  authUser?: Pick<User, "email" | "id">;
}

export interface AuthState extends AuthProps {
  onRegister: (
    db: ExpoDbType | SQLJsDbType | null,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  onLogin: (
    db: ExpoDbType | SQLJsDbType | null,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  onLogout: () => Promise<void>;
}

export interface AuthResponse {
  user: User | null;
  error?: string;
}
