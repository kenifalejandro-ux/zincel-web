// client/src/App.tsx

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";
import PageTransition from "./components/global/PageTransition";
import WorldMapHero from "./components/MapHero/Hero";
import FullscreenModal from "./components/MapHero/FullscreenModal";
import { useGTMPageView } from "./hooks/useGTMPageView";
import useParallaxEffect from "./hooks/useParallaxEffect";

const Inicio       = lazy(() => import("./components/Paginas/inicio"));
const Servicios    = lazy(() => import("./components/Paginas/Servicios"));
const Portfolio    = lazy(() => import("./components/Paginas/Portfolio"));
const SobreNosotros = lazy(() => import("./components/Paginas/sobre-nosotros"));
const PreciosWeb   = lazy(() => import("./components/Paginas/precios-web"));
const Experiencias = lazy(() => import("./components/Paginas/experiencias"));
const Contactanos  = lazy(() => import("./components/Paginas/Contactanos"));
const Gracias      = lazy(() => import("./components/Paginas/Gracias"));
const NotFound     = lazy(() => import("./components/Paginas/NotFound"));

const MODAL_ROUTES: Record<string, ReactNode> = {
  "/inicio":         <Inicio />,
  "/servicios":      <Servicios />,
  "/portfolio":      <Portfolio />,
  "/sobre-nosotros": <SobreNosotros />,
  "/precios-web":    <PreciosWeb />,
  "/experiencias":   <Experiencias />,
  "/contactanos":    <Contactanos />,
};

const LoadingSpinner = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#f3efe7]">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-800" />
  </div>
);

function MapLayout() {
  const location = useLocation();
  useGTMPageView();

  const path = location.pathname;
  const isModalRoute = path in MODAL_ROUTES;

  return (
    <>
      {/* Mapa siempre visible de fondo */}
      <WorldMapHero isModalOpen={isModalRoute} />

      {/* Modal fullscreen con cube flip */}
      <FullscreenModal isOpen={isModalRoute} path={path}>
        <Suspense fallback={<LoadingSpinner />}>
          {MODAL_ROUTES[path]}
        </Suspense>
      </FullscreenModal>
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Mapa + modales */}
      <Route path="/"               element={<MapLayout />} />
      <Route path="/inicio"         element={<MapLayout />} />
      <Route path="/servicios"      element={<MapLayout />} />
      <Route path="/portfolio"      element={<MapLayout />} />
      <Route path="/sobre-nosotros" element={<MapLayout />} />
      <Route path="/precios-web"    element={<MapLayout />} />
      <Route path="/experiencias"   element={<MapLayout />} />
      <Route path="/contactanos"    element={<MapLayout />} />

      {/* Aliases legacy */}
      <Route path="/Servicios" element={<Navigate to="/servicios" replace />} />
      <Route path="/Portfolio" element={<Navigate to="/portfolio" replace />} />

      {/* Páginas standalone */}
      <Route path="/gracias" element={<Suspense fallback={null}><Gracias /></Suspense>} />
      <Route path="*"        element={<Suspense fallback={null}><NotFound /></Suspense>} />
    </Routes>
  );
}

function App() {
  useParallaxEffect([], { parallaxFactor: 0.2, debounceDelay: 10, threshold: 100 });

  return (
    <div className="app">
      <Router>
        <PageTransition />
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
