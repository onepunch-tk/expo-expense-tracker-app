import { createContext, PropsWithChildren } from "react";

export const AuthContext = createContext<Partial<AuthProps>>({});

function AuthProvider({ children }: PropsWithChildren) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
