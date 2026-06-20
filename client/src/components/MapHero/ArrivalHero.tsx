// client/src/components/MapHero/ArrivalHero.tsx
// Aterrizaje oscuro que HEREDA el mundo del mapa (#0a0a0a, oro, Bodoni).
// Se coloca como PRIMERA sección de cada página (dentro del FullscreenModal,
// encima del contenido real). Saluda al mapa con las coordenadas del pin
// y el eco de la textura de puntos.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { t, fmtCoords, type Pin, type Lang } from "./data";

interface Props {
  pin: Pin;
  lang?: Lang;
}

export default function ArrivalHero({ pin, lang = "es" }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const briefing = pin.kind === "briefing";
  const accentText = briefing ? "text-violet-300" : "text-[#e9c893]";

  // Revela las líneas en stagger al montar (coincide con el zoom del mapa)
  useEffect(() => {
    const items = rootRef.current?.querySelectorAll("[data-r]") ?? [];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.08, delay: 0.5 }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [pin.id]);

  return (
    <section
      ref={rootRef}
      className="relative grid min-h-screen place-items-center overflow-hidden bg-[#0a0a0a] px-6"
    >
      {/* halo suave */}
      <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(120%_90%_at_50%_30%,rgba(233,200,147,0.06),transparent_55%)]" />
      {/* eco de la textura de puntos del mapa — el saludo al heromap */}
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(244,241,234,0.10)_1px,transparent_1.4px)] [background-size:26px_26px] [mask-image:radial-gradient(80%_70%_at_50%_45%,#000,transparent)]" />

      <div className="relative w-full max-w-4xl text-center">
        <div data-r className={`mb-7 flex items-center justify-center gap-4 font-body text-[11px] uppercase tracking-[.34em] ${accentText}`}>
          <span className="h-px w-10 bg-current opacity-40" />
          {t(pin.sub, lang)}
          <span className="h-px w-10 bg-current opacity-40" />
        </div>

        <h1
          data-r
          className="font-display text-[clamp(56px,11vw,150px)] font-medium leading-[.9] tracking-[-.02em] text-white"
        >
          {t(pin.name, lang)}
        </h1>

        <p
          data-r
          className="mx-auto mt-7 max-w-[24em] font-display text-[clamp(19px,2.4vw,26px)] italic leading-[1.4] text-[#f4f1ea]/85"
        >
          {t(pin.lede, lang)}
        </p>

        {/* Saludo al mapa: las coordenadas reales del pin */}
        <div data-r className="mt-9 font-body text-[11px] tabular-nums tracking-[.28em] text-white/35">
          {fmtCoords(pin.lon, pin.lat)}
        </div>

        <div data-r className="mt-16 flex flex-col items-center gap-2 font-body text-[10px] uppercase tracking-[.3em] text-white/40">
          <span>{lang === "es" ? "Desplázate" : "Scroll"}</span>
          <span className="h-7 w-px animate-pulse bg-gradient-to-b from-[#e9c893] to-transparent" />
        </div>
      </div>
    </section>
  );
}