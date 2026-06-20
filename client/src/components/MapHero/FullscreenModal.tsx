import { useEffect, useLayoutEffect, useRef, useCallback, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { X } from "lucide-react";
import Footer from "../global/Footer";
import HeroHeader, { type HeroPage } from "../hero/HeroHeader";
import { getTravelOrigin, clearTravelOrigin } from "./travelStore";

// Heroes inyectados por el modal (la página NO los incluye internamente)
const PAGE_HERO_MAP: Record<string, HeroPage> = {
  "/servicios":      "servicios",
  "/sobre-nosotros": "sobrenosotros",
};

interface Props {
  isOpen: boolean;
  children: ReactNode;
  path: string;
}

export default function FullscreenModal({ isOpen, children, path }: Props) {
  const navigate   = useNavigate();
  const location   = useLocation();
  const panelRef   = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const pageHero = PAGE_HERO_MAP[location.pathname] as HeroPage | undefined;

  // Estado inicial ANTES del primer paint: anclado en el pin, pequeño y transparente
  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const o = getTravelOrigin();
    if (o) {
      el.style.transformOrigin = `${o.x}px ${o.y}px`;
      gsap.set(el, { opacity: 0, scale: 0.35 });
    } else {
      el.style.transformOrigin = "50% 50%";
      gsap.set(el, { opacity: 0, scale: 0.98 });
    }
  }, [path]);

  // Entrada: crece desde el pin hacia el centro
  useEffect(() => {
    const el = panelRef.current;
    const sc = scrollRef.current;
    if (!el || !sc) return;
    closingRef.current = false;
    sc.scrollTop = 0;

    const o = getTravelOrigin();
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 0.95,
      ease: "expo.out",
      delay: o ? 0.45 : 0,
      onComplete: clearTravelOrigin,
    });
  }, [path]);

  // Cierre: se encoge de vuelta, Hero hace el zoom-out
  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    gsap.to(panelRef.current, {
      opacity: 0,
      scale: 0.92,
      duration: 0.5,
      ease: "expo.in",
      onComplete: () => navigate("/"),
    });
  }, [navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[50]">
      <button
        onClick={handleClose}
        aria-label="Volver al mapa"
        className="group fixed right-6 top-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-zinc-900/70 text-white backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:border-white/30 hover:bg-zinc-900"
      >
        <X className="h-5 w-5" />
      </button>

      {/* panel: crece desde el pin */}
      <div ref={panelRef} className="absolute inset-0 will-change-[transform,opacity]">
        <div ref={scrollRef} className="absolute inset-0 overflow-x-hidden overflow-y-auto bg-[#f3efe7]">
          {pageHero && <HeroHeader page={pageHero} />}
          <div className="min-h-screen">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
