/**client/src/components/heroSobreNosotros.tsx */
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { useWhatsApp } from "../../hooks/useWhatsApp";
import HeroCubeScene from "./HeroCubeScene";
import HeroBg from "./HeroBg";

export function HeroSobreNosotros() {
  const heroRef           = useRef<HTMLDivElement>(null);
  const titleRef          = useRef<HTMLHeadingElement>(null);
  const subtitleRef       = useRef<HTMLParagraphElement>(null);
  const ctaRef            = useRef<HTMLDivElement>(null);
  const modelContainerRef = useRef<HTMLDivElement>(null);

  const [showDesktopScene, setShowDesktopScene] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1025px)").matches : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1025px)");
    const update = () => setShowDesktopScene(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(titleRef.current,    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
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
    whatsApp({ text: "Hola, me interesa conocer más sobre la experiencia de Zincel y cómo pueden ayudar a mi negocio", section: "Hero", component: "HeroSobreNosotros", variant: "primary" });
  };

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-[#0a0a0a] text-[#f4f1ea]">
      <HeroBg />

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-12 lg:pt-32 lg:pb-24">
        <div className="grid min-h-[72vh] gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-8">
            <p className="font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
              Zincel Ideas Globales
            </p>
            <h1 ref={titleRef} className="font-display text-[clamp(2.7rem,5vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.05em] text-white">
              Nosotros transformamos marcas a través de experiencias digitales.
            </h1>
            <p ref={subtitleRef} className="max-w-2xl text-[17px] leading-7 text-[#f4f1ea]/60 lg:text-lg">
              Zincel nace desde Lima para ayudar a empresas y proyectos a verse con más criterio, más consistencia y más valor percibido en cada punto de contacto.
            </p>
            <div ref={ctaRef} className="flex flex-wrap items-center gap-5">
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-3 border border-[#e9c893]/40 bg-[#e9c893]/10 px-5 py-3 text-sm font-medium text-[#e9c893] transition-all duration-300 hover:bg-[#e9c893]/20 hover:border-[#e9c893]/70"
              >
                Iniciar proyecto
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
