/**client/src/components/sections/SobreNosotros.tsx */

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { ImageStack } from "../ui/ImageStack";
import ModelViewer from "../global/ModelViewer";
import HeroBg from "../hero/HeroBg";

interface AccordionItem {
  title: string;
  content: string;
}

const SOBRE_ACCORDION: AccordionItem[] = [
  { title: "Desarrollo web", content: "Creamos sitios web modernos, rápidos y optimizados con tecnologías actuales." },
  { title: "Branding", content: "Construimos identidades visuales coherentes que conectan con tu audiencia." },
  { title: "Modelado 3D", content: "Diseñamos experiencias visuales en 2D y 3D que elevan tu marca." },
  { title: "Diseño UX/UI", content: "UI es la apariencia visual. UX es la experiencia completa. Juntos crean productos digitales que las personas aman usar." },
  { title: "Campañas Digitales", content: "Gestionamos campañas en Meta Ads, TikTok Ads y Google Ads desde nuestro propio CRM con integración directa a cada plataforma. Sin reportes de terceros: métricas reales, análisis de conversión y optimización continua." },
];

export default function AboutConcept() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0a0a0a] text-[#f4f1ea]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#e9c893]/20 bg-[#e9c893]/8 font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
              STUDIO PERSPECTIVE
            </div>
            <h2 className="font-display text-[clamp(2.8rem,5.5vw,4.2rem)] font-medium leading-[0.95] tracking-[-0.04em] text-white">
              Trabajo directo.
              <br />
              Resultados reales.
            </h2>
            <p className="text-xl text-[#f4f1ea]/60 max-w-lg leading-relaxed">Como creador independiente, me involucro en cada detalle. No delego tu marca: diseño soluciones a medida en web, branding y 3D que realmente cumplen objetivos.</p>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-square lg:aspect-[4/3] overflow-hidden bg-white/6 border border-white/10">
              <ImageStack layout="stacked" images={[{ src: "/imagenes-optim/quienes-somos/imagenes/carrusel/Desktop5", alt: "Colaboración", stackLayer: "primary" }]} />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-white/8 to-transparent my-24" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="aspect-[4/4] overflow-hidden border border-white/10 bg-white/6">
              <ImageStack layout="stacked" images={[{ src: "/imagenes-optim/quienes-somos/imagenes/conceptos/comunicacion-acercamiento", alt: "Colaboración", stackLayer: "primary" }]} />
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <h3 className="font-display text-4xl font-medium tracking-tight text-white lg:text-5xl">Colaboración cercana y transparente</h3>
            <p className="text-lg text-[#f4f1ea]/60 leading-relaxed max-w-2xl lg:text-xl">Trabajo contigo de forma directa y honesta. Comunicación constante, revisiones claras y un resultado que representa exactamente lo que tu marca necesita.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-28">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-display text-4xl font-medium tracking-tight text-white lg:text-5xl">Diseños pensados para crecer</h3>
            <p className="text-lg text-[#f4f1ea]/60 leading-relaxed max-w-2xl lg:text-xl">Desarrollo sitios web, identidades visuales y experiencias 3D modernas, optimizadas y listas para evolucionar junto a tu negocio.</p>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-square overflow-hidden border border-white/10 bg-white/6">
              <ModelViewer modelPath="blender-optim/eva-optimizado" autoRotate={true} modelScale={0.9} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SobreNosotrosSectionAccordion({ reverse = false }: { reverse?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-4 lg:py-8 bg-[#0a0a0a] text-[#f4f1ea]">
              <HeroBg halo="50% 40%" dots="70% 30%" haloOpacity={30} dotsOpacity={18} />
      
      <div className={`relative grid lg:grid-cols-2 gap-20 items-start ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="space-y-0">
          {SOBRE_ACCORDION.map((item, index) => (
            <div key={index} className="border-t border-white/8 py-1">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center py-6 text-left"
              >
                <span className="font-display text-2xl tracking-[-0.02em] text-white">{item.title}</span>
                {openIndex === index
                  ? <Minus className="w-5 h-5 text-[#e9c893]" />
                  : <Plus className="w-5 h-5 text-[#f4f1ea]/40" />}
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? "max-h-48 pb-6" : "max-h-0"}`}>
                <p className="text-[#f4f1ea]/60 leading-7">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
