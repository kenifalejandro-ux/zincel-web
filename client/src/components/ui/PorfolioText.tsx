/*client/src/components/PortfolioText.tsx*/

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { portfolioProjects } from "../../data/portfolioProjects";

export function PortfolioText() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    const track = carouselRef.current;
    const items = Array.from(track.children) as HTMLElement[];

    // Calcular ancho total
    const totalWidth = items.reduce((acc, el) => acc + el.offsetWidth, 0);

    // Crear animación infinita más fluida
    animationRef.current = gsap.to(items, {
      x: -totalWidth / 2,
      ease: "none",
      duration: 60,
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % (totalWidth / 2)}px`,
      },
    });

    return () => {
      animationRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
    if (animationRef.current) {
      gsap.to(animationRef.current, { timeScale: 0.1, duration: 0.8, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    if (animationRef.current) {
      gsap.to(animationRef.current, { timeScale: 1, duration: 0.8, ease: "power2.in" });
    }
  };

  const duplicatedProjects = [...portfolioProjects, ...portfolioProjects];

  return (
    <section className="dark-image rounded-[10rem] relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-20  bg-zinc-500">
      {/* Indicador superior */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-zinc-100">
        <span className="w-8 h-px bg-zinc-500" />
        <span>Explora nuestros caso de éxito</span>
        <span className="w-8 h-px bg-zinc-500" />
      </div>

      {/* Carrusel */}
      <div ref={carouselRef} className="flex items-center">
        {duplicatedProjects.map((project, i) => {
          const isActive = activeIndex === i;

          return (
            <a
              key={i}
              href={project.href}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              className="group relative flex-shrink-0 px-12 md:px-24 lg:px-32 cursor-pointer transition-opacity duration-500"
              style={{
                opacity: activeIndex === null ? 1 : isActive ? 1 : 0.3,
                willChange: "transform",
              }}
            >
              {/* Número del proyecto */}
              <div className="absolute -top-8 left-12 md:left-24 lg:left-32">
                <span className="text-xs font-light tracking-wider text-zinc-100 group-hover:text-zinc-100 transition-all duration-500">
                  {String((i % portfolioProjects.length) + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Contenedor principal */}
              <div className="relative">
                {/* Línea decorativa superior */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 overflow-hidden">
                  <div
                    className="h-px bg-zinc-500 group-hover:bg-zinc-500 transition-all duration-700"
                    style={{
                      width: isActive ? "80px" : "40px",
                      transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </div>

                {/* Nombre del proyecto */}
                <h2
                  className="
                    text-[clamp(2.5rem,5vw,4.5rem)]
                    font-light
                    tracking-[-0.02em]
                    text-zinc-100
                    group-hover:text-zinc-100
                    transition-all duration-700
                    text-center
                    relative
                  "
                  style={{
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                    willChange: "transform",
                  }}
                >
                  {project.name}

                  {/* Efecto de subrayado animado */}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-zinc-500group-hover:bg-zinc-500 transition-all duration-700"
                    style={{
                      width: isActive ? "100%" : "0%",
                    }}
                  />
                </h2>

                {/* Descripción y metadata */}
                <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                  <p
                    className="
                      uppercase tracking-[0.25em]
                      text-zinc-100
                      group-hover:text-zinc-100
                      transition-all duration-500
                    "
                  >
                    {project.desc}
                  </p>

                  <span className="w-px h-3 bg-zinc-500" />

                  <span
                    className="
                      text-zinc-500
                      group-hover:text-zinc-500
                      transition-all duration-500
                      font-light
                    "
                  >
                    {project.year}
                  </span>
                </div>

                {/* Categoría - aparece en hover */}
                <div
                  className="mt-4 text-center overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: isActive ? "30px" : "0px",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  <span className="inline-block px-4 py-1 text-xs uppercase tracking-wider border border-zinc-500 rounded-full text-zinc-500">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Punto decorativo inferior */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                <div
                  className="w-1 h-1 rounded-full bg-zinc-500 group-hover:bg-zinc-500 transition-all duration-500"
                  style={{
                    transform: isActive ? "scale(1.5)" : "scale(1)",
                  }}
                />
              </div>
            </a>
          );
        })}
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5">
        {portfolioProjects.map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-zinc-500 transition-all duration-500"
            style={{
              backgroundColor:
                activeIndex !== null && activeIndex % portfolioProjects.length === i
                  ? "rgba(0,0,0,0.6)"
                  : "rgba(0,0,0,0.15)",
              transform:
                activeIndex !== null && activeIndex % portfolioProjects.length === i
                  ? "scale(1.5)"
                  : "scale(1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default PortfolioText;
