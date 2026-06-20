import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import WorldMap, { type WorldMapHandle } from "./WorldMap";
import Pin from "./Pin";
import { project } from "./mapEngine";
import { PINS, UI, t, type Pin as PinT, type Lang } from "./data";
import { setTravelOrigin } from "./travelStore";

interface HeroProps {
  isModalOpen: boolean;
}

export default function Hero({ isModalOpen }: HeroProps) {
  const lang: Lang = "es";
  const navigate = useNavigate();

  const shouldRotate = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(orientation: portrait)").matches &&
    window.innerWidth < 1024;

  const calcMapW = () => Math.max(window.innerHeight, 2 * window.innerWidth);

  const [isMobile, setIsMobile] = useState(() => shouldRotate());
  const [mapW, setMapW] = useState(() =>
    typeof window !== "undefined" ? calcMapW() : 800
  );

  useEffect(() => {
    const orientMQ = window.matchMedia("(orientation: portrait)");
    const update = () => {
      setTimeout(() => {
        setIsMobile(shouldRotate());
        setMapW(calcMapW());
      }, 50);
    };
    orientMQ.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      orientMQ.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const mapWrapRef  = useRef<HTMLDivElement>(null); // blur target
  const panRef      = useRef<HTMLDivElement>(null); // translate del viaje
  const zoomRef     = useRef<HTMLDivElement>(null); // scale + parallax
  const pinsRef     = useRef<HTMLDivElement>(null);
  const darkRef     = useRef<HTMLDivElement>(null);
  const worldMapRef = useRef<WorldMapHandle>(null);
  const chromeRef   = useRef<HTMLDivElement>(null);
  const coordsRef   = useRef<HTMLDivElement>(null);

  const phaseRef = useRef<"map" | "traveling" | "arrived">("map");

  // ---------- intro ----------
  useEffect(() => {
    let started = false;
    const run = () => {
      if (started) return;
      started = true;

      const pins = pinsRef.current?.querySelectorAll<HTMLElement>("[data-pin]") ?? [];
      worldMapRef.current?.drawArcsProgress(0);

      gsap.set(mapWrapRef.current, { scale: 1.06, opacity: 0 });
      gsap.set(pins, { scale: 0, opacity: 0 });
      gsap.set(chromeRef.current, { opacity: 0, y: 14 });

      const tl = gsap.timeline();
      const arcObj = { v: 0 };
      tl.to(mapWrapRef.current, { scale: 1, opacity: 1, duration: 2.0, ease: "power2.out" }, 0)
        .to(arcObj, { v: 1, duration: 1.6, ease: "power1.inOut", onUpdate: () => worldMapRef.current?.drawArcsProgress(arcObj.v) }, 0.5)
        .to(pins, { scale: 1, opacity: 1, duration: 1.0, ease: "back.out(2.2)", stagger: 0.14 }, 0.9)
        .to(chromeRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 1.2);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(run);
      const id = window.setTimeout(run, 900);
      return () => window.clearTimeout(id);
    }
    run();
  }, []);

  // ---------- cursor parallax (solo desktop, solo en fase mapa) ----------
  useEffect(() => {
    if (isMobile) return;
    const qx  = gsap.quickTo(zoomRef.current, "x", { duration: 0.9, ease: "power3.out" });
    const qy  = gsap.quickTo(zoomRef.current, "y", { duration: 0.9, ease: "power3.out" });
    const qpx = gsap.quickTo(pinsRef.current, "x", { duration: 1.1, ease: "power3.out" });
    const qpy = gsap.quickTo(pinsRef.current, "y", { duration: 1.1, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      if (phaseRef.current !== "map") return;
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      qx(-cx * 22); qy(-cy * 16); qpx(-cx * 34); qpy(-cy * 24);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  // ---------- coordinates ticker ----------
  useEffect(() => {
    const id = window.setInterval(() => {
      const lat = Math.sin(Date.now() / 4200) * 56;
      const lon = Math.cos(Date.now() / 5300) * 121;
      const ns = lat >= 0 ? "N" : "S";
      const ew = lon >= 0 ? "E" : "W";
      if (coordsRef.current)
        coordsRef.current.textContent = `${Math.abs(lat).toFixed(4)}° ${ns}  /  ${Math.abs(lon).toFixed(4)}° ${ew}`;
    }, 120);
    return () => window.clearInterval(id);
  }, []);

  // ---------- VIAJE AL PIN (zoom-in + navigate) ----------
  const handlePinOpen = (pin: PinT, btn: HTMLElement) => {
    if (isMobile) { navigate(pin.route); return; }
    if (phaseRef.current !== "map") return;
    phaseRef.current = "traveling";

    const rect = btn.getBoundingClientRect();
    const pinX = rect.left + rect.width / 2;
    const pinY = rect.top + rect.height / 2;
    const pos = project(pin.lon, pin.lat);

    setTravelOrigin({ x: pinX, y: pinY, pinId: pin.id });

    gsap.set(zoomRef.current, { transformOrigin: `${pos.x * 100}% ${pos.y * 100}%` });

    const all = pinsRef.current?.querySelectorAll<HTMLElement>("[data-pin]") ?? [];
    all.forEach((el) => {
      const active = el.getAttribute("aria-label") === t(pin.name, lang);
      gsap.to(el, { opacity: active ? 1 : 0, duration: 0.5, ease: "power2.out" });
    });

    const tl = gsap.timeline({ onComplete: () => { phaseRef.current = "arrived"; } });
    tl.to(zoomRef.current, { scale: 2.6, duration: 1.15, ease: "power3.inOut" }, 0)
      .to(panRef.current, { x: window.innerWidth / 2 - pinX, y: window.innerHeight / 2 - pinY, duration: 1.15, ease: "power3.inOut" }, 0)
      .to(mapWrapRef.current, { filter: "blur(7px)", duration: 1.0, ease: "power2.out" }, 0.15)
      .to(darkRef.current, { opacity: 0.6, duration: 1.0, ease: "power2.out" }, 0.15)
      .to(chromeRef.current, { opacity: 0, duration: 0.4, ease: "power2.out" }, 0);

    window.setTimeout(() => navigate(pin.route), 120);
  };

  // ---------- ZOOM-OUT al cerrar el modal ----------
  useEffect(() => {
    if (isModalOpen) return;
    if (phaseRef.current === "map") return;
    phaseRef.current = "traveling";

    const all = pinsRef.current?.querySelectorAll<HTMLElement>("[data-pin]") ?? [];
    const tl = gsap.timeline({ onComplete: () => { phaseRef.current = "map"; } });
    tl.to(zoomRef.current, { scale: 1, duration: 1.0, ease: "power3.inOut" }, 0)
      .to(panRef.current, { x: 0, y: 0, duration: 1.0, ease: "power3.inOut" }, 0)
      .to(mapWrapRef.current, { filter: "blur(0px)", duration: 0.8, ease: "power2.out" }, 0)
      .to(darkRef.current, { opacity: 0, duration: 0.8, ease: "power2.out" }, 0)
      .to(all, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.2)
      .to(chromeRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.3);
  }, [isModalOpen]);

  const centerBoxStyle: React.CSSProperties = isMobile
    ? {
        position: "absolute",
        width: `${mapW}px`,
        height: `${mapW / 2}px`,
        left: "50%",
        top: "42%",
        transform: "translate(-50%, -50%) rotate(90deg)",
        transformOrigin: "center center",
      }
    : {
        position: "absolute",
        left: "50%",
        top: "50%",
        aspectRatio: "2 / 1",
        width: "108%",
        transform: "translate(-50%, -50%)",
      };

  return (
    <section className="fixed inset-0 overflow-hidden font-body text-[#f4f1ea] [background:radial-gradient(120%_90%_at_50%_42%,rgba(255,255,255,0.035),transparent_60%),radial-gradient(140%_120%_at_50%_120%,rgba(233,200,147,0.05),transparent_55%),#0a0a0a]">
      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 z-[5] [background:radial-gradient(110%_100%_at_50%_50%,transparent_52%,rgba(0,0,0,0.55)_100%)]" />

      {/* MAP — 3 capas: blur / pan / zoom */}
      <div ref={mapWrapRef} className="absolute inset-0 z-[1] will-change-[filter,transform]">
        <div style={centerBoxStyle}>
          <div ref={panRef} className="h-full w-full will-change-transform">
            <div ref={zoomRef} className="h-full w-full will-change-transform">
              <WorldMap ref={worldMapRef} pins={PINS} showArcs>
                <div ref={pinsRef} className="absolute inset-0 z-[3]">
                  {PINS.map((p, i) => {
                    const pos = project(p.lon, p.lat);
                    return (
                      <Pin
                        key={p.id}
                        pin={p}
                        index={i}
                        lang={lang}
                        xPct={pos.x * 100}
                        yPct={pos.y * 100}
                        isMapRotated={isMobile}
                        onOpen={handlePinOpen}
                      />
                    );
                  })}
                </div>
              </WorldMap>
            </div>
          </div>
        </div>
      </div>

      {/* overlay oscuro (fuera del mapWrap para no recibir blur) */}
      <div ref={darkRef} className="pointer-events-none absolute inset-0 z-[4] bg-black opacity-0" />

      {/* CHROME — siempre upright */}
      <div ref={chromeRef} className="pointer-events-none absolute inset-0 z-[6] [&>*]:pointer-events-auto">

        {/* Top-left: logo */}
        <div className="absolute left-5 top-6 md:left-[46px] md:top-10">
          <div className="flex items-baseline gap-[10px]">
            <span className="font-display text-[18px] font-medium leading-none tracking-[-0.01em] text-white md:text-[22px]">
              Zincel
            </span>
            <span className="hidden font-body text-[9px] uppercase tracking-[.3em] text-white/35 md:block">
              Ideas Globales
            </span>
          </div>
          <span className="mt-[5px] block font-body text-[9px] uppercase tracking-[.3em] text-white/30 md:hidden">
            {t(UI.meta, lang)}
          </span>
        </div>

        {/* Top-right: meta */}
        <div className="absolute right-5 top-6 flex items-center gap-[18px] md:right-[46px] md:top-10">
          <span className="hidden whitespace-nowrap font-body text-[10px] uppercase tracking-[.3em] text-white/30 md:block">
            {t(UI.meta, lang)}
          </span>
        </div>

        {/* Bottom-left: caption */}
        <div className="absolute bottom-6 left-5 max-w-[260px] md:bottom-10 md:left-[46px] md:max-w-[430px]">
          <div className="font-display text-[18px] italic leading-[1.2] text-[#f4f1ea] [text-wrap:balance] md:text-[30px]">
            {t(UI.lede, lang)}
          </div>
          <div className="mt-3 flex items-center gap-[11px] font-body text-[9px] uppercase tracking-[.28em] text-white/50 md:mt-[18px] md:text-[10.5px]">
            <span className="h-[4px] w-[4px] rounded-full bg-[#e9c893] shadow-[0_0_8px_rgba(233,200,147,0.55)]" />
            {t(UI.hint, lang)}
          </div>
        </div>

        {/* Bottom-right: coordenadas */}
        <div
          ref={coordsRef}
          className="absolute bottom-6 right-5 text-right font-body text-[9px] tabular-nums tracking-[.18em] text-white/25 md:bottom-10 md:right-[46px] md:text-[10px] md:tracking-[.22em]"
        />
      </div>
    </section>
  );
}
