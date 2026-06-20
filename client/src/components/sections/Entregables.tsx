/**client/src/components/sections/Entregables.tsx */

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";

export interface EntregablesPageProps {
  deliverablesTitle: string;
  deliverablesDescription: string;
  deliverables: { title: string; description: string }[];
}

function LineReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
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

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 260);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/** ---------------------Entregables--------------------- */}
      <section id="deliverables" className="border-y border-black/10 bg-[#f7f2e9] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
            <div className="space-y-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                Entregables
              </p>
              <LineReveal>
                <h2 className="text-4xl leading-[0.98] tracking-[-0.04em] text-zinc-950 lg:text-5xl">
                  {props.deliverablesTitle}
                </h2>
              </LineReveal>
              <FadeIn delay={0.1}>
                <p className="max-w-xl text-base leading-7 text-zinc-600 lg:text-lg">
                  {props.deliverablesDescription}
                </p>
              </FadeIn>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {props.deliverables.map((item, index) => (
                <FadeIn key={`${item.title}-${index}`} delay={0.05 * index}>
                  <article className="h-full rounded-[1.75rem] border border-black/10 bg-white/80 p-6">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-400">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 text-2xl leading-tight tracking-[-0.03em] text-zinc-950">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-zinc-600">{item.description}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
