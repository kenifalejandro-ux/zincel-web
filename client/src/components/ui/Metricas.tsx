/* client/src/components/ui/Metricas.tsx */
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export type Metrica = {
  valor: string;
  etiqueta: string;
  detalle?: string;
};

type Props = {
  data: Metrica[];
  variant?: "inline" | "cards" | "grid";
  vista?: "mobile" | "desktop";
  color?: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return reduced;
}

function Counter({
  value,
  active,
  reducedMotionEnabled,
}: {
  value: string;
  active: boolean;
  reducedMotionEnabled: boolean;
}) {
  const trimmedValue = value.trim();
  const numericMatch = trimmedValue.match(/^(\d+)([+%]?)$/);
  const isAnimatable = !!numericMatch;

  if (!isAnimatable) return <>{trimmedValue}</>;

  const number = Number(numericMatch[1]);
  const suffix = numericMatch[2] ?? "";
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (reducedMotionEnabled) {
      setCount(number);
      return;
    }

    let rafId = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * number));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, number, reducedMotionEnabled]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function Metricas({
  data,
  variant = "cards",
  vista = "desktop",
  color = "#0be416",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const metricRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setVisible(new Array(data.length).fill(false));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = metricRefs.current.findIndex((el) => el === entry.target);

          if (entry.isIntersecting && index !== -1) {
            setVisible((prev) => {
              if (prev[index]) return prev;
              const next = [...prev];
              next[index] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    metricRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data.length]);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-metrica-item]");

      items.forEach((item, index) => {
        const direction = index % 2 === 0 ? -70 : 70;

        gsap.fromTo(
          item,
          { autoAlpha: 0, x: direction, y: 18, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [data.length, reducedMotion]);

  if (!data?.length) return null;

  const valueClass =
    vista === "mobile"
      ? "text-3xl font-semibold tracking-tight"
      : "text-4xl lg:text-[2.8rem] font-semibold tracking-tight";

  const labelClass =
    vista === "mobile"
      ? "text-[11px] uppercase text-zinc-500 tracking-[0.25em] font-semibold"
      : "text-xs uppercase text-zinc-500 tracking-[0.25em] font-semibold";

  const detailClass =
    vista === "mobile"
      ? "mt-2 text-[11px] leading-5 text-zinc-500 normal-case tracking-normal font-normal"
      : "mt-2 text-xs leading-5 text-zinc-500 normal-case tracking-normal font-normal";

  if (variant === "inline") {
    return (
      <div
        ref={sectionRef}
        className="max-w-9xl grid grid-cols-1 border bg-zinc-100 border-zinc-200 md:grid-cols-3 lg:grid-cols-3"
      >
        {data.map((m, i) => (
          <div
            key={`${m.etiqueta}-${i}`}
            data-metrica-item
            className={[
              "relative px-6 py-6 lg:py-8",
              "border-zinc-200",
              i > 0 ? "border-t" : "",
              i === 1 ? "md:border-t-0" : "",
              i >= 2 ? "md:border-t" : "",
              i % 2 === 1 ? "md:border-l" : "",
              i < 3 ? "lg:border-t-0" : "",
              i >= 3 ? "lg:border-t" : "",
              i % 3 === 0 ? "lg:border-l-0" : "lg:border-l",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="flex flex-col items-center gap-2 md:items-start">
              <div
                ref={(el) => {
                  metricRefs.current[i] = el;
                }}
                className={`${valueClass} leading-none text-center md:text-left`}
                style={{ color }}
              >
                <Counter value={m.valor} active={visible[i]} reducedMotionEnabled={reducedMotion} />
              </div>

              <div className="text-center md:text-left">
                <div className={labelClass}>{m.etiqueta}</div>
                {m.detalle && <div className={detailClass}>{m.detalle}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div
        ref={sectionRef}
        className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4 lg:grid-cols-3 lg:gap-8"
      >
        {data.map((m, i) => (
          <div
            key={`${m.etiqueta}-${i}`}
            data-metrica-item
            className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              className="absolute left-0 top-0 h-1 w-full"
              style={{ backgroundColor: color }}
              aria-hidden
            />

            <div
              className="absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-10 blur-2xl"
              style={{ backgroundColor: color }}
              aria-hidden
            />

            <div className="relative p-6 text-center md:text-left lg:p-8">
              <div>
                <div className={labelClass}>{m.etiqueta}</div>
                {m.detalle && <div className={detailClass}>{m.detalle}</div>}
              </div>

              <div
                ref={(el) => {
                  metricRefs.current[i] = el;
                }}
                className={`${valueClass} mt-4 leading-none`}
                style={{ color }}
              >
                <Counter value={m.valor} active={visible[i]} reducedMotionEnabled={reducedMotion} />
              </div>

              <div className="mt-6 h-px bg-zinc-200/70" />
            </div>

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/0 via-white/0 to-white/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-6 rounded-[1.85rem] border border-zinc-200 bg-white px-6 py-8 md:grid-cols-3 md:gap-4 md:px-8 md:py-10 lg:grid-cols-3 lg:gap-8">
          {data.map((m, i) => (
            <div
              key={`${m.etiqueta}-${i}`}
              data-metrica-item
              className={`relative mt-2 pl-0 text-center md:mt-0 md:pl-8 md:text-left ${
                i > 0 ? "md:border-l md:border-zinc-200" : ""
              }`}
            >
              <div className="mx-auto mb-5 h-px w-10 bg-zinc-300 md:mx-0" aria-hidden />

              <div
                ref={(el) => {
                  metricRefs.current[i] = el;
                }}
                className={`${valueClass} mb-3 transition-transform hover:-translate-y-0.5`}
                style={{ color }}
              >
                <Counter value={m.valor} active={visible[i]} reducedMotionEnabled={reducedMotion} />
              </div>

              <div>
                <div className={labelClass}>{m.etiqueta}</div>
                {m.detalle && <div className={detailClass}>{m.detalle}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
