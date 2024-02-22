import { createContext } from "react";

export enum Locale_Enum {
  EN = "en",
  DE = "de",
}

interface LocaleContextValue {
  locale: Locale_Enum;
  toggleLocale: () => void;

  setLocale: React.Dispatch<React.SetStateAction<Locale_Enum>>;
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: Locale_Enum.EN,
  setLocale: () => {},
  toggleLocale: () => {},
});
