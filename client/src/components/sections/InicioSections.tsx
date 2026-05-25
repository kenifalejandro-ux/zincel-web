// client/src/components/sections/InicioSections.tsx
//seccion de eva y contacto, con modelo 3d de eva que se carga al hacer scroll a esa seccion, y un boton de whatsapp que abre el chat con un mensaje predefinido

import { useRef, useEffect, useState, lazy, Suspense } from "react";
import gsap from "gsap";
import { Plus, Minus } from "lucide-react";
const LazyModelViewer = lazy(() => import("../global/ModelViewer"));
import { ArrowRight } from "lucide-react";
import { LCPImage } from "../ui/LCPImage";
import { OptimizedImage } from "../ui/OptimizedImage";
import { useWhatsApp } from "../../hooks/useWhatsApp";
import { useTranslation } from "react-i18next";

interface ContentSectionProps {
  title: string;
  description: string;
  reverse?: boolean;
  buttonText?: string;
  buttonLink?: string;
  imageElement?: React.ReactNode;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageSizes?: string;
  imagePriority?: boolean;
  imageAlt?: string;
  isLCP?: boolean;
  children?: React.ReactNode;
  backgroundClassName?: string;
}

interface AccordionItem {
  title: string;
  content: string;
}

export function ContentSection({
  title,
  description,
  imageUrl,
  imageWidth,
  imageHeight,
  imageSizes,
  imagePriority = false,
  imageAlt,
  reverse = false,
  buttonText,
  buttonLink,
  imageElement,
  backgroundClassName = "bg-transparent",
}: ContentSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, { opacity: 0, y: 100, duration: 1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse  text-zinc-800 " : "lg:flex-row  text-zinc-800 "} gap-8 lg:gap-16 items-center py-14 lg:py-28 ${backgroundClassName}`}
    >
      <div className="w-full lg:w-1/2">
        <div className="relative overflow-hidden border border-black/10 bg-white/10">
          {imageElement ? (
            imageElement
          ) : imageUrl ? (
            <div className="relative w-full" style={{ aspectRatio: imageWidth && imageHeight ? `${imageWidth} / ${imageHeight}` : "16 / 9" }}>
              {imageWidth && imageHeight ? (
                <LCPImage src={imageUrl} alt={imageAlt ?? title} width={imageWidth} height={imageHeight} sizes={imageSizes} priority={imagePriority} />
              ) : (
                <OptimizedImage src={imageUrl} alt={imageAlt ?? title} sizes={imageSizes} fill />
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="w-full lg:w-1/2 space-y-6">
        <h2 className="text-4xl lg:text-5xl">{title}</h2>
        <p className="text-lg lg:text-xl opacity-80 leading-relaxed">{description}</p>
        {buttonText && (
          <button
            onClick={() => buttonLink && window.open(buttonLink, "_blank")}
            className="group text-zinc-800/60 hover:text-zinc-800 font-normal flex items-center gap-3"
          >
            {buttonText}
            <ArrowRight className="w-15 h-5 text-zinc-800/60 hover:text-zinc-800 group-hover:translate-x-2 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}

export function ServicesAccordion() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const services = t("servicesAccordion.items", { returnObjects: true }) as AccordionItem[];

  useEffect(() => {
    if (!accordionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(accordionRef.current, { opacity: 0, y: 100, duration: 1 });
    }, accordionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={accordionRef} className="space-y-4 text-zinc-800">
      {services.map((service, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between py-6 text-left hover:opacity-70 transition-opacity duration-300"
          >
            <span className="text-2xl lg:text-3xl">{service.title}</span>
            {openIndex === index ? <Minus className="w-6 h-6 flex-shrink-0" /> : <Plus className="w-6 h-6 flex-shrink-0" />}
          </button>
          <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? "max-h-96 pb-6" : "max-h-0"}`}>
            <p className="text-lg opacity-80 leading-relaxed pr-12">{service.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ServicesSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, { opacity: 0, y: 100, duration: 1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-16 lg:py-24">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        <div className="w-full lg:w-1/2">
          <ServicesAccordion />
        </div>
        <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
          <h2 className="text-4xl text-zinc-800 lg:text-5xl mb-6">{t("servicesCarousel.titleLines.0")}</h2>
          <p className="text-lg text-zinc-800 lg:text-xl opacity-80 leading-relaxed">{t("servicesCarousel.description")}</p>
        </div>
      </div>
    </div>
  );
}

export function ContactSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const evaModelRef = useRef<HTMLDivElement>(null);
  const [showEvaModel, setShowEvaModel] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, { opacity: 0, y: 100, duration: 1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const target = evaModelRef.current;
    if (!target || showEvaModel) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setShowEvaModel(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [showEvaModel]);

  const whatsApp = useWhatsApp();
  const handleWhatsAppClick = () => {
    whatsApp({ text: t("contactSection.whatsappText"), section: "Inicio - CTA", component: "InicioSections" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-[100vw] bg-[#181716] py-20 lg:py-28 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-10%] h-72 w-72 rounded-full bg-white/8 blur-3xl" />
        <div className="absolute right-[-6%] bottom-[-12%] h-96 w-96 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center dark-image">
          <div className="w-full lg:w-1/2 space-y-8 text-white">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/55">{t("contactSection.eyebrow")}</p>
              <h2 className="text-3xl leading-[1] tracking-[-0.03em] lg:text-5xl">{t("contactSection.title")}</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-zinc-300 lg:text-lg">{t("contactSection.description")}</p>

            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-3 bg-[#f3efe7] px-6 py-3.5 text-sm font-medium text-zinc-950 transition-colors duration-300 hover:bg-zinc-300"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              {t("contactSection.button")}
            </button>

            <p className="text-sm text-zinc-500">{t("contactSection.note")}</p>
          </div>

          <div className="w-full lg:w-1/2">
            <div ref={evaModelRef} className="relative h-[320px] overflow-hidden border border-white/10 bg-white/5 lg:h-[520px]">
              {showEvaModel ? (
                <Suspense fallback={<div className="w-full h-full bg-white/5 rounded-3xl" aria-hidden />}>
                  <LazyModelViewer modelPath="/blender-optim/eva-optimizado.glb" className="w-full h-full" modelScale={0.7} />
                </Suspense>
              ) : (
                <div className="w-full h-full bg-white/5 rounded-3xl" aria-hidden />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
