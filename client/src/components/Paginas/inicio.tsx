/**client/src/components/paginas/inicio */

import { Link } from "react-router-dom";
import PageSEO from "../global/PageSEO";
import { ContactSection } from "../sections/InicioSections";
import { ArrowRight } from "lucide-react";
import ServiciosContent from "../sections/servicios";
import Hero from "../hero/Hero";

const POSITIONING = [
  { value: "Dirección visual", detail: "Una web más sobria, minimalista y mejor jerarquizada para que tu marca se vea premium." },
  { value: "Narrativa clara", detail: "Menos bloques genéricos y más contenido que explique por qué deberían elegirte." },
  { value: "Sistema completo", detail: "Marca, producto y desarrollo conectados para que todo se sienta parte del mismo estudio." },
];

const PRINCIPLES = [
  { step: "01", title: "Estrategia antes que decoración", body: "Primero ordenamos el mensaje, la percepción y la propuesta de valor. Después diseñamos una capa visual que lo potencie." },
  { step: "02", title: "Interfaces con más aire y criterio", body: "Buscamos ritmo, contraste, jerarquía tipográfica y silencios visuales. Eso hace que una marca se sienta más madura." },
  { step: "03", title: "Entrega lista para negocio", body: "No nos quedamos en mockups: aterrizamos experiencias usables, rápidas y preparadas para mostrarte mejor y vender mejor." },
];

const ENGAGEMENT = [
  { label: "Para empresas en crecimiento", text: "Que ya venden, pero su presencia digital no refleja el nivel real de su negocio." },
  { label: "Para negocios que necesitan credibilidad", text: "Que buscan verse más sólidos, confiables y bien estructurados frente a clientes y oportunidades." },
  { label: "Para empresas sin área digital", text: "Que necesitan una solución clara: desde la estructura hasta la ejecución, sin depender de múltiples proveedores." },
];

export default function Inicio() {
  return (
    <div className="min-h-screen bg-[#f3efe7] text-zinc-900">
      <Hero />
      <PageSEO pageId="inicio" />

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-white/60 blur-3xl" />
          <div className="absolute right-[-8%] top-1/3 h-96 w-96 rounded-full bg-[#d9d0c3]/60 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <section className="border-b border-black/5 py-20 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Posicionamiento</p>
                <div className="grid gap-4 border-black/5 pt-4">
                  {POSITIONING.map((item) => (
                    <article key={item.value} className="border-b border-black/5 pb-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.value}</p>
                      <p className="mt-3 text-base leading-7 text-zinc-700">{item.detail}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="max-w-4xl text-[clamp(2.5rem,5vw,4rem)] leading-[0.98] tracking-[-0.04em]">
                  Construimos marcas con creatividad y precisión
                </h2>
                <p className="max-w-2xl text-[17px] leading-7 text-zinc-700 lg:text-lg">En Zincel Ideas Globales no seguimos un único estilo, diseñamos en función del negocio. Ya sea enfoque editorial, industrial, comercial o híbrido, cada proyecto define una estructura coherente con su sector. El resultado no es una plantilla, sino una web alineada a lo que realmente vendes.</p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/portfolio" className="inline-flex items-center gap-3 px-6 py-3.5 text-sm font-medium text-zinc-900 transition-transform duration-300 hover:-translate-y-0.5">
                    Explorar proyectos
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/servicios" className="inline-flex items-center gap-3 px-6 py-3 text-sm font-medium text-zinc-900 transition-colors duration-300 hover:bg-white/60">
                    Conocer servicios
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <ServiciosContent className="bg-zinc-100 rounded-[3rem]" />

          <section className="border-y border-black/5 py-20 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Cómo trabajamos</p>
                <h2 className="text-3xl leading-tight tracking-[-0.03em] text-zinc-900 lg:text-5xl">Menos ruido visual, más dirección creativa con intención de negocio.</h2>
              </div>
              <div className="space-y-4">
                {PRINCIPLES.map((item) => (
                  <article key={item.step}>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.step}</p>
                    <h3 className="mt-4 text-2xl text-zinc-900">{item.title}</h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 lg:py-24">
            <div className="grid gap-5 lg:grid-cols-3">
              {ENGAGEMENT.map((item) => (
                <article key={item.label}>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.label}</p>
                  <p className="mt-4 text-xl leading-8 text-zinc-800">{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section id="contact">
        <ContactSection />
      </section>
    </div>
  );
}
