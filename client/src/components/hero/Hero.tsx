import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useWhatsApp } from "../../hooks/useWhatsApp";
import HeroCubeScene from "./HeroCubeScene";
import { useTranslation } from "react-i18next";

interface Highlight { value: string; label: string }

export function Hero() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const modelContainerRef = useRef<HTMLDivElement>(null);
  const [showDesktopScene, setShowDesktopScene] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1025px)").matches : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1025px)");
    const updateSceneVisibility = () => setShowDesktopScene(mediaQuery.matches);

    updateSceneVisibility();

    const onChange = (event: MediaQueryListEvent) => {
      setShowDesktopScene(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    }

    // fallback para navegadores antiguos
    mediaQuery.addListener(onChange as unknown as EventListener);
    return () => mediaQuery.removeListener(onChange as unknown as EventListener);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
        .fromTo(
          subtitleRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.55"
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.35 },
          "-=0.45"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!showDesktopScene || !modelContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        modelContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [showDesktopScene]);

  const whatsApp = useWhatsApp();
  const handleWhatsAppClick = () => {
    whatsApp({
      text: t("contactSection.whatsappText"),
      section: "Hero",
      component: "Hero",
      variant: "primary",
    });
  };

  const highlights = t("hero.highlights", { returnObjects: true }) as Highlight[];

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-zinc-100 text-zinc-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-[-8%] h-80 w-80 rounded-full bg-white/75 blur-3xl" />
        <div className="absolute right-[-10%] top-1/4 h-[24rem] w-[24rem] rounded-full bg-[#d8d0c3]/75 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid items-start gap-12 pt-28 pb-16 min-[1025px]:min-h-[calc(100svh-5rem)] min-[1025px]:grid-cols-[1.06fr_0.94fr] min-[1025px]:gap-16 min-[1025px]:pt-28 min-[1025px]:pb-20 xl:min-h-[100svh] xl:items-center xl:pt-32 xl:pb-24">
          <div className="space-y-8">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{t("hero.eyebrow")}</p>

            <div className="space-y-6">
              <h1
                ref={titleRef}
                className="max-w-4xl text-[clamp(2.6rem,5vw,4rem)] leading-[0.98] tracking-[-0.04em]"
              >
                {t("hero.title")}
              </h1>
              <span className="max-w-4xl text-[clamp(2.6rem,5vw,3.5rem)] leading-[0.98] tracking-[-0.04em]">
                {t("hero.accent")}
              </span>
              <p
                ref={subtitleRef}
                className="max-w-xl text-[17px] leading-7 text-zinc-700 lg:text-lg"
              >
                {t("hero.subtitle")}
              </p>
            </div>

            <div ref={ctaRef} className="flex flex-wrap items-center gap-5">
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex rounded-[0rem] items-center gap-3 bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-black"
              >
                {t("hero.primaryCta")}
                <ArrowRight className="h-4 w-4" />
              </button>

              <Link
                to="/portfolio"
                className="inline-flex items-center gap-3 text-sm font-medium text-zinc-900 transition-colors duration-300 hover:text-zinc-600"
              >
                {t("hero.secondaryCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.value} className="space-y-1">
                  <p className="text-sm text-zinc-900">{item.value}</p>
                  <p className="text-sm leading-6 text-zinc-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/**-----------------------SCENA THREE - CUBRE ---------------------- */
          /**------------------------------------------------------------------ */}
          {showDesktopScene ? (
            <div ref={modelContainerRef} className="relative h-[480px] bg-zinc-100">
              <HeroCubeScene
                className="absolute inset-0 z-0 opacity-80"
                theme="light"
                delayMs={300}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default Hero;
