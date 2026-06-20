import { useEffect, useRef } from "react";
import gsap from "gsap";
import { t, type Pin as PinT, type Lang } from "./data";

interface Props {
  pin: PinT;
  index: number;
  lang: Lang;
  xPct: number;
  yPct: number;
  isMapRotated: boolean; // true en mobile → mapa rotado 90°
  onOpen: (pin: PinT, el: HTMLElement) => void;
}

export default function Pin({ pin, index, lang, xPct, yPct, isMapRotated, onOpen }: Props) {
  const coreRef  = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const tlRef    = useRef<gsap.core.Timeline | null>(null);
  const left = pin.labelSide === "left";

  useEffect(() => {
    if (isMapRotated) {
      // Mobile: label siempre visible, counter-rotado
      gsap.set(labelRef.current, { opacity: 1 });
      return;
    }

    // Desktop: label siempre visible (opacity base 0.55), hover → 1 + core escala
    gsap.set(labelRef.current, { opacity: 0.55, x: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(coreRef.current, { scale: 1.55, duration: 0.35, ease: "power2.out" }, 0)
      .to(labelRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" }, 0);
    tlRef.current = tl;
    return () => { tl.kill(); };
  }, [left, isMapRotated]);

  /*
   * Mobile (mapa rotado 90° CW):
   * El label se contrarrota -90° para quedar legible en pantalla.
   * Se posiciona debajo del pin (en coordenadas del mapa rotado = derecha en pantalla).
   */
  const mobileLabelStyle: React.CSSProperties = {
    position: "absolute",
    top: "14px",
    left: "50%",
    transform: "translateX(-50%) rotate(-90deg)",
    transformOrigin: "center top",
    whiteSpace: "nowrap",
    opacity: 1,
  };

  return (
    <button
      data-pin
      aria-label={t(pin.name, lang)}
      onClick={(e) => onOpen(pin, e.currentTarget)}
      onMouseEnter={() => !isMapRotated && tlRef.current?.play()}
      onMouseLeave={() => !isMapRotated && tlRef.current?.reverse()}
      onFocus={() => !isMapRotated && tlRef.current?.play()}
      onBlur={() => !isMapRotated && tlRef.current?.reverse()}
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 [-webkit-tap-highlight-color:transparent]"
      style={{ left: `${xPct}%`, top: `${yPct}%` }}
    >
      {/* Hit area generoso para touch */}
      <span className="absolute -inset-5 rounded-full" />

      {/* Anillos pulsantes */}
      {pin.kind === "briefing" ? (
        <>
          <span className="absolute left-1/2 top-1/2 h-[10px] w-[10px] rounded-full border border-amber-400 opacity-0 animate-pinPulse" />
          <span className="absolute left-1/2 top-1/2 h-[10px] w-[10px] rounded-full border border-amber-400 opacity-0 animate-pinPulse [animation-delay:1.7s]" />
        </>
      ) : (
        <>
          <span className="absolute left-1/2 top-1/2 h-[10px] w-[10px] rounded-full border border-[#e9c893] opacity-0 animate-pinPulse" />
          <span className="absolute left-1/2 top-1/2 h-[10px] w-[10px] rounded-full border border-[#e9c893] opacity-0 animate-pinPulse [animation-delay:1.7s]" />
        </>
      )}

      {/* Color del pin */}
      {pin.kind === "briefing" ? (
        <span
          ref={coreRef}
          className="relative block h-[9px] w-[9px] rounded-full bg-amber-500 shadow-[0_0_12px_2px_rgba(139,92,246,0.7),0_0_2px_rgba(255,255,255,0.6)]"
        >
          <span className="absolute inset-[2.5px] rounded-full bg-white/90" />
        </span>
      ) : (
        <span
          ref={coreRef}
          className="relative block h-[9px] w-[9px] rounded-full bg-[#e9c893] shadow-[0_0_10px_1px_rgba(233,200,147,0.55),0_0_2px_rgba(255,255,255,0.6)]"
        >
          <span className="absolute inset-[2.5px] rounded-full bg-white/90" />
        </span>
      )}

      {/* LABEL — mobile: debajo del pin, contrarrotado. Desktop: izq/der con hover */}
      {isMapRotated ? (
        <span style={mobileLabelStyle}>
          <span className="font-body text-[10px] tracking-[.1em] text-white/90">
            {t(pin.name, lang)}
          </span>
        </span>
      ) : (
        <span
          ref={labelRef}
          className={`pointer-events-none absolute top-1/2 flex -translate-y-1/2 flex-col gap-px whitespace-nowrap ${
            left ? "right-[22px] items-end text-right" : "left-[22px]"
          }`}
        >
          <span
            className={`absolute top-1/2 h-px w-[18px] ${
              left
                ? "right-[-22px] bg-[linear-gradient(270deg,#e9c893,transparent)]"
                : "left-[-22px] bg-[linear-gradient(90deg,#e9c893,transparent)]"
            } opacity-70`}
          />
          <span className={`font-body text-[8px] uppercase tracking-[.34em] ${pin.kind === "briefing" ? "text-amber-400" : "text-[#e9c893]"}`}>
            {t(pin.sub, lang)}
          </span>
          <span className="font-display text-[16px] font-medium leading-none text-white">
            {t(pin.name, lang)}
          </span>
        </span>
      )}
    </button>
  );
}
