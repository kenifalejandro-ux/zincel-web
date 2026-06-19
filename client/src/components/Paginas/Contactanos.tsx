import { useTranslation } from "react-i18next";
import { useWhatsApp } from "../../hooks/useWhatsApp";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import PageSEO from "../global/PageSEO";

export default function Contactanos() {
  const { t } = useTranslation();
  const whatsApp = useWhatsApp();

  return (
    <>
      <PageSEO pageId="contactanos" />
      <section className="min-h-screen bg-zinc-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Columna izquierda — info de contacto */}
        <div className="flex flex-col justify-center px-10 py-20 lg:px-16 lg:py-24">
          <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-zinc-400">
            Contáctanos
          </p>

          <h1 className="mb-6 max-w-md text-4xl leading-[1.05] tracking-[-0.04em] lg:text-5xl">
            ¿Tienes un proyecto en mente?
          </h1>

          <p className="mb-12 max-w-sm text-base leading-7 text-zinc-400">
            Escríbenos y te respondemos en menos de 24 horas. Trabajamos contigo desde Lima para el mundo.
          </p>

          {/* Datos de contacto */}
          <div className="mb-12 space-y-5">
            <a
              href="mailto:kenif.alejandro@zincelideas.com"
              className="flex items-center gap-4 text-sm text-zinc-300 transition-colors hover:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Mail className="h-4 w-4" />
              </span>
              kenif.alejandro@zincelideas.com
            </a>

            <a
              href="tel:+51933838792"
              className="flex items-center gap-4 text-sm text-zinc-300 transition-colors hover:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Phone className="h-4 w-4" />
              </span>
              +51 933 838 792
            </a>

            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <MapPin className="h-4 w-4" />
              </span>
              San Isidro, Lima — Perú
            </div>
          </div>

          {/* CTA WhatsApp */}
          <button
            onClick={() =>
              whatsApp({
                text: t("contactSection.whatsappText"),
                section: "Contacto",
                component: "Contactanos",
                variant: "primary",
              })
            }
            className="group inline-flex w-fit items-center gap-3 bg-white px-7 py-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
          >
            Escribir por WhatsApp
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* CTA Briefing */}
          <div className="mt-6 border-t border-white/8 pt-6">
            <p className="mb-3 text-xs text-zinc-500">
              ¿Prefieres contarnos tu proyecto en detalle?
            </p>
            <a
              href="/briefing"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-3 border border-white/15 px-7 py-4 text-sm font-medium text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
            >
              Completar Briefing de Proyecto
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <p className="mt-3 text-[11px] text-zinc-600">
              Recibes tu propuesta personalizada en 24–48 h
            </p>
          </div>
        </div>

        {/* Columna derecha — imagen referencial (cámbiala cuando quieras) */}
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src="/imagenes-optim/imagenes/ads001-1920.avif"
            alt="Zincel — Estudio Lima"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/30 to-transparent" />
          <div className="absolute bottom-10 right-10 flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">Lima, Perú</span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">EST. 2016</span>
          </div>
        </div>

      </div>
      </section>
    </>
  );
}
