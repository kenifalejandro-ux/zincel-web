/** client/src/components/hero/HeroPortfolio.tsx */

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { useWhatsApp } from "../../hooks/useWhatsApp";
import { ImageStack } from "../ui/ImageStack";
import { useTranslation } from "react-i18next";

export default function HeroPortfolio() {
  const { t } = useTranslation();

  const heroRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const highlightsRef = useRef<HTMLDivElement | null>(null);
  const supportRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(eyebrowRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 })
        .fromTo(titleRef.current, { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)" }, { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.05, ease: "power4.out" }, "-=0.2")
        .fromTo(supportRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, "-=0.55")
        .fromTo(subtitleRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75 }, "-=0.35")
        .fromTo(rightPanelRef.current, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, "-=0.45")
        .fromTo(ctaRef.current?.children || [], { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.1 }, "-=0.35")
        .fromTo(highlightsRef.current?.children || [], { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, stagger: 0.08 }, "-=0.2");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const whatsApp = useWhatsApp();
  const handleWhatsAppClick = () => {
    whatsApp({ text: t("heroPortfolio.whatsappText"), section: "Hero Portfolio", component: "HeroPortfolio", variant: "secondary" });
  };

  const highlights = t("heroPortfolio.highlights", { returnObjects: true }) as { value: string; label: string }[];
  const signals = t("heroPortfolio.signals", { returnObjects: true }) as string[];

  return (
    <section ref={heroRef} className="relative overflow-hidden py-20 border-b border-black/10 bg-[#f5f3ee] text-zinc-900">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid min-[1025px]:grid-cols-[1.08fr_0.92fr] min-[1025px]:items-stretch">
          <div className="flex min-h-[88vh] flex-col justify-between border-b border-black/10 py-24 min-[1025px]:border-b-0 min-[1025px]:border-r min-[1025px]:border-black/10 min-[1025px]:pr-10 xl:pr-14">
            <div className="flex items-start justify-between gap-6">
              <p ref={eyebrowRef} className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                {t("heroPortfolio.eyebrow")}
              </p>
            </div>

            <div className="mt-auto space-y-8 pt-16">
              <div className="space-y-5">
                <h1
                  ref={titleRef}
                  className="whitespace-pre-line text-[clamp(3rem,4vw,5rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-zinc-950"
                >
                  {t("heroPortfolio.title")}
                </h1>
                <p ref={supportRef} className="max-w-xl text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  {t("heroPortfolio.support")}
                </p>
                <p ref={subtitleRef} className="max-w-2xl text-[16px] leading-7 text-zinc-700 lg:text-[17px]">
                  {t("heroPortfolio.subtitle")}
                </p>
              </div>

              <div className="grid gap-8 border-t border-black/10 pt-8 md:grid-cols-[1fr_auto] md:items-start">
                <div ref={highlightsRef} className="grid gap-4 sm:grid-cols-1">
                  {highlights.map((item) => (
                    <div key={item.value} className="space-y-1">
                      <p className="text-sm text-zinc-900">{item.value}</p>
                      <p className="text-sm leading-6 text-zinc-600">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div ref={ctaRef} className="flex w-full flex-col gap-3 md:w-[250px]">
                  <button
                    onClick={handleWhatsAppClick}
                    className="group inline-flex items-center justify-between border border-zinc-900 bg-zinc-950 px-5 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-black"
                  >
                    <span>{t("heroPortfolio.primaryCta")}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div ref={rightPanelRef} className="flex min-h-[88vh] flex-col justify-between py-10 min-[1025px]:pl-10 xl:pl-14">
            <div className="space-y-6 border-t border-black/10 pt-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">{t("heroPortfolio.capabilitiesLabel")}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {signals.map((signal) => (
                  <p key={signal} className="border-b border-black/10 pb-3 text-base text-zinc-800">{signal}</p>
                ))}
              </div>
            </div>

            <div className="my-8 border border-black/10 bg-zinc-950 p-4 sm:p-5">
              <ImageStack
                layout="stacked"
                images={[{ src: "/imagenes-optim/Hero/portfolio/life-project", alt: "Comunicación como tensión creativa", stackLayer: "secondary", surfaceClassName: "border border-black rounded-none", imageClassName: "rounded-none" }]}
              />
            </div>

            <div className="border-t border-black/10 pt-5">
              <p className="max-w-sm text-[11px] uppercase tracking-[0.22em] text-zinc-500">{t("heroPortfolio.quote")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
