// client/src/components/sections/ValuePropsSectionClean.tsx
// Proposiciones de valor claras: por qué elegir Zincel (NO lista técnica)

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { useInView } from "../../hooks/useInView";

interface ValueProp {
  icon?: ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

interface ValuePropsProps {
  title: string;
  description?: string;
  valuProps: ValueProp[];
  layout?: "grid" | "alternating";
}

export function ValuePropsSection({
  title,
  description,
  valuProps,
  layout = "grid",
}: ValuePropsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isInView || !containerRef.current) return;

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((item, idx) => {
        if (!item) return;

        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          delay: idx * 0.12,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isInView]);

  if (layout === "alternating") {
    return (
      <section ref={containerRef} className="relative py-20 lg:py-32 bg-zinc-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900">{title}</h2>
            {description && (
              <p className="text-lg text-zinc-600 max-w-3xl mx-auto">{description}</p>
            )}
          </div>

          {/* Alternating layout */}
          <div className="space-y-16">
            {valuProps.map((prop, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className={`flex flex-col ${
                  idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 items-center`}
              >
                {/* Icon/Visual */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                  <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center">
                    {prop.icon && <div className="text-6xl opacity-80">{prop.icon}</div>}
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-4">
                  <h3 className="text-3xl lg:text-4xl font-bold text-zinc-900">{prop.title}</h3>
                  <p className="text-lg text-zinc-600 leading-relaxed">{prop.description}</p>
                  {prop.highlight && (
                    <div className="pt-4 border-l-4 border-purple-600 pl-4">
                      <p className="text-lg font-semibold text-zinc-900">💡 {prop.highlight}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Grid layout (default)
  return (
    <section ref={containerRef} className="relative py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900">{title}</h2>
          {description && <p className="text-lg text-zinc-600 max-w-3xl mx-auto">{description}</p>}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valuProps.map((prop, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className="group space-y-4 p-8 rounded-2xl bg-gradient-to-br from-white to-zinc-50 border border-zinc-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              {prop.icon && (
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {prop.icon}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-bold text-zinc-900">{prop.title}</h3>

              {/* Description */}
              <p className="text-zinc-600 leading-relaxed">{prop.description}</p>

              {/* Highlight */}
              {prop.highlight && (
                <p className="text-sm font-semibold text-purple-600 pt-2">✓ {prop.highlight}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
