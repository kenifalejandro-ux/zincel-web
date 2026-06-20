/**client/src/components/Paginas/Portfolio.tsx */

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageSEO from "../global/PageSEO";
import { LCPImage } from "../ui/LCPImage";
import { OptimizedVideo } from "../ui/OptimizedVideo";
import { Tooltip } from "../ui/Tooltip";
import { initVideoEvents } from "../sections/VideoParallaxHover";
import HeroPortfolio from "../hero/HeroPortfolio";
import HeroBg from "../hero/HeroBg";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  poster: string;
  link: string;
  year: string;
  category: string;
  src: string;
}

type PortfolioProjectCardProps = {
  project: ProjectItem;
  index: number;
  onNavigate: (link: string) => void;
};

const TOUCH_DEVICE_QUERY = "(hover: none), (pointer: coarse), (max-width: 1024px)";

const PORTFOLIO_NOTES = [
  "Este proyecto abre una línea de trabajo orientada a empresas que necesitan verse más sólidas, más confiables y mejor presentadas en digital.",
  "No se trata solo de diseñar una web, sino de construir una lectura institucional más clara, más sobria y mejor dirigida comercialmente.",
  "Cada decisión visual, narrativa y de movimiento está pensada para elevar la percepción del negocio sin saturarlo de recursos innecesarios.",
];

const PROJECTS_DATA = [
  {
    id: "cushuro",
    title: "Calera Santa Isabel de Cushuro",
    subtitle: "Una propuesta web desarrollada para presentar a la empresa con mayor solidez institucional, mejor jerarquía visual y una narrativa alineada con la escala real de su operación.",
    year: "2026",
    category: "Sitio web",
    src: "/videos-optim/hero/calera/parallax-calera",
    poster: "/imagenes-optim/poster/poster-calera/cantera001",
    link: "https://kenifa.sg-host.com/",
  },
];

function PortfolioProjectCard({ project, index, onNavigate }: PortfolioProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isTouchDevice, setIsTouchDevice] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(TOUCH_DEVICE_QUERY).matches : false
  );
  const [hasTouchVideoActivated, setHasTouchVideoActivated] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isTooltipActive, setIsTooltipActive] = useState(false);
  const [hasTouchVideoStarted, setHasTouchVideoStarted] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia(TOUCH_DEVICE_QUERY);
    const updateTouchDevice = (matches: boolean) => setIsTouchDevice(matches);
    updateTouchDevice(mediaQuery.matches);
    if (mediaQuery.addEventListener) {
      const handleChange = (event: MediaQueryListEvent) => updateTouchDevice(event.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    const legacyListener = (event: MediaQueryListEvent) => updateTouchDevice(event.matches);
    mediaQuery.addListener(legacyListener);
    return () => mediaQuery.removeListener(legacyListener);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    return initVideoEvents(videoRef, wrapperRef, wrapperRef);
  }, [isTouchDevice]);

  useEffect(() => {
    if (!isTouchDevice) {
      setHasTouchVideoActivated(false);
      setHasTouchVideoStarted(false);
    }
  }, [isTouchDevice]);

  useEffect(() => {
    if (!isTouchDevice || typeof window === "undefined") return;
    if (window.scrollY > 0) { setHasTouchVideoActivated(true); return; }
    const onFirstScroll = () => setHasTouchVideoActivated(true);
    window.addEventListener("scroll", onFirstScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", onFirstScroll);
  }, [isTouchDevice]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInViewport(entry.isIntersecting);
      if (!entry.isIntersecting) { setIsTooltipActive(false); setTooltipPosition(null); }
    }, { threshold: 0.35 });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isTouchDevice) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    if (!hasTouchVideoActivated || !isInViewport) { video.pause(); return; }
    const tryPlay = () => void video.play().catch(() => {});
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    tryPlay();
    return () => { video.removeEventListener("loadeddata", tryPlay); video.removeEventListener("canplay", tryPlay); };
  }, [hasTouchVideoActivated, isInViewport, isTouchDevice, project.src]);

  return (
    <article className="group border-t border-white/8 pt-8 first:border-t-0 first:pt-0">
      <Tooltip
        content="Explorar caso destacado"
        active={!isTouchDevice && isInViewport && isTooltipActive}
        position={tooltipPosition}
        showHand={false}
      />

      <button
        type="button"
        onClick={() => onNavigate(project.link)}
        onBlur={() => { setIsTooltipActive(false); setTooltipPosition(null); }}
        className="w-full text-left"
      >
        <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
          <div
            ref={wrapperRef}
            onMouseEnter={(event) => { if (!isTouchDevice && isInViewport) { setTooltipPosition({ x: event.clientX, y: event.clientY }); setIsTooltipActive(true); } }}
            onMouseMove={(event) => { if (!isTouchDevice && isInViewport) setTooltipPosition({ x: event.clientX, y: event.clientY }); }}
            onMouseLeave={() => { setIsTooltipActive(false); setTooltipPosition(null); }}
            className={`relative min-h-[320px] overflow-hidden border border-white/10 bg-white/4 lg:min-h-[540px] ${!isTouchDevice && isInViewport ? "cursor-none" : ""}`}
          >
            <LCPImage
              src={project.poster}
              alt={project.title}
              width={1400}
              height={900}
              pictureClassName="pointer-events-none absolute inset-0 z-10 block h-full w-full overflow-hidden"
              className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isTouchDevice ? hasTouchVideoStarted ? "opacity-0" : "opacity-100" : "group-hover:opacity-0"}`}
            />
            <OptimizedVideo
              ref={videoRef}
              key={project.src}
              src={project.src}
              poster={project.poster}
              className="absolute h-full w-full object-cover"
              muted
              loop
              onPlaying={() => { if (isTouchDevice) setHasTouchVideoStarted(true); }}
              playsInline
              preload="metadata"
              controls={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70" />
          </div>

          <div className="flex flex-col justify-between gap-10 border-t border-white/8 bg-white/4 p-6 lg:border-l lg:border-t-0 lg:p-10">
            <div>
              <p className="font-body text-[10px] uppercase tracking-[.22em] text-[#e9c893]/60">
                0{index + 1} · {project.category} · {project.year}
              </p>
              <h3 className="font-display mt-5 text-3xl font-medium leading-[1.02] tracking-[-0.04em] text-white lg:text-4xl">{project.title}</h3>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#f4f1ea]/55 lg:text-lg">{project.subtitle}</p>
            </div>

            <div className="grid gap-5 border-t border-white/8 pt-6">
              <p className="max-w-sm text-sm leading-6 text-[#f4f1ea]/40">Una presentación digital pensada para transmitir más solidez, mejor lectura Industrial y una percepción de marca más clara.</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[#e9c893] transition-transform duration-300 group-hover:translate-x-1">
                Ver cómo elevamos esta marca
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}

export default function Portfolio() {
  const navigate = useNavigate();

  const handleProjectNavigation = (link: string) => {
    if (/^https?:\/\//i.test(link)) { window.location.assign(link); return; }
    navigate(link);
  };

  return (
    <>
      <PageSEO pageId="portfolio" />

      <HeroPortfolio />

      <div className="bg-[#0a0a0a] text-[#f4f1ea]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-24">
          <section id="manifiesto" className="pb-20 lg:pb-24">
            <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="space-y-4">
                <p className="font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">Caso destacado</p>
                <h2 className="font-display max-w-2xl text-3xl font-medium leading-tight tracking-[-0.04em] text-white lg:text-4xl">Una dirección digital más sobria, más clara y mejor construida para empresas que necesitan proyectar peso, confianza y criterio.</h2>
              </div>
              <div className="grid gap-4 border-t border-white/8 pt-4">
                {PORTFOLIO_NOTES.map((note) => (
                  <article key={note} className="border-b border-white/8 pb-4">
                    <p className="text-base leading-7 text-[#f4f1ea]/60">{note}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="proyectos" className="py-20 lg:py-24">
            <div className="mb-14 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div className="space-y-4">
                <p className="font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">Selección</p>
                <h2 className="font-display text-3xl font-medium leading-tight tracking-[-0.04em] text-white lg:text-5xl">Proyectos con dirección estratégica</h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-[#f4f1ea]/55">Casos pensados para demostrar cómo una marca puede verse más sólida cuando el diseño, la narrativa y la estructura trabajan en la misma dirección.</p>
            </div>
            <div className="grid gap-10">
              {PROJECTS_DATA.map((project, index) => (
                <PortfolioProjectCard key={project.id} project={project} index={index} onNavigate={handleProjectNavigation} />
              ))}
            </div>
          </section>
        </div>

        <section id="contacto" className="relative overflow-hidden bg-[#0a0a0a] text-[#f4f1ea]">
          <HeroBg />
          <div className="relative mx-auto max-w-5xl px-6 py-24 text-center lg:px-12 lg:py-28">
            <p className="mb-6 font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">Siguiente paso</p>
            <h2 className="font-display mx-auto max-w-4xl text-4xl font-medium leading-[0.95] tracking-[-0.05em] text-white lg:text-7xl">Construyamos una presencia más sólida</h2>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-[#f4f1ea]/55 lg:text-lg">Si tu empresa necesita verse mejor estructurada, más confiable y con mayor autoridad visual, podemos desarrollar una presentación digital con esa intención.</p>
            <button
              onClick={() => handleProjectNavigation("https://wa.me/51933838792?text=Hola%2C%20quiero%20cotizar%20un%20proyecto.")}
              className="group mt-12 inline-flex items-center gap-3 border border-[#e9c893]/40 bg-[#e9c893]/10 px-7 py-4 text-sm font-medium text-[#e9c893] transition-all duration-300 hover:bg-[#e9c893]/20 hover:border-[#e9c893]/70"
            >
              <span>Cotizar proyecto</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
