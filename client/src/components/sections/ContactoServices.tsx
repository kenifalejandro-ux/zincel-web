/**client/src/components/sections/ContactoServices.tsx */

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { buildWhatsAppUrl, trackWhatsAppClick } from "../../utils/whatsapp";

export interface ContactoServicesPageProps {
  closingTitle: string;
  closingDescription: string;
  closingButtonLabel: string;
  whatsappText: string;
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

export default function ContactoServices(props: ContactoServicesPageProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 260);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappHref = buildWhatsAppUrl(props.whatsappText);
  const trackCta = (section: string, variant: string) => {
    trackWhatsAppClick({
      text: props.whatsappText,
      href: whatsappHref,
      section,
      component: "ContactoServices",
      variant,
    });
  };
  return (
    <>
      {/** ---------------------ContactoServicesces
    --------------------- */}
      <section className="relative overflow-hidden bg-zinc-950 py-24 text-white lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8%] top-[-12%] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-16%] h-96 w-96 rounded-full bg-[#776b57]/25 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
          <LineReveal>
            <h2 className="text-[clamp(2.4rem,5.5vw,2rem)] leading-[0.96] tracking-[-0.05em] text-white">
              {props.closingTitle}
            </h2>
          </LineReveal>

          <FadeIn delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-300 lg:text-lg">
              {props.closingDescription}
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-10">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCta("Closing CTA", "primary")}
              className="inline-flex items-center gap-4 rounded-full bg-white px-7 py-4 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100"
            >
              <span>{props.closingButtonLabel}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </motion.a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
