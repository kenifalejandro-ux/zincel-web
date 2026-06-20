/**client/src/components/paginas/inicio */

import { Link } from "react-router-dom";
import PageSEO from "../global/PageSEO";
import { ContactSection } from "../sections/InicioSections";
import { ArrowRight } from "lucide-react";
import ServiciosContent from "../sections/servicios";
import Hero from "../hero/Hero";
import HeroBg from "../hero/HeroBg";

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
    <div className="min-h-screen bg-[#0a0a0a] text-[#f4f1ea]">
      <Hero />
      <PageSEO pageId="inicio" />

      {/* ── Posicionamiento ── */}
      <section className="relative overflow-hidden">
        <HeroBg />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">

            <div className="space-y-6">
              <p className="font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
                Posicionamiento
              </p>
              <div className="grid gap-4 pt-4">
                {POSITIONING.map((item) => (
                  <article key={item.value} className="border-b border-white/8 pb-4">
                    <p className="font-body text-[10px] uppercase tracking-[.22em] text-[#e9c893]/60">
                      {item.value}
                    </p>
                    <p className="mt-3 text-base leading-7 text-[#f4f1ea]/60">{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="font-display max-w-4xl text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[0.98] tracking-[-0.04em] text-white">
                Construimos marcas con creatividad y precisión
              </h2>
              <p className="max-w-2xl text-[17px] leading-7 text-[#f4f1ea]/55 lg:text-lg">
                En Zincel Ideas Globales no seguimos un único estilo, diseñamos en función del negocio. Ya sea enfoque editorial, industrial, comercial o híbrido, cada proyecto define una estructura coherente con su sector. El resultado no es una plantilla, sino una web alineada a lo que realmente vendes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-3 border border-[#e9c893]/40 bg-[#e9c893]/10 px-5 py-3 text-sm font-medium text-[#e9c893] transition-all duration-300 hover:bg-[#e9c893]/20 hover:border-[#e9c893]/70"
                >
                  Explorar proyectos
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-3 border border-white/10 px-5 py-3 text-sm font-medium text-[#f4f1ea]/50 transition-colors duration-300 hover:border-white/25 hover:text-[#f4f1ea]/80"
                >
                  Conocer servicios
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Servicios carousel ── */}
      <ServiciosContent />

      {/* ── Cómo trabajamos ── */}
      <section className="relative overflow-hidden">
        <HeroBg halo="80% 40%" dots="70% 30%" haloOpacity={30} dotsOpacity={18} />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">

            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <p className="font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
                Cómo trabajamos
              </p>
              <h2 className="font-display text-3xl font-medium leading-tight tracking-[-0.03em] text-white lg:text-5xl">
                Menos ruido visual, más dirección creativa con intención de negocio.
              </h2>
            </div>

            <div className="space-y-8">
              {PRINCIPLES.map((item) => (
                <article key={item.step} className="border-b border-white/8 pb-8 last:border-b-0">
                  <p className="font-body text-[10px] uppercase tracking-[.22em] text-[#e9c893]/50">
                    {item.step}
                  </p>
                  <h3 className="mt-4 text-xl font-medium text-white">{item.title}</h3>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[#f4f1ea]/55">{item.body}</p>
                </article>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Para quién ── */}
      <section className="relative overflow-hidden">
        <HeroBg halo="50% 80%" dots="50% 70%" haloOpacity={25} dotsOpacity={14} />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-24">
          <p className="mb-10 font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
            Para quién trabajamos
          </p>
          <div className="grid gap-8 lg:grid-cols-3">
            {ENGAGEMENT.map((item) => (
              <article key={item.label} className="border-t border-white/8 pt-6">
                <p className="font-body text-[10px] uppercase tracking-[.22em] text-[#e9c893]/60">
                  {item.label}
                </p>
                <p className="mt-4 text-lg leading-8 text-[#f4f1ea]/65">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contacto ── */}
      <section id="contact">
        <ContactSection />
      </section>
    </div>
  );
}
