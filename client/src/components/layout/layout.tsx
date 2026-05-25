/*src/components/layout/Layout.tsx*/

import React, { ReactNode } from "react";
import HeroHeader from "../hero/HeroHeader";
import { Header } from "../global/header";
import Navbar from "../global/Navbar";
import Footer from "../global/Footer";
import "../../styles/layout.css";

type LayoutProps = {
  children: ReactNode;
  page?: string;
  showVideo?: boolean;
  logo: string;
  brandName?: string;
  hideNavs?: boolean; // Esta es la prop clave
  hideHeroHeader?: boolean;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  page = "default",
  showVideo = false,
  logo,
  brandName,
  hideNavs = false, // 1. Debes recibirla aquí y darle un valor por defecto
  hideHeroHeader = false,
}) => {
  return (
    <div className="main-container">
      {/* 2. Envolvemos cada componente en un condicional */}
      {!hideNavs && <Header logo={logo} brandName={brandName} />}

      {!hideNavs && !hideHeroHeader && (
        <HeroHeader page={page as "inicio" | "portfolio"} showVideo={showVideo} />
      )}

      <main role="main">
        {children}
        {/* 3. Aquí es donde se ocultan las "pestañas" (Navbar) */}
        {!hideNavs && <Navbar />}
      </main>

      {!hideNavs && <Footer />}
    </div>
  );
};

export default Layout;
