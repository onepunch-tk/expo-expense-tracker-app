import { UserType } from "@/db/types";

export interface AuthProps {
  authUser?: Pick<UserType, "email" | "id">;
}
export interface AuthState extends AuthProps {
  onRegister: (email: string, password: string) => Promise<AuthResponse>;
  onLogin: (email: string, password: string) => Promise<AuthResponse>;
  onLogout: () => Promise<void>;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
}
