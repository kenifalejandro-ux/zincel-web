import { useWhatsApp } from "../../hooks/useWhatsApp";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import PageSEO from "../global/PageSEO";
import HeroBg from "../hero/HeroBg";

const WHATSAPP_TEXT = "Hola, quiero iniciar un proyecto con Zincel";

export default function Contactanos() {
  const whatsApp = useWhatsApp();

  return (
    <>
      <PageSEO pageId="contactanos" />
      <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-[#f4f1ea]">
        <HeroBg />
        <div className="relative grid min-h-screen lg:grid-cols-2">

          <div className="flex flex-col justify-center px-10 py-20 lg:px-16 lg:py-24">
            <p className="mb-4 font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
              Contáctanos
            </p>

            <h1 className="mb-6 font-display max-w-md text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-white lg:text-5xl">
              ¿Tienes un proyecto en mente?
            </h1>

            <p className="mb-12 max-w-sm text-base leading-7 text-[#f4f1ea]/55">
              Escríbenos y te respondemos en menos de 24 horas. Trabajamos contigo desde Lima para el mundo.
            </p>

            <div className="mb-12 space-y-5">
              <a
                href="mailto:contacto@zincelideas.com"
                className="flex items-center gap-4 text-sm text-[#f4f1ea]/60 transition-colors hover:text-[#e9c893]"
              >
                <span className="flex h-9 w-9 items-center justify-center border border-white/10 bg-white/5">
                  <Mail className="h-4 w-4" />
                </span>
                contacto@zincelideas.com
              </a>

              <a
                href="tel:+51933838792"
                className="flex items-center gap-4 text-sm text-[#f4f1ea]/60 transition-colors hover:text-[#e9c893]"
              >
                <span className="flex h-9 w-9 items-center justify-center border border-white/10 bg-white/5">
                  <Phone className="h-4 w-4" />
                </span>
                +51 933 838 792
              </a>

              <div className="flex items-center gap-4 text-sm text-[#f4f1ea]/40">
                <span className="flex h-9 w-9 items-center justify-center border border-white/10 bg-white/5">
                  <MapPin className="h-4 w-4" />
                </span>
                San Isidro, Lima — Perú
              </div>
            </div>

            <button
              onClick={() => whatsApp({ text: WHATSAPP_TEXT, section: "Contacto", component: "Contactanos", variant: "primary" })}
              className="group inline-flex w-fit items-center gap-3 border border-[#e9c893]/40 bg-[#e9c893]/10 px-7 py-4 text-sm font-medium text-[#e9c893] transition-all hover:bg-[#e9c893]/20 hover:border-[#e9c893]/70"
            >
              Escribir por WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <div className="mt-6 border-t border-white/8 pt-6">
              <p className="mb-3 text-xs text-[#f4f1ea]/30">
                ¿Prefieres contarnos tu proyecto en detalle?
              </p>
              <a
                href="/briefing"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-3 border border-white/15 px-7 py-4 text-sm font-medium text-[#f4f1ea]/50 transition-colors hover:border-white/30 hover:text-[#f4f1ea]/80"
              >
                Completar Briefing de Proyecto
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <p className="mt-3 font-body text-[11px] text-[#f4f1ea]/25">
                Recibes tu propuesta personalizada en 24–48 h
              </p>
            </div>
          </div>

          <div className="relative hidden overflow-hidden lg:block">
            <img
              src="/imagenes-optim/imagenes/ads001-1920.avif"
              alt="Zincel — Estudio Lima"
              className="absolute inset-0 h-full w-full object-cover opacity-40"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent" />
            <div className="absolute bottom-10 right-10 flex flex-col items-end gap-1">
              <span className="font-body text-[10px] uppercase tracking-[.28em] text-[#e9c893]/50">Lima, Perú</span>
              <span className="font-body text-[10px] uppercase tracking-[.28em] text-[#e9c893]/50">EST. 2016</span>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
