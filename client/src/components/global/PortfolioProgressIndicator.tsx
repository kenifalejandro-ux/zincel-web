// client/src/components/global/PortfolioProgressIndicator.tsx

import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioCases } from "../../data/portfolioCases";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioProgressIndicator() {
  const location = useLocation();
  const navigate = useNavigate();
  const indicatorRef = useRef<HTMLDivElement>(null);

  if (!portfolioCases || portfolioCases.length === 0) return null;

  /**
   * Detecta el index aunque esté en sub-rutas:
   * /Portfolio
   * /Portfolio/puerta-del-valle
   */
  const currentIndex = portfolioCases.findIndex((section) =>
    location.pathname.toLowerCase().startsWith(section.path.toLowerCase())
  );

  // Si no pertenece a portfolio, no renderiza
  if (currentIndex === -1) return null;

  const handleClick = (index: number) => navigate(portfolioCases[index].path);

  const totalItems = portfolioCases.length;
  const filledHeight = ((currentIndex + 1) / totalItems) * 100;

  // 🔥 ScrollTrigger — hide on scroll
  useEffect(() => {
    if (!indicatorRef.current) return;

    const tween = gsap.to(indicatorRef.current, {
      opacity: 0,
      y: 24,
      ease: "power2.out",
      scrollTrigger: {
        trigger: document.body,
        start: "top+=120 top",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [location.pathname]);

  return (
    <div ref={indicatorRef} className="fixed bottom-8 left-8 z-50 hidden lg:block">
      <div className="relative">
        {/* Línea animada */}
        <div className="absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-t from-white/60 to-transparent top-0 bottom-0 overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 bg-white/80 transition-all duration-1000 ease-out"
            style={{ height: `${filledHeight}%` }}
          />
        </div>

        {/* Línea base */}
        <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-white/10 top-0 bottom-0" />

        {/* Dots */}
        <div className="flex flex-col gap-5 relative z-10">
          {portfolioCases.map((section, index) => {
            const isActive = currentIndex === index;

            return (
              <div key={section.id} className="relative group">
                {/* Tooltip */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 whitespace-nowrap">
                  <div className="bg-black/80 backdrop-blur-md text-zinc-800 text-sm px-4 py-2 rounded-lg shadow-2xl">
                    {section.name}
                  </div>
                </div>
                {/* Dot */}
                <button
                  onClick={() => handleClick(index)}
                  aria-label={`Ir a ${section.name}`}
                  className={`
          w-3 h-3 rounded-full transition-all duration-500 ease-out backdrop-blur-sm
          hover:scale-125 ring-4 ring-transparent hover:ring-white/30
          ${
            currentIndex === index
              ? `w-3 h-12 bg-gradient-to-b ${section.color} to-transparent shadow-2xl`
              : `bg-white/60 ${section.hoverClass}`
          }
         `}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
