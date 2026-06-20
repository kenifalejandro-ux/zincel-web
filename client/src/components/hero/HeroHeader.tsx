/**client/src/components/hero/HeroHeader.tsx */

import React, { lazy, Suspense } from "react";

const HeroPortfolio = lazy(() => import("./HeroPortfolio"));
const HeroServicios = lazy(() => import("./HeroServicios"));
const HeroSobreNosotros = lazy(() => import("./HeroSobreNosotros"));

export type HeroPage = "servicios" | "portfolio" | "sobrenosotros";

type HeroHeaderProps = {
  page: HeroPage;
};

const HeroHeader: React.FC<HeroHeaderProps> = ({ page }) => {
  return (
    <Suspense fallback={null}>
      {page === "servicios" && <HeroServicios />}
      {page === "portfolio" && <HeroPortfolio />}
      {page === "sobrenosotros" && <HeroSobreNosotros />}
    </Suspense>
  );
};

export default HeroHeader;
