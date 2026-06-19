/**client/src/components/Paginas/sobre-nosotros */

import PageSEO from "../global/PageSEO";
import Metricas from "../ui/Metricas";
import { ImageStack } from "../ui/ImageStack";
import AboutConcept, { SobreNosotrosSectionAccordion } from "../sections/SobreNosotrosSection";
import { useTranslation } from "react-i18next";

export default function SobreNosotros() {
  const { t } = useTranslation();

  const notes = t("sobreNosotros.notes", { returnObjects: true }) as { label: string; text: string }[];
  const metrics = t("sobreNosotros.metrics", { returnObjects: true }) as { valor: string; etiqueta: string; detalle?: string }[];

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
        <Metricas variant="inline" vista="desktop" color="#000000" data={metrics} />
      </div>

      <div className="min-h-screen bg-[#f3efe7] text-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-24">
          <section className="border-b border-black/10 pb-20 lg:pb-24">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{t("sobreNosotros.studioNotes")}</p>
                <h2 className="text-3xl leading-tight tracking-[-0.03em] lg:text-5xl">{t("sobreNosotros.studioTitle")}</h2>
              </div>

              <div className="grid gap-4 border-t border-black/10 pt-4">
                {notes.map((note) => (
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
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{t("sobreNosotros.capabilitiesEyebrow")}</p>
              <h2 className="text-3xl leading-tight tracking-[-0.03em] lg:text-4xl">{t("sobreNosotros.capabilitiesTitle")}</h2>
            </div>
            <SobreNosotrosSectionAccordion />
          </section>
        </div>
      </div>
    </>
  );
}
