/**client/src/components/HeroServicios.tsx */

import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { buildWhatsAppUrl, trackWhatsAppClick } from "../../utils/whatsapp";
import HeroBg from "./HeroBg";

export interface HeroServiciosContent {
  eyebrow: string;
  title: string[];
  subtitle: string;
  ctaLabel: string;
  whatsappText: string;
  stats: { value: string; label: string }[];
  benefits: { title: string; description: string }[];
}

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LineReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

const TITLE = ["Cuatro disciplinas", "Una dirección visual clara."];
const STATS = [
  { value: "4 frentes", label: "Desarrollo web, branding, UI/UX y visuales 3D bajo una misma dirección." },
  { value: "Enfoque comercial", label: "Cada decisión visual busca ayudarte a explicar mejor tu valor." },
  { value: "Proceso claro", label: "Trabajamos con estructura, prioridades y entregables aterrizados." },
];
const WHATSAPP_TEXT = "Hola, vi sus servicios y quiero saber cómo pueden ayudar a mi marca";

export default function HeroServicios() {
  const title        = TITLE;
  const stats        = STATS;
  const whatsappText = WHATSAPP_TEXT;
  const whatsappHref = buildWhatsAppUrl(whatsappText);

  const trackCta = (section: string, variant: string) => {
    trackWhatsAppClick({ text: whatsappText, href: whatsappHref, section, component: "HeroServicios", variant });
  };

  return (
    <main className="overflow-x-hidden bg-[#0a0a0a] text-[#f4f1ea]">
      <section className="relative overflow-hidden border-b border-white/8">
        <HeroBg />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
            <div className="space-y-8">
              <FadeIn>
                <span className="inline-flex border border-[#e9c893]/30 bg-[#e9c893]/8 px-4 py-2 font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
                  Servicios
                </span>
              </FadeIn>

              <LineReveal>
                <h1 className="font-display max-w-7xl text-[clamp(3rem,7vw,3.5rem)] font-medium leading-[0.92] tracking-[-0.05em] text-white">
                  <span className="block">{title[0]}</span>
                  <span className="mt-2 block text-white/60">{title[1]}</span>
                </h1>
              </LineReveal>

              <FadeIn delay={0.1}>
                <p className="max-w-2xl text-[17px] leading-8 text-[#f4f1ea]/60 lg:text-xl">
                  Diseñamos experiencias digitales con criterio visual, estructura y una intención comercial definida para que tu marca comunique mejor y convierta con más intención.
                </p>
              </FadeIn>

              <FadeIn delay={0.2} className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCta("Hero", "primary")}
                  className="inline-flex items-center justify-between gap-4 border border-[#e9c893]/40 bg-[#e9c893]/10 px-6 py-4 text-sm font-medium text-[#e9c893] transition-all hover:bg-[#e9c893]/20 hover:border-[#e9c893]/70"
                >
                  <span>Hablemos de tu proyecto</span>
                  <ArrowUpRight className="h-4 w-4" />
                </motion.a>

                <a
                  href="#deliverables"
                  className="inline-flex items-center gap-3 border border-white/15 px-6 py-4 text-sm text-white/50 transition-colors hover:border-white/30 hover:text-white/80"
                >
                  Ver entregables
                  <ChevronRight className="h-4 w-4" />
                </a>
              </FadeIn>
            </div>

            {/* Card de stats — adaptada al tema oscuro */}
            <FadeIn delay={0.2} className="lg:pl-10">
              <div className="border border-white/10 bg-white/4 p-6 backdrop-blur-sm">
                <p className="font-body text-[10px] uppercase tracking-[.28em] text-[#e9c893]/70">
                  Vista General
                </p>
                <div className="mt-6 grid gap-4">
                  {stats.slice(0, 3).map((stat) => (
                    <div key={stat.value} className="border border-white/8 bg-white/4 p-5">
                      <p className="font-display text-2xl leading-none tracking-[-0.04em] text-white">{stat.value}</p>
                      <p className="mt-3 text-sm leading-6 text-[#f4f1ea]/50">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}

export const HERO_SERVICIOS_CONTENT = {
  es: { whatsappText: "Hola, vi sus servicios y quiero saber cómo pueden ayudar a mi marca" },
  en: { whatsappText: "Hi, I saw your services and I'd like to know how you can help my brand" },
};
