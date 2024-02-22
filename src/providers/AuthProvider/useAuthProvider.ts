import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuthProvider() {
  return useContext(AuthContext);
}
