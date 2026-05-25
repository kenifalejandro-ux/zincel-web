// client/src/App.tsx

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/layout/layout";
import logoZincel from "@/assets/logo-zincel-black.svg";
import PageTransition from "./components/global/PageTransition";

// Lazy imports
const Inicio = lazy(() => import("./components/Paginas/inicio"));
const Servicios = lazy(() => import("./components/Paginas/Servicios"));
const Portfolio = lazy(() => import("./components/Paginas/Portfolio"));
const SobreNosotros = lazy(() => import("./components/Paginas/sobre-nosotros"));
const PreciosWeb = lazy(() => import("./components/Paginas/precios-web"));
const Experiencias = lazy(() => import("./components/Paginas/experiencias"));
const Gracias = lazy(() => import("./components/Paginas/Gracias"));
const NotFound = lazy(() => import("./components/Paginas/NotFound"));

// Hooks

import { useGTMPageView } from "./hooks/useGTMPageView";
import useParallaxEffect from "./hooks/useParallaxEffect";

function AppRoutes() {
  const location = useLocation();

  useGTMPageView();

  return (
    <Routes location={location} key={location.pathname}>
      {/* INICIO */}
      <Route
        path="/"
        element={
          <Layout page="inicio" showVideo logo={logoZincel} brandName="">
            <div className="fixed bottom-60 left-1/2 -translate-x-1/2 z-50 pointer-events-none"></div>
            <Inicio />
          </Layout>
        }
      />

      {/* SERVICIOS */}
      <Route
        path="/Servicios"
        element={
          <Layout page="servicios" showVideo logo={logoZincel} brandName="">
            <div className="fixed bottom-60 left-1/2 -translate-x-1/2 z-50 pointer-events-none"></div>
            <Servicios />
          </Layout>
        }
      />

      {/* PORTFOLIO */}
      <Route
        path="/portfolio"
        element={
          <Layout
            page="portfolio"
            showVideo={false}
            logo={logoZincel}
            brandName=""
            hideHeroHeader={true}
          >
            <Portfolio />
          </Layout>
        }
      />
      <Route path="/Portfolio" element={<Navigate to="/portfolio" replace />} />

      {/* GRACIAS */}
      <Route path="/gracias" element={<Gracias />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

      {/* SOBRE NOSOTROS */}
      <Route
        path="/sobre-nosotros"
        element={
          <Layout page="sobrenosotros" showVideo={false} logo={logoZincel} brandName="">
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"></div>
            <SobreNosotros />
          </Layout>
        }
      />

      {/* PRECIOS WEB */}
      <Route
        path="/precios-web"
        element={
          <Layout page="precios-web" showVideo={false} logo={logoZincel} brandName="">
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"></div>
            <PreciosWeb />
          </Layout>
        }
      />

      {/* EXPERIENCIAS */}
      <Route
        path="/experiencias"
        element={
          <Layout
            page="experiencias"
            showVideo={false}
            logo={logoZincel}
            hideNavs={false} /*// <--- Oculta Navbar y HeroHeader para esta página*/
            brandName="Zincel"
          >
            <Suspense fallback={<div className="loading-spinner">Cargando...</div>}>
              <Experiencias />
            </Suspense>
          </Layout>
        }
      />
    </Routes>
  );
}

function App() {
  useParallaxEffect([], {
    parallaxFactor: 0.2,
    debounceDelay: 10,
    threshold: 100,
  });

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
