// client/src/components/ui/TiestoCoffeeCarousel.tsx

import { BasePortfolioCarousel, PortfolioItem } from "@/components/ui/BasePortfolioCarousel";

const TiestoCoffeeImages: PortfolioItem[] = [
  {
    id: 1,
    href: "#",
    ariaLabel: "Vista hero de tiesto coffee – Café artesanal premium",
    image: {
      src: "/imagenes-optim/Hero/tiesto-coffee/Hero/Hero-tiesto",
      alt: "Hero principal tiesto coffee: branding artesanal para cafetería peruana con granos de café premium y diseño cálido por Zincel",
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, 100vw",
    },
  },
  {
    id: 2,
    href: "#",
    ariaLabel: "Sabor caramelo – tiesto coffee",
    image: {
      src: "/imagenes-optim/Hero/tiesto-coffee/Hero/caramelo",
      alt: "Café sabor caramelo artesanal tiesto coffee: taza humeante con tonos dorados y caramelo, diseño visual premium por Zincel Lima",
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, 100vw",
    },
  },
  {
    id: 3,
    href: "#",
    ariaLabel: "Sabor moca – tiesto coffee",
    image: {
      src: "/imagenes-optim/Hero/tiesto-coffee/Hero/mocca",
      alt: "Café sabor moca tiesto coffee: combinación intensa de chocolate y café, presentación artesanal con crema y granos, por Zincel Perú",
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, 100vw",
    },
  },
  {
    id: 4,
    href: "#",
    ariaLabel: "Sabor vainilla – tiesto coffee",
    image: {
      src: "/imagenes-optim/Hero/tiesto-coffee/Hero/vainilla",
      alt: "Café sabor vainilla artesanal tiesto coffee: taza suave con notas de vainilla natural, estilo cálido y premium diseñado por Zincel",
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, 100vw",
    },
  },
  {
    id: 5,
    href: "#",
    ariaLabel: "Sabor chocolate – tiesto coffee",
    image: {
      src: "/imagenes-optim/Hero/tiesto-coffee/Hero/chocolate",
      alt: "Café sabor chocolate tiesto coffee: bebida rica con cacao artesanal, presentación inmersiva y branding sofisticado por Zincel Lima",
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, 100vw",
    },
  },
];

const puertaDotColors = ["bg-red-700", "bg-red-700", "bg-red-700", "bg-red-700", "bg-red-700"];

export function TiestoCoffeeCarousel() {
  return (
    <BasePortfolioCarousel
      items={TiestoCoffeeImages}
      title=""
      dotColors={puertaDotColors}
      fullHeight
      hideArrows
    />
  );
}
