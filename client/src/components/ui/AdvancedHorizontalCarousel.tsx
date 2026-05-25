import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AdvancedHorizontalCarouselProps<T> {
  slides: T[];
  renderSlide: (slide: T, index: number, isActive: boolean) => React.ReactNode;
  className?: string;
  showProgress?: boolean;
  showIndicators?: boolean;
  backgroundColor?: string;
}

export function AdvancedHorizontalCarousel<T>({
  slides,
  renderSlide,
  className = "",
  showProgress = true,
  showIndicators = true,
  backgroundColor = "transparent",
}: AdvancedHorizontalCarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const panels = panelsRef.current;
    if (!container || !panels || slides.length === 0) return;

    // Evitamos cálculos repetitivos
    const getScrollAmount = () => -(panels.scrollWidth - window.innerWidth);

    const tween = gsap.to(panels, {
      x: getScrollAmount,
      ease: "none",
      // duration no es necesario con scrub
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${Math.abs(getScrollAmount())}`,
      pin: true,
      pinSpacing: true,
      animation: tween,
      scrub: 0.5, // un poco de suavizado (0 = instantáneo, 1 = muy suave)
      invalidateOnRefresh: true,
      anticipatePin: 1, // evita flash blanco al pinnear
      onUpdate: (self) => {
        const prog = self.progress;
        setProgress(prog);

        // Snap suave al slide más cercano
        const snapIndex = Math.round(prog * (slides.length - 1));
        setActiveIndex(Math.max(0, Math.min(snapIndex, slides.length - 1)));
      },
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    ScrollTrigger.refresh(); // importante al montar

    return () => {
      trigger?.kill();
      tween?.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, [slides.length]); // dependencia mínima

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ backgroundColor, minHeight: "100vh" }}
    >
      {showProgress && (
        <div className="fixed inset-x-0 top-0 z-50 h-1 bg-gray-800/30">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}

      {showIndicators && (
        <>
          {/* Dots centrados abajo */}
          <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 gap-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  // Opcional: scroll suave a slide
                  const panel = panelsRef.current?.children[i] as HTMLElement;
                  if (panel) {
                    gsap.to(window, {
                      scrollTo: containerRef.current!.offsetTop + panel.offsetLeft,
                      duration: 1.2,
                      ease: "power2.inOut",
                    });
                  }
                }}
                className={`h-3 rounded-full transition-all duration-400 ${
                  i === activeIndex
                    ? "w-12 bg-white shadow-lg shadow-purple-500/50"
                    : "w-3 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Ir al slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Contador lateral */}
          <div className="fixed right-6 top-1/2 z-50 -translate-y-1/2 text-zinc-800 pointer-events-none">
            <div className="flex flex-col items-center gap-1 text-sm font-medium tracking-wider">
              <span className="text-4xl font-bold text-zinc-800 drop-shadow-lg">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <div className="h-10 w-px bg-white/30 my-1" />
              <span className="opacity-60">{String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>
        </>
      )}

      <div ref={panelsRef} className="flex h-screen w-max will-change-transform">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="h-full w-screen flex-shrink-0 flex items-center justify-center px-4 md:px-12"
          >
            {renderSlide(slide, index, index === activeIndex)}
          </div>
        ))}
      </div>
    </div>
  );
}
