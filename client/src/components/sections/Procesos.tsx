/**client/src/components/sections/Procesos.tsx */

import { type ReactNode } from "react";
import { motion } from "motion/react";

interface ProcessItem {
  step: string;
  title: string;
  description: string;
}

export interface ProcesosPageProps {
  processTitle: string;
  processDescription: string;
  process: ProcessItem[];
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

export default function Procesos(props: ProcesosPageProps) {
  return (
    <section className="bg-[#0a0a0a] py-20 lg:py-24 text-[#f4f1ea]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
            Proceso
          </p>
          <LineReveal className="mt-5">
            <h2 className="font-display text-4xl font-medium leading-[0.98] tracking-[-0.04em] text-white lg:text-6xl">
              {props.processTitle}
            </h2>
          </LineReveal>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-base leading-7 text-[#f4f1ea]/60 lg:text-lg">
              {props.processDescription}
            </p>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {props.process.map((item, i) => (
            <FadeIn key={`${item.step}-${item.title}`} delay={0.06 * i} className="h-full">
              <article className="flex h-full flex-col border border-white/10 bg-white/4 p-6">
                <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/8 text-sm text-[#e9c893]">
                  {item.step}
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium leading-tight tracking-[-0.03em] text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#f4f1ea]/55">{item.description}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
