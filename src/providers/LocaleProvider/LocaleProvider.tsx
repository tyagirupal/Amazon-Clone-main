import { PropsWithChildren, useState, useCallback, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { LocaleContext, Locale_Enum } from "./LocaleContext";

import en from "./translations/en.json";
import de from "./translations/de.json";

export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale_Enum>(Locale_Enum.EN);

  const languages = { en, de };

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (language) setLocale(language as Locale_Enum);
  }, []);

  const toggleLocale = useCallback(() => {
    if (locale === Locale_Enum.EN) {
      setLocale(Locale_Enum.DE);
      localStorage.setItem("language", Locale_Enum.EN);
    } else if (locale === Locale_Enum.DE) {
      setLocale(Locale_Enum.EN);
      localStorage.setItem("language", Locale_Enum.DE);
    }
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale }}>
      <IntlProvider
        defaultLocale="en"
        locale={locale}
        messages={languages[locale]}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}
