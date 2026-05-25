// client/src/components/ui/CarouselPlanes-web.tsx  (o donde lo tengas)

import { PrecioPortfolioCarousel, PortfolioItem } from "./PrecioPortfolioCarousel";
// Ajusta la ruta si es necesario

const PortfolioItem: PortfolioItem[] = [
  {
    id: 1,
    href: "",
    ariaLabel: "Paquete Básico-web Express IA",
    image: {
      src: "/imagenes-optim/planes-web/paquete-basico",
      alt: "Consulta nuestros planes básicos, ideales para negocios que recién empiezan.",
      width: 400,
      height: 400,
      sizes: "(max-width: 768px) 100vw, 50vw",
    },
  },

  {
    id: 2,
    href: "",
    ariaLabel: "Paquete gold-web-pro",
    image: {
      src: "/imagenes-optim/planes-web/paquete-gold-web-pro",
      alt: "Ideal para negocios en crecimiento que buscan mayor presencia en línea.",
      width: 400,
      height: 400,
      sizes: "(max-width: 768px) 100vw, 50vw",
    },
  },
  {
    id: 3,
    href: "",
    ariaLabel: "Paquete red - web Advance",
    image: {
      src: "/imagenes-optim/planes-web/paquete-red-web-advance",
      alt: "Ideal para empresas, marcas que buscan una presencia sólida en línea.",
      width: 400,
      height: 400,
      sizes: "(max-width: 768px) 100vw, 50vw",
    },
  },

  {
    id: 4,
    href: "",
    ariaLabel: "Paquete blue-web expert",
    image: {
      src: "/imagenes-optim/planes-web/paquete-blue-web-expert",
      alt: "Ideal para negocios consolidados que buscan maximizar su impacto en línea.",
      width: 400,
      height: 400,
      sizes: "(max-width: 768px) 100vw, 50vw",
    },
  },
  {
    id: 5,
    href: "",
    ariaLabel: "Paquete platinum-web elite",
    image: {
      src: "/imagenes-optim/planes-web/paquete-platinum-web-elite",
      alt: "Ideal para marcas que buscan posicionamiento fuerte y diferenciación en el mercado.",
      width: 400,
      height: 400,
      sizes: "(max-width: 768px) 100vw, 50vw",
    },
  },
];

export function CarouselPlanesWeb() {
  return (
    <PrecioPortfolioCarousel
      items={PortfolioItem} // ← CORREGIDO: ahora sí pasas los datos
      title="Rangos y planes web" // o el título que prefieras
    />
  );
}
