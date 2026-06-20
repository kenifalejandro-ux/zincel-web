/**client/src/components/HeroServicios.tsx */

import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { buildWhatsAppUrl, trackWhatsAppClick } from "../../utils/whatsapp";

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
  const title = TITLE;
  const stats = STATS;
  const whatsappText = WHATSAPP_TEXT;
  const whatsappHref = buildWhatsAppUrl(whatsappText);

  const trackCta = (section: string, variant: string) => {
    trackWhatsAppClick({ text: whatsappText, href: whatsappHref, section, component: "HeroServicios", variant });
  };

  return (
    <main className="overflow-x-hidden bg-zinc-900 text-zinc-900 selection:bg-zinc-950 selection:text-white">
      <section className="relative overflow-hidden border-b border-black/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute right-[-8%] top-28 h-[28rem] w-[28rem] rounded-full bg-[#ddd4c6]/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
            <div className="space-y-8">
              <FadeIn>
                <span className="inline-flex rounded-full border border-black/10 bg-white/60 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-zinc-600 backdrop-blur-sm">
                  Servicios
                </span>
              </FadeIn>

              <LineReveal>
                <h1 className="max-w-7xl text-[clamp(3rem,7vw,3.5rem)] leading-[0.92] tracking-[-0.05em] text-zinc-100">
                  <span className="block">{title[0]}</span>
                  <span className="block mt-2">{title[1]}</span>
                </h1>
              </LineReveal>

              <FadeIn delay={0.1}>
                <p className="max-w-2xl text-[17px] leading-8 text-zinc-300 lg:text-xl">
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
                  className="inline-flex items-center justify-between gap-4 bg-zinc-950 px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-black"
                >
                  <span>Hablemos de tu proyecto</span>
                  <ArrowUpRight className="h-4 w-4" />
                </motion.a>

                <a
                  href="#deliverables"
                  className="inline-flex items-center gap-3 border border-black/10 bg-white/70 px-6 py-4 text-sm text-zinc-700 transition-colors hover:border-black/20 hover:text-zinc-950"
                >
                  Ver entregables
                  <ChevronRight className="h-4 w-4" />
                </a>
              </FadeIn>
            </div>

            <FadeIn delay={0.2} className="lg:pl-10">
              <div className="rounded-[2rem] border border-black/10 bg-white/75 p-6 shadow-[0_24px_80px_-48px_rgba(24,24,27,0.28)] backdrop-blur-sm">
                <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                  Vista General
                </p>

                <div className="mt-6 grid gap-4">
                  {stats.slice(0, 3).map((stat) => (
                    <div key={stat.value} className="rounded-[1.4rem] border border-black/8 bg-[#faf8f3] p-5">
                      <p className="text-2xl leading-none tracking-[-0.04em] text-zinc-950">{stat.value}</p>
                      <p className="mt-3 text-sm leading-6 text-zinc-600">{stat.label}</p>
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
