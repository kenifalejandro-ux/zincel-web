// client/src/components/ui/PortfolioCarousel.tsx  (o donde lo tengas)
import { BasePortfolioCarousel, PortfolioItem } from "./BasePortfolioCarousel";
// Ajusta la ruta si es necesario

const PortfolioItem: PortfolioItem[] = [
  {
    id: 1,
    href: "/portfolio/puerta-del-valle",
    ariaLabel: "Ver proyecto Puerta del Valle",
    image: {
      src: "/imagenes-optim/trabajos/imagenes/tiesto-coffee/branding/tiesto-coffee",
      alt: "Landing page de Puerta del Valle, quesos artesanales en Lima, Perú",
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, 50vw",
    },
    overlay: {
      h3: "Puerta del Valle",
      p: "Quesos Artesanales",
      buttonText: "Ver Proyecto",
    },
  },
  {
    id: 2,
    href: "/portfolio/inti-pintay",
    ariaLabel: "Ver proyecto Inti Pintay",
    image: {
      src: "/imagenes-optim/trabajos/imagenes/inti-pintay/inti-pintay",
      alt: "Landing page de Inti Pintay, licores artesanales en Lima, Perú",
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, 50vw",
    },
    overlay: {
      h3: "Inti Pintay",
      p: "Licores Artesanales",
      buttonText: "Ver Proyecto",
    },
  },
  {
    id: 3,
    href: "/portfolio/tiesto-coffee",
    ariaLabel: "Ver proyecto Tiesto Coffee",
    image: {
      src: "/imagenes-optim/trabajos/imagenes/inti-pintay/inti-pintay",
      alt: "Landing page de Tiesto Coffee, cafetería familiar en Lima, Perú",
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, 50vw",
    },
    overlay: {
      h3: "Tiesto Coffee",
      p: "Cafetería Familiar",
      buttonText: "Ver Proyecto",
    },
  },
  {
    id: 4,
    href: "/portfolio/bkars",
    ariaLabel: "Ver proyecto BKARS",
    image: {
      src: "/imagenes-optim/trabajos/imagenes/inti-pintay/inti-pintay",
      alt: "Landing page de BKARS, mecánica automotriz en Lima, Perú",
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, 50vw",
    },
    overlay: {
      h3: "BKARS",
      p: "Mecánica Automotriz",
      buttonText: "Ver Proyecto",
    },
  },
];

export function PortfolioCarousel() {
  return (
    <BasePortfolioCarousel
      items={PortfolioItem} // ← CORREGIDO: ahora sí pasas los datos
      title="Proyectos conceptuales que inspiran" // o el título que prefieras
    />
  );
}
