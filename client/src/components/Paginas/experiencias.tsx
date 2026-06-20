/**client/src/components/Paginas/experiencias.tsx */

import React from "react";
import { ArrowRight, Building2, Clock3, MonitorSmartphone, Sparkles } from "lucide-react";
import PageSEO from "../global/PageSEO";
import HeroBg from "../hero/HeroBg";

const PILLS = ["Elige tu sector", "Completa datos básicos", "Visualiza una propuesta inicial"];

const CARDS = [
  { icon: Building2,        title: "Sectores",         body: "Opciones pensadas para distintos tipos de negocio." },
  { icon: MonitorSmartphone, title: "Simulación visual", body: "Una vista rápida del estilo y estructura de tu web." },
  { icon: Sparkles,          title: "Proceso simple",   body: "Solo con la información esencial de tu empresa." },
];

const STEPS = [
  { label: "Paso 1", text: "Selecciona tu rubro" },
  { label: "Paso 2", text: "Agrega datos básicos" },
  { label: "Paso 3", text: "Mira tu simulación" },
];

const Experiencias: React.FC = () => {
  return (
    <>
      <PageSEO pageId="experiencias" />
      <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-[#f4f1ea]">
        <HeroBg />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-24 lg:px-10">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">

            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 border border-[#e9c893]/20 bg-[#e9c893]/8 px-4 py-2 font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
                <Clock3 className="h-4 w-4" />
                Muy pronto
              </div>

              <h1 className="font-display max-w-xl text-4xl font-medium leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl">
                Una experiencia para previsualizar tu web por sector
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#f4f1ea]/55 sm:text-lg">
                Estamos preparando una pestaña donde podrás elegir el sector de tu empresa, ingresar datos básicos y ver una primera simulación de cómo se vería tu página web antes de desarrollarla.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {PILLS.map((pill) => (
                  <span key={pill} className="border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#f4f1ea]/60">
                    {pill}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {CARDS.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="border border-white/10 bg-white/4 p-4 backdrop-blur-sm">
                    <Icon className="mb-3 h-5 w-5 text-[#e9c893]" />
                    <p className="text-sm font-medium text-white">{title}</p>
                    <p className="mt-1 text-sm text-[#f4f1ea]/45">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel derecho — mockup */}
            <div className="relative">
              <div className="relative overflow-hidden border border-white/10 bg-white/4 p-4 backdrop-blur-sm">
                <div className="border border-white/8 bg-[#0a0a0a] p-4">
                  <div className="mb-4 flex items-center justify-between border border-white/8 bg-white/4 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#e9c893]/40" />
                      <span className="h-2 w-2 rounded-full bg-[#e9c893]/25" />
                      <span className="h-2 w-2 rounded-full bg-[#e9c893]/15" />
                    </div>
                    <div className="border border-white/8 px-3 py-1 font-body text-[10px] uppercase tracking-[.22em] text-[#f4f1ea]/30">
                      Vista previa
                    </div>
                  </div>

                  <div className="overflow-hidden border border-white/8 bg-[#0d0d0d] p-6">
                    <div className="border border-white/8 bg-[#0a0a0a]/85 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-body text-[10px] uppercase tracking-[.22em] text-[#e9c893]/60">Próximamente</p>
                          <h2 className="font-display mt-2 text-2xl font-medium tracking-[-0.04em] text-white">Tu web en minutos</h2>
                        </div>
                        <div className="border border-[#e9c893]/20 bg-[#e9c893]/8 p-3 text-[#e9c893]">
                          <ArrowRight className="h-6 w-6" />
                        </div>
                      </div>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {STEPS.map((step) => (
                          <div key={step.label} className="border border-white/8 bg-white/4 p-4">
                            <p className="font-body text-[10px] uppercase tracking-[.16em] text-[#e9c893]/50">{step.label}</p>
                            <p className="mt-2 text-sm font-medium text-white">{step.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Experiencias;
