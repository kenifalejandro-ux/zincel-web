/**client/src/components/Paginas/sobre-nosotros */

import PageSEO from "../global/PageSEO";
import Metricas from "../ui/Metricas";
import { ImageStack } from "../ui/ImageStack";
import AboutConcept, { SobreNosotrosSectionAccordion } from "../sections/SobreNosotrosSection";

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

      <section className="bg-zinc-100 max-w-full px-4 md:px-8 lg:px-12 -mt-26 md:-mt-26 lg:-mt-20">
        <div className="max-w-7xl mx-auto">
          <ImageStack
            layout="inline"
            images={[{ src: "/imagenes-optim/quienes-somos/imagenes/carrusel/Desktop2", alt: "Primaria", stackLayer: "tertiary" }]}
            stackedLayoutOverrides={{ 1: { stackHeight: "h-[520px] lg:h-[700px]", slots: { tertiary: "absolute left-[0%] top-[8%] h-[55%] w-[52%] z-10" } } }}
          />
        </div>
      </section>

      <div className="relative z-30">
        <Metricas variant="inline" vista="desktop" color="#000000" data={METRICS} />
      </div>

      <div className="min-h-screen bg-[#f3efe7] text-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-24">
          <section className="border-b border-black/10 pb-20 lg:pb-24">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Notas del estudio</p>
                <h2 className="text-3xl leading-tight tracking-[-0.03em] lg:text-5xl">Construimos marcas y experiencias digitales con una mirada más directa y más intencional.</h2>
              </div>

              <div className="grid gap-4 border-t border-black/10 pt-4">
                {NOTES.map((note) => (
                  <article key={note.label} className="border-b border-black/10 pb-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{note.label}</p>
                    <p className="mt-3 text-base leading-7 text-zinc-700">{note.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 lg:py-24">
            <AboutConcept />
          </section>

          <section className="border-t border-black/10 pt-20 lg:pt-24">
            <div className="mb-12 max-w-3xl space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Capacidades</p>
              <h2 className="text-3xl leading-tight tracking-[-0.03em] lg:text-4xl">Lo que hacemos y cómo se conecta dentro del estudio.</h2>
            </div>
            <SobreNosotrosSectionAccordion />
          </section>
        </div>
      </div>
    </>
  );
}
