export type Lang = "es" | "en";

export interface L {
  es: string;
  en: string;
}

export type PinKind = "services" | "work" | "about" | "contact" | "pricing" | "experience" | "briefing";

export interface Pin {
  id: string;
  route: string;
  lon: number;
  lat: number;
  labelSide: "left" | "right";
  name: L;
  sub: L;
  kind: PinKind;
  lede: L;
}

export interface UIStrings {
  tagline: L;
  lede: L;
  hint: L;
  meta: L;
}

export const UI: UIStrings = {
  tagline: { es: "Zincel Ideas Globales, Lima", en: "Global Ideas, Lima" },
  lede: {
    es: "Diseñamos webs y experiencias digitales que convierten.",
    en: "We design websites and digital experiences that convert.",
  },
  hint: { es: "Selecciona un destino", en: "Select a destination" },
  meta: { es: "EST. 2026 · LIMA, PERÚ", en: "EST. 2026 · LIMA, PERU" },
};

export const PINS: Pin[] = [
  {
    id: "inicio",
    route: "/inicio",
    lon: 36.8,
    lat: -1.3,
    labelSide: "right",
    name: { es: "Inicio", en: "Home" },
    sub: { es: "Volver al mapa", en: "Back to map" },
    kind: "services",
    lede: {
      es: "Todo nace aquí, en el mapa. Un solo espacio del que parten todas las ideas.",
      en: "It all starts here, on the map. One space every idea departs from.",
    },
  },
  {
    id: "servicios",
    route: "/servicios",
    lon: -77.0,
    lat: -12.0,
    labelSide: "right",
    name: { es: "Servicios", en: "Services" },
    sub: { es: "Lo que hacemos", en: "What we do" },
    kind: "services",
    lede: {
      es: "Cuatro disciplinas, una sola dirección visual clara.",
      en: "Four disciplines, one clear visual direction.",
    },
  },
  {
    id: "portfolio",
    route: "/portfolio",
    lon: -74.0,
    lat: 40.7,
    labelSide: "right",
    name: { es: "Portfolio", en: "Portfolio" },
    sub: { es: "Nuestros proyectos", en: "Our projects" },
    kind: "work",
    lede: {
      es: "Trabajo que cruza husos horarios. Marcas que necesitaban hablarle al mundo.",
      en: "Work that crosses time zones. Brands that needed to speak to the world.",
    },
  },
  {
    id: "nosotros",
    route: "/sobre-nosotros",
    lon: -3.7,
    lat: 40.4,
    labelSide: "right",
    name: { es: "Nosotros", en: "About" },
    sub: { es: "El estudio", en: "The studio" },
    kind: "about",
    lede: {
      es: "Un estudio en Lima, ideas sin fronteras. Curiosos, en todas partes.",
      en: "A studio in Lima, ideas without borders. Curious, everywhere.",
    },
  },
  {
    id: "precios",
    route: "/precios-web",
    lon: -0.1,
    lat: 51.5,
    labelSide: "left",
    name: { es: "Precios Web", en: "Pricing" },
    sub: { es: "Planes y tarifas", en: "Plans & rates" },
    kind: "pricing",
    lede: {
      es: "Planes claros, sin letra chica. Sabes exactamente qué recibes.",
      en: "Clear plans, no fine print. You know exactly what you get.",
    },
  },
  {
    id: "experiencias",
    route: "/experiencias",
    lon: 80.0,
    lat: 28.0,
    labelSide: "left",
    name: { es: "Experiencias", en: "Experiences" },
    sub: { es: "Proyectos especiales", en: "Special projects" },
    kind: "experience",
    lede: {
      es: "Donde lo digital se vuelve físico. Proyectos que se recuerdan.",
      en: "Where digital becomes physical. Projects you remember.",
    },
  },
  {
    id: "contacto",
    route: "/contactanos",
    lon: 103.8,
    lat: 1.35,
    labelSide: "left",
    name: { es: "Contáctanos", en: "Contact" },
    sub: { es: "Hablemos", en: "Say hello" },
    kind: "contact",
    lede: {
      es: "Hablemos. Respondemos en menos de 24 horas, en tu zona horaria.",
      en: "Let's talk. We reply within 24 hours, in your time zone.",
    },
  },
  {
    id: "briefing",
    route: "/briefing",
    lon: -58.4,
    lat: -34.6,
    labelSide: "right",
    name: { es: "Briefing", en: "Briefing" },
    sub: { es: "Inicia tu proyecto", en: "Start your project" },
    kind: "briefing",
    lede: {
      es: "Cuéntanos tu proyecto en cinco minutos. Empecemos a trazar la ruta.",
      en: "Tell us about your project in five minutes. Let's chart the route.",
    },
  },
];

export const t = (o: L | undefined, lang: Lang): string =>
  (o && (o[lang] ?? o.es ?? o.en)) || "";

export const fmtCoords = (lon: number, lat: number): string => {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${ns}  /  ${Math.abs(lon).toFixed(4)}° ${ew}`;
};

export const pinByRoute = (path: string): Pin | undefined =>
  PINS.find((p) => p.route === path);
