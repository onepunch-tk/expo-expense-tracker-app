import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

function UseAuthContext() {
  return useContext(AuthContext);
}

export default UseAuthContext;
