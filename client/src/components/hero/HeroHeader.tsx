/**client/src/components/hero/HeroHeader.tsx */

import React, { lazy, Suspense } from "react";

// Lazy load de heroes
const HeroInicio = lazy(() => import("./Hero"));
const HeroPortfolio = lazy(() => import("./HeroPortfolio"));
const HeroServicios = lazy(() => import("./HeroServicios"));
const HeroSobreNosotros = lazy(() => import("./HeroSobreNosotros"));

export type HeroPage = "inicio" | "servicios" | "portfolio" | "sobrenosotros";

type HeroHeaderProps = {
  page: HeroPage;
  showVideo?: boolean;
};

const HeroHeader: React.FC<HeroHeaderProps> = ({ page }) => {
  return (
    <Suspense fallback={null}>
      {page === "inicio" && <HeroInicio />}
      {page === "servicios" && <HeroServicios />}
      {page === "portfolio" && <HeroPortfolio />}
      {page === "sobrenosotros" && <HeroSobreNosotros />}
    </Suspense>
  );
};

export default HeroHeader;
