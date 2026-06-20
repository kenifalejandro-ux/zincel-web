/**client/src/components/Paginas/sobre-nosotros */

import PageSEO from "../global/PageSEO";
import Metricas from "../ui/Metricas";
import { ImageStack } from "../ui/ImageStack";
import AboutConcept, { SobreNosotrosSectionAccordion } from "../sections/SobreNosotrosSection";
import HeroBg from "../hero/HeroBg";

const NOTES = [
  { label: "Desde Lima", text: "Un estudio pequeño con dirección creativa directa y comunicación cercana." },
  { label: "Sin capas innecesarias", text: "Menos estructura burocrática y más claridad para tomar decisiones importantes de diseño." },
  { label: "Marca + digital", text: "Trabajamos identidad, web y visualización como partes del mismo lenguaje." },
];

const METRICS = [
  { valor: "1+", etiqueta: "Proyecto lanzado" },
  { valor: "3", etiqueta: "Servicios activos", detalle: "Desarrollo web · Branding · Modelado 3D" },
  { valor: "1 a 1", etiqueta: "Comunicación directa", detalle: "Sin intermediarios ni delegación" },
  { valor: "Perú", etiqueta: "Cobertura nacional" },
  { valor: "2", etiqueta: "Regiones atendidas", detalle: "Lima · La Libertad" },
  { valor: "B2B", etiqueta: "Enfoque en negocios" },
];

export default function SobreNosotros() {
  return (
    <>
      <PageSEO pageId="sobre-nosotros" />

      <section className="relative overflow-hidden bg-[#0a0a0a] -mt-26 md:-mt-26 lg:-mt-20 px-4 md:px-8 lg:px-12">
        <HeroBg />
        <div className="relative max-w-7xl mx-auto">
          <ImageStack
            layout="inline"
            images={[{ src: "/imagenes-optim/quienes-somos/imagenes/carrusel/Desktop2", alt: "Primaria", stackLayer: "tertiary" }]}
            stackedLayoutOverrides={{ 1: { stackHeight: "h-[520px] lg:h-[700px]", slots: { tertiary: "absolute left-[0%] top-[8%] h-[55%] w-[52%] z-10" } } }}
          />
        </div>
      </section>

      <div className="relative z-30 bg-[#0a0a0a]">
        <Metricas variant="inline" vista="desktop" color="#e9c893" data={METRICS} />
      </div>

      <div className="min-h-screen bg-[#0a0a0a] text-[#f4f1ea]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-24">

          {/* Notas del estudio */}
          <section className="relative overflow-hidden pb-20 lg:pb-24">
            <HeroBg />
            <div className="relative grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="space-y-4">
                <p className="font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
                  Notas del estudio
                </p>
                <h2 className="font-display text-3xl font-medium leading-tight tracking-[-0.03em] text-white lg:text-5xl">
                  Construimos marcas y experiencias digitales con una mirada más directa y más intencional.
                </h2>
              </div>
              <div className="grid gap-4 border-t border-white/8 pt-4">
                {NOTES.map((note) => (
                  <article key={note.label} className="border-b border-white/8 pb-4">
                    <p className="font-body text-[10px] uppercase tracking-[.22em] text-[#e9c893]/60">
                      {note.label}
                    </p>
                    <p className="mt-3 text-base leading-7 text-[#f4f1ea]/60">{note.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Concepto */}
          <section className="py-20 lg:py-24">
            <AboutConcept />
          </section>

          {/* Capacidades */}
          <section className="border-t border-white/8 pt-20 lg:pt-24">
            <div className="mb-12 max-w-3xl space-y-4">
              <p className="font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
                Capacidades
              </p>
              <h2 className="font-display text-3xl font-medium leading-tight tracking-[-0.03em] text-white lg:text-4xl">
                Lo que hacemos y cómo se conecta dentro del estudio.
              </h2>
            </div>
            <SobreNosotrosSectionAccordion />
          </section>

        </div>
      </div>
    </>
  );
}
