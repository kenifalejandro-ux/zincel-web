// client/src/components/sections/ServicesAccordion.tsx
// Acordeón de servicios usando Radix UI

import { useEffect, useRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useInView } from "../../hooks/useInView";
import { ArrowRight } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export interface ServicesAccordionItem {
  id: string;
  title: string;
  description: string;
  details: string;
  icon?: ReactNode;
  benefits?: string[];
  href?: string;
}

export interface ServicesAccordionProps {
  title: string;
  subtitle?: string;
  services: ServicesAccordionItem[];
}

export function ServicesAccordion({ title, subtitle, services }: ServicesAccordionProps) {
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
      className="relative overflow-hidden border-y border-black/10 bg-[#f7f2ea] py-20 lg:py-28"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Capabilities</p>
            <h2 className="text-3xl leading-tight tracking-[-0.03em] text-zinc-900 lg:text-4xl">
              {title}
            </h2>
          </div>

          {subtitle && (
            <p className="max-w-2xl text-base leading-7 text-zinc-600 lg:justify-self-end">
              {subtitle}
            </p>
          )}
        </div>

        <Accordion type="single" collapsible className="border-t border-black/10">
          {services.map((service, idx) => (
            <AccordionItem
              key={service.id}
              value={service.id}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className="border-b border-black/10"
            >
              <AccordionTrigger className="py-6 hover:no-underline">
                <div className="flex items-start gap-4 text-left">
                  {service.icon ? (
                    <div className="pt-1 text-xl text-zinc-700">{service.icon}</div>
                  ) : null}
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.18em] text-zinc-500">
                      0{idx + 1}
                    </p>
                    <h3 className="text-xl text-zinc-900 lg:text-2xl">{service.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="max-w-3xl text-zinc-700 leading-8">{service.details}</p>

                  {service.benefits?.length ? (
                    <div className="space-y-2">
                      <h4 className="text-sm text-zinc-500">Que incluye</h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {service.benefits.map((benefit, i) => (
                          <p
                            key={i}
                            className="border-b border-black/10 pb-2 text-sm text-zinc-600"
                          >
                            {benefit}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {service.href ? (
                    <div className="pt-4">
                      <Link
                        to={service.href}
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 transition-all hover:gap-3"
                      >
                        Explorar servicio
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : null}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
