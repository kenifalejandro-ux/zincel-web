import { Languages } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";

type LanguageToggleProps = {
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
};

export function LanguageToggle({
  className = "",
  iconClassName = "h-4 w-4",
  labelClassName = "text-[11px] font-medium uppercase tracking-[0.22em]",
}: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const nextLanguage = language === "es" ? "en" : "es";
  const title = t("header.switchLang");

  return (
    <button
      type="button"
      onClick={() => setLanguage(nextLanguage)}
      aria-label={title}
      title={title}
      className={className}
    >
      <Languages className={iconClassName} />
      <span className={labelClassName}>{language.toUpperCase()}</span>
    </button>
  );
}
