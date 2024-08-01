import { createContext, PropsWithChildren, useRef } from "react";
import { AuthStore, createAuthStore } from "@/store/auth/authStore";
import { createContextStore } from "@/store/helpers";

const AuthContext = createContext<AuthStore | null>(null);
export const useAuthContext = createContextStore(AuthContext, "");
function AuthProvider({ children }: PropsWithChildren) {
  const authStoreRef = useRef<AuthStore>();
  if (!authStoreRef.current) {
    authStoreRef.current = createAuthStore();
  }
  return (
    <AuthContext.Provider value={authStoreRef.current}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
