// client/src/components/sections/TestimonialsSectionClean.tsx
// Testimonios con enfoque en resultados y transformación (NO decorativo)

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { useInView } from "../../hooks/useInView";

interface Testimonial {
  id: string;
  client: string;
  role: string;
  company: string;
  quote: string;
  metric?: string;
  avatar?: string;
  logo?: ReactNode;
}

interface TestimonialsSectionProps {
  title: string;
  testimonials: Testimonial[];
  subtitle?: string;
}

export function TestimonialsSection({ title, testimonials, subtitle }: TestimonialsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isInView || !containerRef.current) return;

    const ctx = gsap.context(() => {
      testimonialRefs.current.forEach((testimonial, idx) => {
        if (!testimonial) return;

        gsap.from(testimonial, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          delay: idx * 0.15,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-zinc-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900">{title}</h2>
          {subtitle && <p className="text-lg text-zinc-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        {/* Grid de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              ref={(el) => {
                testimonialRefs.current[idx] = el;
              }}
              className="group relative p-8 bg-white border border-zinc-200 rounded-2xl hover:shadow-xl hover:border-purple-300 transition-all duration-300"
            >
              {/* Quote mark decoration */}
              <div className="absolute top-6 left-8 text-4xl text-purple-200 opacity-40">"</div>

              {/* Quote text */}
              <p className="text-lg text-zinc-800 font-medium mb-6 relative z-10 leading-relaxed">
                {testimonial.quote}
              </p>

              {/* Metric highlight si existe */}
              {testimonial.metric && (
                <div className="mb-6 pb-6 border-b border-zinc-200">
                  <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
                    {testimonial.metric}
                  </p>
                </div>
              )}

              {/* Client info */}
              <div className="flex items-center gap-4">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.client}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}

                <div>
                  <p className="font-bold text-zinc-900">{testimonial.client}</p>
                  <p className="text-sm text-zinc-600">
                    {testimonial.role}
                    {testimonial.company && ` • ${testimonial.company}`}
                  </p>
                </div>
              </div>

              {/* Logo company si existe */}
              {testimonial.logo && (
                <div className="mt-6 pt-6 border-t border-zinc-200 opacity-60">
                  {testimonial.logo}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
