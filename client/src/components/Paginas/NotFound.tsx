import { Link } from "react-router-dom";
import SEO from "../global/seo";

export default function NotFound() {
  return (
    <>
      <SEO title="404 — Zincel" description="Página no encontrada." url="https://www.zincelideas.com/404" />
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-zinc-600 text-8xl font-light mb-6">404</p>
          <h1 className="text-2xl font-light text-white mb-4">Página no encontrada</h1>
          <p className="text-zinc-400 mb-10">La página que buscas no existe o fue movida.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-white text-zinc-900 px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-100 transition-colors">
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}
