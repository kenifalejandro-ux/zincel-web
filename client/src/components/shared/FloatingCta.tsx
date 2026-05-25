/**client/src/components/shared/FloatingCta.tsx */

import { useEffect, useState, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { buildWhatsAppUrl, trackWhatsAppClick } from "../../utils/whatsapp";
import { useTranslation } from "react-i18next";

export interface FloatingCtaProps {
  whatsappText: string;
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

export default function FloatingCta(props: FloatingCtaProps) {
  const { t: _t } = useTranslation();
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
      component: "FloatingCta",
      variant,
    });
  };

  return (
    <>
      <main className="overflow-x-hidden bg-zinc-900 text-zinc-900 selection:bg-zinc-950 selection:text-white">
        <AnimatePresence>
          {scrolled ? (
            <motion.a
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 120, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCta("Floating CTA", "sticky")}
              className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-zinc-950 px-5 py-3 text-sm text-white shadow-[0_22px_50px_-24px_rgba(24,24,27,0.75)] transition-colors hover:bg-black lg:bottom-8 lg:right-8"
            >
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/70">
                WhatsApp
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <ChevronRight className="h-4 w-4" />
              </span>
            </motion.a>
          ) : null}
        </AnimatePresence>
      </main>
    </>
  );
}
