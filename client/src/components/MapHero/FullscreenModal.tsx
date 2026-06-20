import { useEffect, useLayoutEffect, useRef, useCallback, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { X } from "lucide-react";
import Footer from "../global/Footer";
import HeroHeader, { type HeroPage } from "../hero/HeroHeader";

interface Props {
  isOpen: boolean;
  children: ReactNode;
  path: string;
}

// Páginas que tienen su propio HeroHeader y cuál es su page key
const HERO_PAGE_MAP: Record<string, HeroPage> = {
  "/servicios":      "servicios",
  "/sobre-nosotros": "sobrenosotros",
  // /inicio → inicio.tsx ya incluye HeroHeaderVideos internamente
  // /portfolio → Portfolio.tsx ya incluye HeroPortfolio internamente
  // /precios-web, /experiencias, /contactanos → sin hero de sección
};

export default function FullscreenModal({ isOpen, children, path }: Props) {
  const navigate   = useNavigate();
  const flipperRef = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  // Establece estado inicial ANTES del primer paint → sin flash
  useLayoutEffect(() => {
    const el = flipperRef.current;
    if (!el) return;
    gsap.set(el, { rotationY: -70, opacity: 0 });
  }, [path]);

  // Animación de entrada
  useEffect(() => {
    const el = flipperRef.current;
    const sc = scrollRef.current;
    if (!el || !sc) return;
    closingRef.current = false;
    sc.scrollTop = 0;

    gsap.to(el, {
      rotationY: 0,
      opacity: 1,
      duration: 0.85,
      ease: "expo.out",
    });
  }, [path]);

  // Cierre con flip inverso
  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    gsap.to(flipperRef.current, {
      rotationY: 70,
      opacity: 0,
      duration: 0.5,
      ease: "expo.in",
      onComplete: () => navigate("/"),
    });
  }, [navigate]);

  // ESC para cerrar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  if (!isOpen) return null;

  const heroPage = HERO_PAGE_MAP[path];

  return (
    <div
      className="fixed inset-0 z-[50]"
      style={{ perspective: "2000px", perspectiveOrigin: "50% 50%" }}
    >
      {/* Botón X fuera del flipper para que no se deforme */}
      <button
        onClick={handleClose}
        className="fixed right-6 top-6 z-[70] flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900/90 text-white backdrop-blur-sm transition-transform duration-200 hover:scale-110 hover:bg-zinc-900"
        aria-label="Cerrar"
      >
        <X className="h-5 w-5" />
      </button>

      {/* flipperRef: solo maneja la rotación 3D */}
      <div
        ref={flipperRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* scrollRef: scroll del contenido */}
        <div
          ref={scrollRef}
          className="absolute inset-0 overflow-y-auto bg-[#f3efe7]"
        >
          {/* Hero de sección (solo para las páginas que lo tenían) */}
          {heroPage && <HeroHeader page={heroPage} />}

          {/* Contenido de la página */}
          <div className="min-h-screen">
            {children}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
