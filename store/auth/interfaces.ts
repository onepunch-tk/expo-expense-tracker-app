import { DbType, User } from "@/db/types";

export interface AuthProps {
  authUser?: Pick<User, "email" | "id">;
}
export interface AuthState extends AuthProps {
  onRegister: (
    db: DbType | null,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  onLogin: (
    db: DbType | null,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  onLogout: () => Promise<void>;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
}
