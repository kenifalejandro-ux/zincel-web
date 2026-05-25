/* client/src/components/ui/ServicesCarousel.tsx */
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { ImageStack, type ImageStackImage } from "./ImageStack";
import { cn } from "./utils";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current < items.length - 1) setCurrent(current + 1);
  };

  if (!items.length) return null;

  const service = items[current];
  const progress = ((current + 1) / items.length) * 100;
  const textOrderClass = service.reverse ? "lg:order-2" : "lg:order-1";
  const mediaOrderClass = service.reverse ? "lg:order-1" : "lg:order-2";

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-400">
            {t("servicesCarousel.featured")}
          </p>

          <div className="mt-3 flex items-center gap-4">
            <div className="text-sm text-zinc-500">
              <span className="text-zinc-950">{String(current + 1).padStart(2, "0")}</span>
              <span className="mx-2">/</span>
              <span>{String(items.length).padStart(2, "0")}</span>
            </div>

            <div className="h-px w-28 overflow-hidden rounded-full bg-zinc-200 sm:w-36">
              <div
                className="h-full rounded-full bg-zinc-900 transition-all duration-500"
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
            aria-label={t("servicesCarousel.previous")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-900 shadow-[0_10px_30px_-22px_rgba(24,24,27,0.25)] transition hover:-translate-x-0.5 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            disabled={current === items.length - 1}
            aria-label={t("servicesCarousel.next")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-900 shadow-[0_10px_30px_-22px_rgba(24,24,27,0.25)] transition hover:translate-x-0.5 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <article className="relative overflow-hidden rounded-[32px] border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,246,243,0.94))] p-6 shadow-[0_26px_90px_-54px_rgba(24,24,27,0.24)] transition-all duration-500 hover:shadow-[0_30px_100px_-52px_rgba(24,24,27,0.28)] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(24,24,27,0.06),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.06),transparent_38%)]" />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)] lg:items-center lg:gap-14">
          <div className={cn("min-w-0", textOrderClass)}>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1.1rem] border border-black/6 bg-white text-zinc-900 shadow-[0_18px_40px_-28px_rgba(24,24,27,0.28)]">
                {service.icon}
              </div>

              <span className="rounded-full border border-black/8 bg-white/75 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                {t("servicesCarousel.serviceLabel")} {String(current + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-8 max-w-2xl">
              <h3 className="text-3xl font-medium tracking-[-0.05em] text-zinc-950 sm:text-4xl lg:text-[3.35rem] lg:leading-[0.95]">
                {service.title}
              </h3>

              <p className="mt-5 max-w-xl text-base leading-8 text-zinc-700 sm:text-lg">
                {service.description}
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-500 sm:text-[15px]">
                {service.details}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {service.benefits.map((benefit) => (
                <span
                  key={benefit}
                  className="rounded-full border border-black/8 bg-white/75 px-3.5 py-2 text-[12px] font-medium tracking-[0.01em] text-zinc-700"
                >
                  {benefit}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to={service.href}
                className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:gap-3 hover:bg-zinc-800"
              >
                {t("servicesCarousel.exploreService")}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <p className="text-sm text-zinc-400">
                {t("servicesCarousel.tagline")}
              </p>
            </div>
          </div>

          <div className={cn("min-w-0", mediaOrderClass)}>
            <div className="mx-auto w-full max-w-[560px] rounded-[2rem] border border-white/85 bg-white/60 p-4 shadow-[0_24px_80px_-48px_rgba(24,24,27,0.28)] backdrop-blur-sm sm:p-5">
              <div className="mb-4 flex items-center justify-between px-1">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-zinc-400">
                    {t("servicesCarousel.slideLabel")}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {t("servicesCarousel.slideDesc")}
                  </p>
                </div>

                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]" />
              </div>

              {service.images && service.images.length > 0 ? (
                <ImageStack
                  layout="inline"
                  images={service.images}
                  className="mx-auto max-w-full"
                  imageClassName="rounded-[2rem]"
                />
              ) : (
                <div className="flex min-h-[280px] items-center justify-center rounded-[1.75rem] border border-dashed border-black/10 bg-white/60 px-6 text-center text-sm text-zinc-400">
                  {t("servicesCarousel.imageSoon")}
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      <div className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={t("servicesCarousel.goToSlide", { index: index + 1 })}
            aria-pressed={current === index}
            className={cn(
              "rounded-full border px-3.5 py-2 text-left transition-all duration-300",
              current === index
                ? "border-zinc-900 bg-zinc-950 text-white shadow-[0_18px_40px_-26px_rgba(24,24,27,0.5)]"
                : "border-black/8 bg-white/70 text-zinc-500 hover:border-black/12 hover:text-zinc-900"
            )}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.22em]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="ml-2 text-sm">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
