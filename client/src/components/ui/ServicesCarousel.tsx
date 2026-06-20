/* client/src/components/ui/ServicesCarousel.tsx */
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { ImageStack, type ImageStackImage } from "./ImageStack";
import { cn } from "./utils";
import HeroBg from "../hero/HeroBg";

export interface CarouselServiceItem {
  id: string;
  title: string;
  description: string;
  details: string;
  href: string;
  icon: ReactNode;
  benefits: string[];
  images?: ImageStackImage[];
  reverse: boolean;
}

interface ServicesCarouselProps {
  items: CarouselServiceItem[];
  className?: string;
}

export default function ServicesCarousel({ items, className = "" }: ServicesCarouselProps) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => { if (current > 0) setCurrent(current - 1); };
  const nextSlide = () => { if (current < items.length - 1) setCurrent(current + 1); };

  if (!items.length) return null;

  const service = items[current];
  const progress = ((current + 1) / items.length) * 100;
  const textOrderClass  = service.reverse ? "lg:order-2" : "lg:order-1";
  const mediaOrderClass = service.reverse ? "lg:order-1" : "lg:order-2";

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-[#0a0a0a] text-[#f4f1ea]", className)}>
        <HeroBg halo="50% 40%" dots="70% 30%" haloOpacity={30} dotsOpacity={18} />

      <div className="relative mx-auto max-w-7xl space-y-6 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">

        {/* Header: progreso + navegación */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
              Servicio destacado
            </p>
            <div className="mt-3 flex items-center gap-4">
              <div className="font-body text-sm text-[#f4f1ea]/40">
                <span className="text-white">{String(current + 1).padStart(2, "0")}</span>
                <span className="mx-2">/</span>
                <span>{String(items.length).padStart(2, "0")}</span>
              </div>
              <div className="h-px w-28 overflow-hidden bg-white/10 sm:w-36">
                <div
                  className="h-full bg-[#e9c893] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto">
            <button
              type="button"
              onClick={prevSlide}
              disabled={current === 0}
              aria-label="Anterior"
              className="flex h-11 w-11 items-center justify-center border border-white/12 bg-white/6 text-[#f4f1ea] transition hover:-translate-x-0.5 hover:border-white/25 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              disabled={current === items.length - 1}
              aria-label="Siguiente"
              className="flex h-11 w-11 items-center justify-center border border-white/12 bg-white/6 text-[#f4f1ea] transition hover:translate-x-0.5 hover:border-white/25 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Card principal */}
        <article className="relative overflow-hidden border border-white/10 bg-[#0a0a0a] text-[#f4f1ea] p-6 backdrop-blur-sm transition-all duration-500 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_top_right,rgba(233,200,147,0.04),transparent_40%)]" />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)] lg:items-center lg:gap-14">

            {/* Texto */}
            <div className={cn("min-w-0", textOrderClass)}>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center border border-white/12 bg-white/8 text-[#e9c893]">
                  {service.icon}
                </div>
                <span className="border border-white/10 bg-white/6 px-3 py-1.5 font-body text-[10px] uppercase tracking-[.22em] text-[#e9c893]/70">
                  Servicio {String(current + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-8 max-w-2xl">
                <h3 className="font-display text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl lg:text-[3.35rem] lg:leading-[0.95]">
                  {service.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-8 text-[#f4f1ea]/65 sm:text-lg">
                  {service.description}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#f4f1ea]/40 sm:text-[15px]">
                  {service.details}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {service.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="border border-white/10 bg-white/5 px-3.5 py-2 text-[12px] tracking-[0.01em] text-[#f4f1ea]/60"
                  >
                    {benefit}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to={service.href}
                  className="inline-flex items-center gap-2 border border-[#e9c893]/40 bg-[#e9c893]/10 px-5 py-3 text-sm font-medium text-[#e9c893] transition-all duration-300 hover:gap-3 hover:bg-[#e9c893]/20 hover:border-[#e9c893]/70"
                >
                  Explorar servicio
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-sm text-[#f4f1ea]/30">
                  Diseño, claridad y una ejecución pensada para convertir.
                </p>
              </div>
            </div>

            {/* Imagen */}
            <div className={cn("min-w-0", mediaOrderClass)}>
              <div className="mx-auto w-full max-w-[560px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-5">
                <div className="mb-4 flex items-center justify-between px-1">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[.24em] text-[#e9c893]/60">
                      Vista Visual
                    </p>
                    <p className="mt-1 text-sm text-[#f4f1ea]/40">
                      Composición limpia y centrada en la pieza.
                    </p>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e9c893] shadow-[0_0_0_6px_rgba(233,200,147,0.12)]" />
                </div>

                {service.images && service.images.length > 0 ? (
                  <ImageStack
                    layout="inline"
                    images={service.images}
                    className="mx-auto max-w-full"
                    imageClassName="rounded-none"
                  />
                ) : (
                  <div className="flex min-h-[280px] items-center justify-center border border-dashed border-white/10 bg-white/4 px-6 text-center text-sm text-[#f4f1ea]/30">
                    Vista previa disponible pronto.
                  </div>
                )}
              </div>
            </div>

          </div>
        </article>

        {/* Tabs de navegación */}
        <div className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Ir al slide ${index + 1}`}
              aria-pressed={current === index}
              className={cn(
                "border px-3.5 py-2 text-left transition-all duration-300",
                current === index
                  ? "border-[#e9c893]/50 bg-[#e9c893]/12 text-[#e9c893]"
                  : "border-white/10 bg-white/4 text-[#f4f1ea]/40 hover:border-white/20 hover:text-[#f4f1ea]/70"
              )}
            >
              <span className="font-body text-[10px] uppercase tracking-[.22em]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="ml-2 text-sm">{item.title}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
