// src/hooks/useGTMPageView.ts

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useGTMPageView(): void {
  const location = useLocation();

  useEffect(() => {
    // Verificamos que dataLayer exista (GTM cargado)
    if (!window.dataLayer) return;

    window.dataLayer.push({
      event: "page_view",
      page_path: location.pathname + location.search, // Opcional: incluye query params
      page_title: document.title,
      // Puedes agregar más datos si lo deseas
      // page_location: window.location.href,
    });
  }, [location]); // Se ejecuta cada vez que cambia la ruta
}
