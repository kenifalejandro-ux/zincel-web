// client/src/components/sections/ServicesGridMinimal.tsx
// Servicios con fondo blanco/zinc-100 y textos negros: COMERCIAL NO INFORMATIVO

import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useInView } from "../../hooks/useInView";
import { ArrowRight } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
  href?: string;
  benefits?: string[];
}

interface ServicesGridMinimalProps {
  title: string;
  subtitle?: string;
  services: Service[];
}

export function ServicesGridMinimal({ title, subtitle, services }: ServicesGridMinimalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!isInView || !containerRef.current) return;

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;

        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          delay: idx * 0.1,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-white to-zinc-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900">{title}</h2>
          {subtitle && <p className="text-lg text-zinc-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <a
              key={service.id}
              href={service.href || "#"}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="group relative p-8 bg-white border border-zinc-200 rounded-2xl hover:shadow-xl hover:border-purple-300 transition-all duration-300 cursor-pointer"
            >
              {/* Icon */}
              {service.icon && (
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
              )}

              {/* Title */}
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">{service.title}</h3>

              {/* Description */}
              <p className="text-zinc-600 text-sm mb-4 leading-relaxed">{service.description}</p>

              {/* Benefits si existen */}
              {service.benefits && service.benefits.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {service.benefits.slice(0, 2).map((benefit, i) => (
                    <li key={i} className="text-xs text-zinc-500 flex items-start gap-2">
                      <span className="text-purple-600 font-bold">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA */}
              <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm group-hover:gap-3 transition-all">
                Explorar
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
