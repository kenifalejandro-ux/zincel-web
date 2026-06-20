/**client/src/components/Paginas/experiencias.tsx */

import React from "react";
import { ArrowRight, Building2, Clock3, MonitorSmartphone, Sparkles } from "lucide-react";
import PageSEO from "../global/PageSEO";

const PILLS = ["Elige tu sector", "Completa datos básicos", "Visualiza una propuesta inicial"];

const CARDS = [
  { title: "Sectores", body: "Opciones pensadas para distintos tipos de negocio." },
  { title: "Simulación visual", body: "Una vista rápida del estilo y estructura de tu web." },
  { title: "Proceso simple", body: "Solo con la información esencial de tu empresa." },
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
      <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-24 lg:px-10">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
              <Clock3 className="h-4 w-4" />
              Muy pronto
            </div>

            <h1 className="max-w-xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
              Una experiencia para previsualizar tu web por sector
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">Estamos preparando una pestaña donde podrás elegir el sector de tu empresa, ingresar datos básicos y ver una primera simulación de cómo se vería tu página web antes de desarrollarla.</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {PILLS.map((pill) => (
                <span key={pill} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">{pill}</span>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <Building2 className="mb-3 h-5 w-5 text-cyan-300" />
                <p className="text-sm font-semibold text-white">{CARDS[0].title}</p>
                <p className="mt-1 text-sm text-slate-400">{CARDS[0].body}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <MonitorSmartphone className="mb-3 h-5 w-5 text-cyan-300" />
                <p className="text-sm font-semibold text-white">{CARDS[1].title}</p>
                <p className="mt-1 text-sm text-slate-400">{CARDS[1].body}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <Sparkles className="mb-3 h-5 w-5 text-cyan-300" />
                <p className="text-sm font-semibold text-white">{CARDS[2].title}</p>
                <p className="mt-1 text-sm text-slate-400">{CARDS[2].body}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -right-6 bottom-6 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="rounded-[1.6rem] border border-white/10 bg-[#0b1120] p-4">
                <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Vista previa
                  </div>
                </div>

                <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-cyan-400/20 via-slate-900 to-slate-950 p-6">
                  <div className="rounded-[1.2rem] border border-white/10 bg-[#07101d]/85 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80">Próximamente</p>
                        <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em] text-white">Tu web en minutos</h2>
                      </div>
                      <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-cyan-200">
                        <ArrowRight className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {STEPS.map((step) => (
                        <div key={step.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{step.label}</p>
                          <p className="mt-2 text-sm font-semibold text-white">{step.text}</p>
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
