import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import i18n from "../i18n";

export type Language = "es" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  isSpanish: boolean;
  isEnglish: boolean;
};

const STORAGE_KEY = "zincel-language";

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "es";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "es" || saved === "en") return saved;
  return window.navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (next: Language) => setLanguageState(next);
  const toggleLanguage = () =>
    setLanguageState((cur) => (cur === "es" ? "en" : "es"));

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.setAttribute("data-language", language);
    void i18n.changeLanguage(language);
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, isSpanish: language === "es", isEnglish: language === "en" }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
