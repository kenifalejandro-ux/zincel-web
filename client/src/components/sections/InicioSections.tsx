// client/src/components/sections/InicioSections.tsx

import { useRef, useEffect, useState, lazy, Suspense } from "react";
import gsap from "gsap";
import { Plus, Minus } from "lucide-react";
const LazyModelViewer = lazy(() => import("../global/ModelViewer"));
import { ArrowRight } from "lucide-react";
import { LCPImage } from "../ui/LCPImage";
import { OptimizedImage } from "../ui/OptimizedImage";
import { useWhatsApp } from "../../hooks/useWhatsApp";

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

const SERVICES_ACCORDION: AccordionItem[] = [
  { title: "Desarrollo web", content: "Creamos sitios web modernos, rápidos y optimizados con las últimas tecnologías. Desde landing pages hasta aplicaciones web complejas, desarrollamos soluciones que convierten visitantes en clientes." },
  { title: "Branding", content: "Construimos identidades de marca memorables que conectan emocionalmente con tu audiencia. Desarrollamos estrategias visuales coherentes que comunican los valores de tu negocio y te diferencian de la competencia." },
  { title: "Modelado 3D", content: "Diseñamos experiencias visuales impactantes en 2D y 3D. Desde ilustraciones personalizadas hasta modelados tridimensionales, creamos contenido visual que eleva tu marca al siguiente nivel." },
  { title: "Diseño UI/UX", content: "Creamos interfaces intuitivas, modernas y centradas en el usuario que convierten visitantes en clientes leales." },
  { title: "Campañas Digitales", content: "Gestionamos campañas en Meta Ads, TikTok Ads y Google Ads desde nuestro propio CRM con integración directa a cada plataforma. Sin reportes de terceros: métricas reales, análisis de conversión y optimización continua para maximizar cada sol invertido." },
];

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!accordionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(accordionRef.current, { opacity: 0, y: 100, duration: 1 });
    }, accordionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={accordionRef} className="space-y-4 text-zinc-800">
      {SERVICES_ACCORDION.map((service, index) => (
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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, { opacity: 0, y: 100, duration: 1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-16 lg:py-24 ">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        <div className="w-full lg:w-1/2">
          <ServicesAccordion />
        </div>
        <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
          <h2 className="text-4xl text-zinc-800 lg:text-5xl mb-6">Cinco servicios.</h2>
          <p className="text-lg text-zinc-800 lg:text-xl opacity-80 leading-relaxed">Diseñamos experiencias digitales con criterio visual y estructura minimalista.</p>
        </div>
      </div>
    </div>
  );
}

export function ContactSection() {
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
    whatsApp({ text: "Hola, quiero iniciar mi proyecto web con Zincel 🚀", section: "Inicio - CTA", component: "InicioSections" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative left-1/2 right-1/2 -ml-[50vw]  -mr-[50vw] w-[100vw] bg-black py-20 lg:py-28 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-10%] h-72 w-72 rounded-full bg-white/8 blur-3xl" />
        <div className="absolute right-[-6%] bottom-[-12%] h-96 w-96 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center dark-image">
          <div className="w-full lg:w-1/2 space-y-8 text-white">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/55">Construyamos</p>
              <h2 className="text-3xl leading-[1] tracking-[-0.03em] lg:text-5xl">Hagamos que tu presencia digital se vea tan seria como tu ambición.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#f4f1ea]/65 lg:text-lg">Si quieres una web, una marca o una experiencia visual con mejor criterio, mejor ritmo y más percepción de valor, empecemos por una conversación clara.</p>

            <button
              onClick={handleWhatsAppClick}
              className="group inline-flex items-center gap-3 border border-[#e9c893]/40 bg-[#e9c893]/10 px-6 py-3.5 text-sm font-medium text-[#e9c893] transition-all hover:bg-[#e9c893]/20 hover:border-[#e9c893]/70"
            >
              Comenzar proyecto
            </button>

            <p className="text-sm text-[#f4f1ea]/30">Consulta sin costo • respuesta en 24h</p>
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
