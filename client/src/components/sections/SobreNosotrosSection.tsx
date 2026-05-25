/**client/src/components/sections/SobreNosotros.tsx */

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";
import { ImageStack } from "../ui/ImageStack";
import ModelViewer from "../global/ModelViewer";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

interface ContentSectionProps {
  title: string;
  description: string;
  reverse?: boolean;
  imageElement?: React.ReactNode;
}

interface AccordionItem {
  title: string;
  content: string;
}

export function ContentSection({ title, description, reverse = false, imageElement }: ContentSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });
      }
      if (titleRef.current) {
        gsap.from(titleRef.current, { y: 12, opacity: 0, filter: "blur(4px)", duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 82%" } });
      }
      if (textRef.current) {
        gsap.from(textRef.current, { y: 16, opacity: 0, duration: 0.9, delay: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 82%" } });
      }
      if (lineRef.current) {
        gsap.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 90%" } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 lg:py-24">
      <div className={`grid lg:grid-cols-2 gap-20 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="w-full">
          <div ref={imageRef} className="relative overflow-hidden rounded-2xl">
            <div className="transition-transform duration-[1200ms] ease-out hover:scale-[1.02]">{imageElement}</div>
          </div>
        </div>
        <div className="space-y-6 max-w-xl">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Studio perspective</p>
          <h2 ref={titleRef} className="text-[clamp(2.3rem,4vw,3.6rem)] tracking-[-0.03em] text-zinc-900">{title}</h2>
          <p ref={textRef} className="text-zinc-600 leading-8 text-lg">{description}</p>
        </div>
      </div>
    </section>
  );
}

export default function AboutConcept() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 lg:py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs tracking-[0.125em] text-zinc-500 border">
              {t("aboutConcept.eyebrow")}
            </div>
            <h2 className="text-[clamp(2.8rem,5.5vw,4.2rem)] leading-[0.95] tracking-[-0.04em] text-zinc-900 font-light">
              {t("aboutConcept.heroTitle").split("\n")[0]}
              <br />
              {t("aboutConcept.heroTitle").split("\n")[1]}
            </h2>
            <p className="text-xl lg:text-xl text-zinc-600 max-w-lg leading-relaxed">{t("aboutConcept.heroBody")}</p>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-100 shadow-xl">
              <ImageStack layout="stacked" images={[{ src: "/imagenes-optim/quienes-somos/imagenes/carrusel/Desktop5", alt: "Colaboración", stackLayer: "primary" }]} />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-zinc-200 to-transparent my-24" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="aspect-[4/4] rounded-3xl overflow-hidden bg-zinc-900">
              <ImageStack layout="stacked" images={[{ src: "/imagenes-optim/quienes-somos/imagenes/conceptos/comunicacion-acercamiento", alt: "Colaboración", stackLayer: "primary" }]} />
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <h3 className="text-4xl lg:text-5xl tracking-tight text-zinc-900">{t("aboutConcept.collaborationTitle")}</h3>
            <p className="text-lg lg:text-xl text-zinc-600 leading-relaxed max-w-2xl">{t("aboutConcept.collaborationBody")}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-28">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-4xl lg:text-5xl tracking-tight text-zinc-900">{t("aboutConcept.growthTitle")}</h3>
            <p className="text-lg lg:text-xl text-zinc-600 leading-relaxed max-w-2xl">{t("aboutConcept.growthBody")}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-100 shadow-2xl">
              <ModelViewer modelPath="blender-optim/eva-optimizado" autoRotate={true} modelScale={0.9} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SobreNosotrosSectionAccordion({ reverse = false }: { reverse?: boolean }) {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const items = t("sobreNosotrosAccordion.items", { returnObjects: true }) as AccordionItem[];

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { opacity: 0, y: 80, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-4 lg:py-8">
      <div className={`grid lg:grid-cols-2 gap-20 items-start ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border-t border-black/10 py-1">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center py-6 text-left"
              >
                <span className="text-2xl tracking-[-0.02em] text-zinc-900">{item.title}</span>
                {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? "max-h-48 pb-6" : "max-h-0"}`}>
                <p className="text-zinc-600 leading-7">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
