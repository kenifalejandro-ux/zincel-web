/**client/src/components/Paginas/precios-web.tsx */

import PageSEO from "../global/PageSEO";
import { ArrowRight } from "lucide-react";
import HeroBg from "../hero/HeroBg";

interface PricingBand {
  label: string;
  title: string;
  price: string;
  description: string;
}

const PRICING_BANDS: PricingBand[] = [
  { label: "Entrada",        title: "Landing o sitio base",  price: "Desde S/500",   description: "Para negocios que necesitan una presencia inicial bien presentada, clara y funcional." },
  { label: "Más solicitado", title: "Web Advance",           price: "Desde S/1,300", description: "Ideal para marcas que necesitan más estructura, mejor narrativa y una percepción más profesional." },
  { label: "A medida",       title: "Proyecto platinum",     price: "Desde S/2,000", description: "Cuando se requiere un sistema más robusto, más contenido, integraciones o una dirección visual más profunda." },
];

const INCLUDES = [
  "Claridad de alcance antes de empezar",
  "Diseño responsive",
  "Base técnica optimizada",
  "SEO on-page esencial",
  "Acompañamiento de lanzamiento",
];

export default function PreciosWeb() {
  return (
    <>
      <PageSEO pageId="precios-web" />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-[#f4f1ea]">
        <HeroBg />
        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-12 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">

            <div className="space-y-8">
              <p className="font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
                Resumen de precios
              </p>
              <h1 className="font-display max-w-4xl text-[clamp(2.7rem,5vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.04em] text-white">
                Rangos claros para empezar una web con mejor estructura.
              </h1>
              <p className="max-w-2xl text-[17px] leading-7 text-[#f4f1ea]/60 lg:text-lg">
                Esta página funciona como referencia inicial. El precio final depende del alcance, del contenido, del nivel visual y de si la marca necesita solo una web o una dirección más completa.
              </p>
              <a
                href="https://www.zincelideas.com/planes-web"
                className="inline-flex items-center gap-3 border border-[#e9c893]/40 bg-[#e9c893]/10 px-5 py-3 text-sm font-medium text-[#e9c893] transition-all duration-300 hover:bg-[#e9c893]/20 hover:border-[#e9c893]/70"
              >
                Ver planes web
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="border border-white/10 bg-white/4 p-6 backdrop-blur-sm">
              <p className="font-body text-[10px] uppercase tracking-[.28em] text-[#e9c893]/70">
                Planes
              </p>
              <div className="mt-6 grid gap-4">
                {PRICING_BANDS.map((band) => (
                  <div key={band.title} className="border border-white/8 bg-white/4 p-5">
                    <p className="font-body text-[10px] uppercase tracking-[.22em] text-[#e9c893]/60">
                      {band.label}
                    </p>
                    <h2 className="mt-3 font-display text-xl font-medium text-white">{band.title}</h2>
                    <p className="mt-1 text-sm text-[#e9c893]">{band.price}</p>
                    <p className="mt-3 text-sm leading-6 text-[#f4f1ea]/50">{band.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── INCLUIDO + QUÉ CAMBIA ── */}
      <section className="relative overflow-hidden border-t border-white/8 bg-[#0a0a0a] text-[#f4f1ea]">
        <HeroBg />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-24">

          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="space-y-4">
              <p className="font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
                Incluido
              </p>
              <h2 className="font-display text-3xl font-medium leading-tight tracking-[-0.03em] text-white lg:text-4xl">
                Qué buscamos dejar resuelto incluso en proyectos pequeños.
              </h2>
            </div>
            <div className="grid gap-4">
              {INCLUDES.map((item, index) => (
                <div key={item} className="border-b border-white/8 pb-4 last:border-b-0">
                  <p className="font-body text-[10px] uppercase tracking-[.22em] text-[#e9c893]/50">
                    0{index + 1}
                  </p>
                  <p className="mt-3 text-lg leading-7 text-[#f4f1ea]/70">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-white/8 pt-10">
            <p className="font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
              Qué cambia el precio
            </p>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <p className="text-base leading-7 text-[#f4f1ea]/60">
                Número de secciones, complejidad visual, sistema de marca, integraciones, carga de contenido y necesidades especiales de performance o escalabilidad.
              </p>
              <p className="text-base leading-7 text-[#f4f1ea]/60">
                Preferimos cotizar con contexto para no venderte menos de lo que tu proyecto necesita ni más de lo que realmente te sirve.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
