// client/src/components/sections/ImpactStats.tsx
// Muestra resultados medibles: lo que importa al cliente (VENTAS)

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useInView } from "../../hooks/useInView";

interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

interface ImpactStatsProps {
  stats: StatItem[];
  title?: string;
  description?: string;
}

export function ImpactStats({ stats, title, description }: ImpactStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isInView || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animar números con contador
      statsRefs.current.forEach((stat, idx) => {
        if (!stat) return;

        const valueElement = stat.querySelector(".stat-value");
        if (!valueElement) return;

        const finalValue = parseInt((valueElement.textContent || "0").replace(/\D/g, ""));

        gsap.from(stat, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: idx * 0.1,
          ease: "power2.out",
        });

        // Contador numérico
        gsap.to(
          { val: 0 },
          {
            val: finalValue,
            duration: 2,
            delay: idx * 0.1,
            ease: "power2.out",
            onUpdate() {
              if (valueElement) {
                valueElement.textContent = Math.floor(this.val).toLocaleString();
              }
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section ref={containerRef} className="relative py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header opcional */}
        {(title || description) && (
          <div className="text-center mb-16 space-y-3">
            {title && <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900">{title}</h2>}
            {description && (
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">{description}</p>
            )}
          </div>
        )}

        {/* Grid de stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              ref={(el) => {
                statsRefs.current[idx] = el;
              }}
              className="text-center space-y-2"
            >
              {/* Valor grande */}
              <div className="stat-value text-5xl lg:text-6xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
                {stat.value}
                {stat.suffix && stat.suffix}
              </div>

              {/* Label */}
              <p className="text-lg text-zinc-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
