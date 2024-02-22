import { TAuthRequest, TUserRequest } from "@src/@types/RequestTypes";
import { createContext } from "react";

export enum TAuthorizationStatus_Enum {
  UNAUTHORIZED = "unathorized",
  AUTHORIZED = "authorized",
}

interface AuthContextValue {
  authStatus: TAuthorizationStatus_Enum;
  setAuthStatus: React.Dispatch<
    React.SetStateAction<TAuthorizationStatus_Enum>
  >;
  setAuthData: (e: TAuthRequest) => void;
  userData?: TUserRequest | undefined;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextValue>({
  authStatus: TAuthorizationStatus_Enum.UNAUTHORIZED,
  setAuthStatus: () => {},
  setAuthData: () => {},
  userData: undefined,
  signOut: () => {},
});
