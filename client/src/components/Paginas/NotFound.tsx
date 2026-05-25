import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../global/seo";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <SEO title="404 — Zincel" description="Página no encontrada." url="https://www.zincelideas.com/404" />
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-zinc-600 text-8xl font-light mb-6">404</p>
          <h1 className="text-2xl font-light text-white mb-4">{t("notFound.title")}</h1>
          <p className="text-zinc-400 mb-10">{t("notFound.description")}</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-white text-zinc-900 px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-100 transition-colors">
            {t("notFound.cta")}
          </Link>
        </div>
      </div>
    </>
  );
}
