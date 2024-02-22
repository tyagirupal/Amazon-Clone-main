import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthProvider } from "@src/providers/AuthProvider";
import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";
import { PropsWithChildren } from "react";

export function PublicRoute({ children }: PropsWithChildren) {
  const { authStatus } = useAuthProvider();

  return authStatus === TAuthorizationStatus_Enum.UNAUTHORIZED ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
}
