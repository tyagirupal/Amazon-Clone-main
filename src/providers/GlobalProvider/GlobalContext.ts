import { createContext } from "react";

import { TGetProducts } from "@src/@types/RequestTypes";
import { TDeliveryTo_enum } from "@src/@types/Enums";

interface TGlobalContext {
  sideBar: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  signInHover: boolean;
  setSignInHover: React.Dispatch<React.SetStateAction<boolean>>;
  languageHover: boolean;
  setLanguageHover: React.Dispatch<React.SetStateAction<boolean>>;
  registerPage: boolean;
  setRegisterPage: React.Dispatch<React.SetStateAction<boolean>>;
  emailInput: string;
  setEmailInput: React.Dispatch<React.SetStateAction<string>>;
  passwordInput: string;
  setPasswordInput: React.Dispatch<React.SetStateAction<string>>;
  nameInput: string;
  setNameInput: React.Dispatch<React.SetStateAction<string>>;
  currentInfo: string;
  setCurrentInfo: React.Dispatch<React.SetStateAction<string>>;
  products: TGetProducts[];
  setProducts: React.Dispatch<React.SetStateAction<TGetProducts[]>>;
  deliverTo: TDeliveryTo_enum;
  setDeliverTo: React.Dispatch<React.SetStateAction<TDeliveryTo_enum>>;
  productId: string;
  setProductId: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext<TGlobalContext>({
  sideBar: false,
  setSideBar: () => {},
  modal: false,
  setModal: () => {},
  signInHover: false,
  setSignInHover: () => {},
  languageHover: false,
  setLanguageHover: () => {},
  registerPage: false,
  setRegisterPage: () => {},
  emailInput: "",
  setEmailInput: () => {},
  passwordInput: "",
  setPasswordInput: () => {},
  nameInput: "",
  setNameInput: () => {},
  currentInfo: "",
  setCurrentInfo: () => {},
  products: [],
  setProducts: () => {},
  deliverTo: TDeliveryTo_enum.UNITED_KINGDOM,
  setDeliverTo: () => {},
  productId: "",
  setProductId: () => {},
});
