"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Locale } from "@/data/i18n";
import { t as translate, localeDirections } from "@/data/i18n";

interface I18nContextType {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("locale", newLocale);
    } catch {}
    document.documentElement.lang = newLocale;
    document.documentElement.dir = localeDirections[newLocale];
  }, []);

  const dir = localeDirections[locale];

  return (
    <I18nContext.Provider value={{ locale, dir, setLocale, t: (key, vars) => translate(key as never, locale, vars) }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}
