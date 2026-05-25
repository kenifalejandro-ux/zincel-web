// src/hooks/useParallaxEffect.ts

import { useEffect } from "react";
import { debounce } from "lodash";
import type { RefObject } from "react";

// Tipo para las opciones del hook
interface ParallaxOptions {
  parallaxFactor?: number; // Factor de velocidad del parallax (0.1 = lento, 0.5 = rápido)
  debounceDelay?: number; // Delay en ms para el debounce
  threshold?: number; // Píxeles antes de entrar al viewport para activar
  selectors?: string; // Selectores CSS personalizados (opcional)
}

// Tipo para las refs (si se pasan manualmente)
type ElementRef = RefObject<HTMLElement>;

const useParallaxEffect = (refs: ElementRef[] = [], options: ParallaxOptions = {}): void => {
  const { parallaxFactor = 0.2, debounceDelay = 10, threshold = 100, selectors = "" } = options;

  // Selectores por defecto (todas las secciones que quieres con parallax + scroll reveal)
  const defaultSelectors = `
    .capacidades-section,
    .collaboration-section,
    .experience-section,
    .growth-section,
    .why-us-section,
    .our-serviciosAcordeon,
    .process-bkarsApp,
    .bkars-section,
    .hero-bkars,
    .process-bkarslogo,
    .dbarbito-app,
    .hero-dbarbito,
    .dbarbitoGlb-section,
    .hero-intipintay,
    .IntiPintayLicores3d-section,
    .process-logoIntiPintay,
    .dbarbito-bkars,
    .proyecto-bkars,
    .proyecto-dbarbitoCoffee,
    .section-publicidad,
    .project-branding,
    .impact-section,
    .hero-puertadelvalle,
    .section-mockup,
    .section-projects,
    .visual-section,
    .services-branding,
    .webdev-section,
    .seo-section
  `.replace(/\s/g, ""); // Limpia espacios y saltos de línea

  const finalSelectors = selectors || defaultSelectors;

  const handleScroll = debounce(() => {
    const windowHeight = window.innerHeight;

    // Obtener elementos: primero las refs pasadas, luego fallback a selectores
    let elements: HTMLElement[] = [];

    if (refs.length > 0) {
      elements = refs
        .filter((ref): ref is RefObject<HTMLElement> => ref.current !== null)
        .map((ref) => ref.current!);
    } else {
      elements = Array.from(document.querySelectorAll(finalSelectors));
    }

    elements.forEach((container) => {
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const isInViewport = rect.top < windowHeight - threshold && rect.bottom > threshold;

      // 1. Scroll reveal: agregar/quitar clase para animación CSS
      if (isInViewport) {
        container.classList.add("scroll-visible");
      } else {
        container.classList.remove("scroll-visible");
      }

      // 2. Efecto parallax solo cuando está visible
      if (isInViewport) {
        const offset = (rect.top - windowHeight / 2) * parallaxFactor;
        const maxOffset = container.clientHeight * 0.1;
        const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, offset));

        container.style.transform = `translateY(${clampedOffset}px)`;
      } else {
        container.style.transform = "";
      }
    });
  }, debounceDelay);

  useEffect(() => {
    // Listeners con passive para mejor rendimiento en scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Ejecutar al montar
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      handleScroll.cancel(); // Cancela cualquier debounce pendiente
    };
  }, [refs, parallaxFactor, debounceDelay, threshold, finalSelectors]);
};

export default useParallaxEffect;
