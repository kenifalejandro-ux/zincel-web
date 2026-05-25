/* client/src/components/ui/MiningStats.tsx */

"use client";

import type { LucideIcon } from "lucide-react";
import {
  Factory, // Horno/Planta
  Users, // Empleados
  MapPin, // Ubicación/Operaciones
  Truck, // Transporte
  ShieldCheck, // Seguridad
  Package, // Producto
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Stat {
  id: string;
  icon: LucideIcon;
  value: number;
  label: string;
  suffix?: string;
  subtext: string;
}

// Datos extraídos del PDF proporcionado
const STATS: Stat[] = [
  {
    id: "produccion_diaria",
    icon: Factory,
    value: 176,
    suffix: " TM",
    label: "PRODUCCIÓN DIARIA",
    subtext: "Capacidad de óxido de calcio",
  },
  {
    id: "hornos",
    icon: Package,
    value: 5,
    label: "HORNOS OPERATIVOS",
    subtext: "Capacidad instalada total",
  },
  {
    id: "empleados_max",
    icon: Users,
    value: 90,
    suffix: "+",
    label: "PERSONAL EN OPERACIÓN",
    subtext: "Máximo de trabajadores rotativos",
  },
  {
    id: "ubicacion",
    icon: MapPin,
    value: 2,
    suffix: "",
    label: "CENTRO DE PRODUCCIÓN",
    subtext: "Caserío Rodeopampa - Marcabal y Bambamarca - Cajamarca",
  },
  {
    id: "seguridad_foco",
    icon: ShieldCheck,
    value: 100,
    suffix: "%",
    label: "COMPROMISO SEGURIDAD",
    subtext: "Deber ético y moral",
  },
  {
    id: "clientes_mercado",
    icon: Truck,
    value: 2,
    suffix: "+",
    label: "SECTORES DE MERCADO",
    subtext: "Minero y Azucarero abastecidos",
  },
];

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const increment = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function MiningStats() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f4efe6_0%,#ede4d7_100%)] py-24 text-zinc-800">
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(rgba(39,39,42,0.45) 0.6px, transparent 0.6px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-700/55 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 border-l-4 border-emerald-700 pl-6">
          <div className="mb-2 flex items-center gap-4 font-mono text-xs tracking-widest text-emerald-700">
            <span>● OPERACION Y CAPACIDAD</span>
            <span className="text-stone-600">RUC: 20482610944</span>
          </div>
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-zinc-950 md:text-5xl">
            <span className="text-emerald-600">S.A.C</span>
          </h2>
          <p className="text-base leading-7 text-stone-600 md:text-xl md:leading-8">
            Indicadores clave de producción, personal, seguridad y cobertura operativa.
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.85rem] border border-stone-300 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_30%),linear-gradient(180deg,#171717_0%,#242424_58%,#2b2725_100%)] shadow-[0_28px_60px_-34px_rgba(24,24,27,0.34)]">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-3">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden border border-white/5 bg-white/[0.015] p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-300 hover:bg-white/[0.03]"
              >
                <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-emerald-500/60 via-stone-400/35 to-transparent" />
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-600/30 group-hover:border-emerald-600" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-600/30 group-hover:border-emerald-600" />

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <stat.icon className="h-8 w-8 text-emerald-400 opacity-90 transition-opacity group-hover:opacity-100" />
                    <span className="text-[10px] font-mono text-stone-400 group-hover:text-emerald-400">
                      ID_STAT_{stat.id}
                    </span>
                  </div>

                  <div>
                    <div className="text-5xl font-black font-mono tracking-tighter text-stone-50">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <h3 className="mt-1 text-sm font-bold uppercase tracking-widest text-stone-300">
                      {stat.label}
                    </h3>
                  </div>

                  <p className="text-xs font-medium leading-relaxed text-stone-400">
                    {stat.subtext}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
