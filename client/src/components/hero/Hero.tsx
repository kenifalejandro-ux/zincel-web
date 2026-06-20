/**client/src/components/hero/hero.tsx */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useWhatsApp } from "../../hooks/useWhatsApp";
import HeroCubeScene from "./HeroCubeScene";
import HeroBg from "./HeroBg";

const HIGHLIGHTS = [
  { value: "LCP < 2s", label: "Performance cuidada." },
  { value: "+40%", label: "Más intención de contacto." },
  { value: "Lima", label: "Trabajo directo y cercano." },
];

const WHATSAPP_TEXT = "Hola, quiero iniciar mi proyecto web con Zincel 🚀";

export function Hero() {
  const heroRef          = useRef<HTMLDivElement>(null);
  const titleRef         = useRef<HTMLHeadingElement>(null);
  const subtitleRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef           = useRef<HTMLDivElement>(null);
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
    whatsApp({ text: WHATSAPP_TEXT, section: "Hero", component: "Hero", variant: "primary" });
  };

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-[#0a0a0a] text-[#f4f1ea]">
      <HeroBg />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid items-start gap-12 pt-28 pb-16 min-[1025px]:min-h-[calc(100svh-5rem)] min-[1025px]:grid-cols-[1.06fr_0.94fr] min-[1025px]:gap-16 min-[1025px]:pt-28 min-[1025px]:pb-20 xl:min-h-[100svh] xl:items-center xl:pt-32 xl:pb-24">

          {/* LEFT — texto */}
          <div className="space-y-8">
            <p className="font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
              Zincel Ideas Globales, Lima
            </p>

            <div className="space-y-4">
              <h1
                ref={titleRef}
                className="font-display max-w-4xl text-[clamp(2.6rem,5vw,4rem)] font-medium leading-[0.98] tracking-[-0.04em] text-white"
              >
                Diseñamos webs
              </h1>
              <span className="font-display block max-w-4xl text-[clamp(2.6rem,5vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.04em] text-white/70">
                UI / UX
              </span>
              <p
                ref={subtitleRef}
                className="max-w-xl text-[17px] leading-7 text-[#f4f1ea]/60 lg:text-lg"
              >
                Transformamos tus ideas en realidades digitales impactantes. Diseño, desarrollo y creatividad sin límites
              </p>
            </div>

            <div ref={ctaRef} className="flex flex-wrap items-center gap-5">
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-3 border border-[#e9c893]/40 bg-[#e9c893]/10 px-5 py-3 text-sm font-medium text-[#e9c893] transition-all duration-300 hover:bg-[#e9c893]/20 hover:border-[#e9c893]/70"
              >
                Iniciar proyecto
                <ArrowRight className="h-4 w-4" />
              </button>

              <Link
                to="/portfolio"
                className="inline-flex items-center gap-3 text-sm font-medium text-white/40 transition-colors duration-300 hover:text-white/70"
              >
                Ver proyectos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 border-t border-white/8 pt-6 sm:grid-cols-3">
              {HIGHLIGHTS.map((item) => (
                <div key={item.value} className="space-y-1">
                  <p className="font-body text-sm text-[#e9c893]">{item.value}</p>
                  <p className="font-body text-sm leading-6 text-white/35">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — escena 3D */}
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

export default Hero;
