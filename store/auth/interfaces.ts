import { UserType } from "@/db/types";

export interface AuthProps {
  authUser?: UserType;
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
