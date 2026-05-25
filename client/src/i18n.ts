import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./locales/es/translation.json";
import en from "./locales/en/translation.json";

i18n
  .use(initReactI18next)
  .init({
    lng: (typeof window !== "undefined" && localStorage.getItem("zincel-language")) ||
      (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("es") ? "es" : "en"),
    fallbackLng: "es",
    supportedLngs: ["es", "en"],
    defaultNS: "translation",
    ns: ["translation"],
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
  });

export default i18n;
