export type Lang = "es" | "en";

export interface L {
  es: string;
  en: string;
}

export type PinKind = "services" | "work" | "about" | "contact" | "pricing" | "experience";

export interface Pin {
  id: string;
  route: string;
  lon: number;
  lat: number;
  labelSide: "left" | "right";
  name: L;
  sub: L;
  kind: PinKind;
}

export interface UIStrings {
  tagline: L;
  lede: L;
  hint: L;
  meta: L;
}

export const UI: UIStrings = {
  tagline: { es: "Ideas Globales, Lima", en: "Global Ideas, Lima" },
  lede: {
    es: "Diseñamos webs y experiencias digitales que convierten.",
    en: "We design websites and digital experiences that convert.",
  },
  hint: { es: "Selecciona un destino", en: "Select a destination" },
  meta: { es: "EST. 2016 · LIMA, PERÚ", en: "EST. 2016 · LIMA, PERU" },
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
  },
];

export const t = (o: L | undefined, lang: Lang): string =>
  (o && (o[lang] ?? o.es ?? o.en)) || "";
