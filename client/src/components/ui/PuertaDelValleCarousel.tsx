// client/src/components/ui/PuertaDelValleCarousel.tsx

import { BasePortfolioCarousel, PortfolioItem } from "@/components/ui/BasePortfolioCarousel";

const puertaDelValleImages: PortfolioItem[] = [
  {
    id: 1,
    href: "#",
    ariaLabel: "Etiqueta premium de queso Puerta del Valle",
    image: {
      src: "/imagenes-optim/trabajos/puerta-del-valle/carrusel/puerta-del-valle-etiqueta",
      alt: "Detalle de etiqueta premium para queso artesanal Puerta del Valle, diseño elegante con tipografía sofisticada y colores tierra",
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, 100vw",
    },
    // ¡Sin overlay! No aparece ningún texto
  },
  {
    id: 2,
    href: "#",
    ariaLabel: "Logotipo de Puerta del Valle",
    image: {
      src: "/imagenes-optim/trabajos/puerta-del-valle/carrusel/puerta-del-valle-Logo",
      alt: "Logotipo oficial de Puerta del Valle, símbolo andino que representa la tradición quesera de Chiquián, Áncash",
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, 100vw",
    },
  },
  {
    id: 3,
    href: "#",
    ariaLabel: "Packaging premium de Puerta del Valle",
    image: {
      src: "/imagenes-optim/trabajos/puerta-del-valle/carrusel/puerta-del-valle-packaging",
      alt: "Mockup de empaque premium para queso artesanal Puerta del Valle, diseño funcional y sofisticado",
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, 100vw",
    },
  },
  {
    id: 4,
    href: "#",
    ariaLabel: "Sitio web responsive de Puerta del Valle",
    image: {
      src: "/imagenes-optim/trabajos/puerta-del-valle/carrusel/puerta-del-valle-web",
      alt: "Captura del sitio web responsive de Puerta del Valle, experiencia digital inmersiva y moderna",
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, 100vw",
    },
  },
];

const puertaDotColors = ["bg-amber-400", "bg-amber-400", "bg-amber-400", "bg-amber-400"];

export function PuertaDelValleCarousel() {
  return (
    <BasePortfolioCarousel
      items={puertaDelValleImages}
      title="" // sin título arriba del carrusel
      dotColors={puertaDotColors}
    />
  );
}
