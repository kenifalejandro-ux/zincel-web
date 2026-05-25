/**client/src/components/heroSobreNosotros.tsx */
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { useWhatsApp } from "../../hooks/useWhatsApp";
import HeroCubeScene from "./HeroCubeScene";
import { useTranslation } from "react-i18next";

export function HeroSobreNosotros() {
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
    const onChange = (event: MediaQueryListEvent) => setShowDesktopScene(event.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    }
    mediaQuery.addListener(onChange as unknown as EventListener);
    return () => mediaQuery.removeListener(onChange as unknown as EventListener);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
        .fromTo(subtitleRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.55")
        .fromTo(ctaRef.current?.children || [], { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.35 }, "-=0.45");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!showDesktopScene || !modelContainerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(modelContainerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5 });
    }, heroRef);
    return () => ctx.revert();
  }, [showDesktopScene]);

  const whatsApp = useWhatsApp();
  const handleWhatsAppClick = () => {
    whatsApp({ text: t("heroSobreNosotros.whatsappText"), section: "Hero", component: "HeroSobreNosotros", variant: "primary" });
  };

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-zinc-900 text-zinc-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-[-10%] top-24 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-12 lg:pt-32 lg:pb-24">
        <div className="grid min-h-[72vh] gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-8">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-300">{t("heroSobreNosotros.eyebrow")}</p>
            <h1 ref={titleRef} className="text-[clamp(2.7rem,5vw,4.8rem)] leading-[0.98] tracking-[-0.05em]">
              {t("heroSobreNosotros.title")}
            </h1>
            <p ref={subtitleRef} className="max-w-2xl text-[17px] leading-7 text-zinc-300 lg:text-lg">
              {t("heroSobreNosotros.subtitle")}
            </p>
            <div ref={ctaRef} className="flex flex-wrap items-center gap-5">
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-3 rounded-none bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 transition-colors duration-300 hover:bg-white"
              >
                {t("heroSobreNosotros.cta")}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {showDesktopScene ? (
              <div ref={modelContainerRef} className="relative h-[420px] overflow-hidden">
                <HeroCubeScene className="absolute inset-0 z-0 opacity-80" theme="dark" delayMs={300} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSobreNosotros;
