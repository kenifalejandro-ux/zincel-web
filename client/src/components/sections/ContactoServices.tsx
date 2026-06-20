/**client/src/components/sections/ContactoServices.tsx */

import { type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { buildWhatsAppUrl, trackWhatsAppClick } from "../../utils/whatsapp";
import HeroBg from "../hero/HeroBg";

export interface ContactoServicesPageProps {
  closingTitle: string;
  closingDescription: string;
  closingButtonLabel: string;
  whatsappText: string;
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

export default function ContactoServices(props: ContactoServicesPageProps) {
  const whatsappHref = buildWhatsAppUrl(props.whatsappText);
  const trackCta = (section: string, variant: string) => {
    trackWhatsAppClick({ text: props.whatsappText, href: whatsappHref, section, component: "ContactoServices", variant });
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 text-[#f4f1ea] lg:py-28">
      <HeroBg />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
        <LineReveal>
          <h2 className="font-display text-[clamp(2.4rem,5.5vw,4rem)] font-medium leading-[0.96] tracking-[-0.05em] text-white">
            {props.closingTitle}
          </h2>
        </LineReveal>

        <FadeIn delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#f4f1ea]/60 lg:text-lg">
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
            className="inline-flex items-center gap-4 border border-[#e9c893]/40 bg-[#e9c893]/10 px-7 py-4 text-sm font-medium text-[#e9c893] transition-all hover:bg-[#e9c893]/20 hover:border-[#e9c893]/70"
          >
            <span>{props.closingButtonLabel}</span>
            <span className="flex h-8 w-8 items-center justify-center border border-[#e9c893]/30 text-[#e9c893]">
              <ArrowRight className="h-4 w-4" />
            </span>
          </motion.a>
        </FadeIn>
      </div>
    </section>
  );
}
