/**client/src/components/sections/Entregables.tsx */

import { type ReactNode } from "react";
import { motion } from "motion/react";

export interface EntregablesPageProps {
  deliverablesTitle: string;
  deliverablesDescription: string;
  deliverables: { title: string; description: string }[];
}

function LineReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Entregables(props: EntregablesPageProps) {
  return (
    <section id="deliverables" className="bg-[#0a0a0a] py-20 lg:py-24 text-[#f4f1ea]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <div className="space-y-5">
            <p className="font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
              Entregables
            </p>
            <LineReveal>
              <h2 className="font-display text-4xl font-medium leading-[0.98] tracking-[-0.04em] text-white lg:text-5xl">
                {props.deliverablesTitle}
              </h2>
            </LineReveal>
            <FadeIn delay={0.1}>
              <p className="max-w-xl text-base leading-7 text-[#f4f1ea]/60 lg:text-lg">
                {props.deliverablesDescription}
              </p>
            </FadeIn>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {props.deliverables.map((item, i) => (
              <FadeIn key={`${item.title}-${i}`} delay={0.05 * i}>
                <article className="h-full border border-white/10 bg-white/4 p-6">
                  <p className="font-body text-[10px] uppercase tracking-[.22em] text-[#e9c893]/50">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-medium leading-tight tracking-[-0.03em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#f4f1ea]/55">{item.description}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
