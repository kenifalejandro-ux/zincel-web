// client/src/components/sections/HeroStatement.tsx
// Componente de impacto: Narrativa de transformación (NO información)

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

interface HeroStatementProps {
  title: string; // "Transformamos visiones en experiencias que generan clientes"
  subtitle: string;
  cta: string;
  ctaLink?: string;
}

export function HeroStatement({ title, subtitle, cta, ctaLink }: HeroStatementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger animation
      const timeline = gsap.timeline();

      timeline
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: "power3.out",
          },
          0.2
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.6,
            ease: "power3.out",
          },
          0.4
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] flex items-center justify-center bg-zinc-100 overflow-hidden"
    >
      {/* Background gradient subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 to-blue-50/20 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center space-y-6">
        {/* Título potente: función + resultado */}
        <h1 ref={titleRef} className="text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
          {title}
        </h1>

        {/* Subtítulo: respaldo emocional */}
        <p
          ref={subtitleRef}
          className="text-xl lg:text-2xl text-zinc-600 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </p>

        {/* CTA: claro y directo */}
        <div className="pt-6">
          <a
            ref={ctaRef}
            href={ctaLink || "#"}
            className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-all duration-300 font-medium"
          >
            {cta}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
