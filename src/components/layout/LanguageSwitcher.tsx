"use client";

import { Globe } from "lucide-react";
import { useI18n } from "@/components/layout/I18nProvider";
import type { Locale } from "@/data/i18n";
import { localeNames } from "@/data/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const toggle = () => {
    const next: Locale = locale === "en" ? "ar" : "en";
    setLocale(next);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      title={localeNames[locale === "en" ? "ar" : "en"]}
    >
      <Globe className="w-3.5 h-3.5" />
      {locale === "en" ? "عربي" : "EN"}
    </button>
  );
}
