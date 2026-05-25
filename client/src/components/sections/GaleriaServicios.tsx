/**client/src/components/sections/GaleriaServicios.tsx */

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ImageStack } from "../ui/ImageStack";

interface EditorialBenefit {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface GaleriaServiciosPageProps {
  title: string;
  stats: { value: string; label: string }[];
  benefitsDescription: string;
  benefits: EditorialBenefit[];
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

export default function GaleriaServicios(props: GaleriaServiciosPageProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 260);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const benefitGalleryImages = props.benefits
    .filter((benefit) => Boolean(benefit.image))
    .slice(0, 3)
    .map((benefit) => ({
      src: benefit.image ?? "",
      alt: benefit.imageAlt ?? benefit.title,
      surfaceClassName: "rounded-[1.8rem] border border-black/10 bg-[#f3efe7]",
      safeAreaClassName: "!inset-0",
      imageClassName: "!object-cover",
    }));

  return (
    <>
      {/** --------------------- Galeria --------------------- */}
      <main className="w-full">
        <section className="bg-white py-20 lg:py-24 ">
          <div className="relative left-1/2 right-1/2 w-screen max-w-none -translate-x-1/2 px-4 sm:px-6 lg:px-8">
            <FadeIn delay={0.15}>
              {benefitGalleryImages.length > 0 ? (
                <div className="rounded-[2rem] border border-black/10 bg-[#faf7f2] p-4 sm:p-5">
                  <ImageStack layout="inline" images={benefitGalleryImages} className="gap-4" />
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {props.stats.slice(0, 3).map((stat, index) => (
                    <article
                      key={`${stat.value}-${index}`}
                      className="rounded-[1.6rem] border border-black/8 bg-[#faf7f2] p-5"
                    >
                      <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-400">
                        0{index + 1}
                      </p>
                      <p className="mt-4 text-xl leading-tight tracking-[-0.03em] text-zinc-950">
                        {stat.value}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-zinc-600">{stat.label}</p>
                    </article>
                  ))}
                </div>
              )}
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
}
