/**client/src/components/section/servicios.tsx */
/**contenido del carrusel */
import { Code, Palette, Smartphone, Box, TrendingUp } from "lucide-react";
import type { CarouselServiceItem } from "../ui/ServicesCarousel";
import ServicesCarousel from "../ui/ServicesCarousel";
import type { ImageStackImage } from "../ui/ImageStack";


interface ServiciosContentProps {
  className?: string;
}

const SERVICES_DATA: CarouselServiceItem[] = [
  {
    id: "desarrollo-web",
    title: "Desarrollo Web",
    description: "",
    details: "Creamos sitios web profesionales con arquitectura clara, performance sólida y una experiencia que eleva la percepción de tu negocio desde el primer scroll.",
    benefits: ["SEO incluido", "Responsive", "Soporte 3 meses", "LCP < 2s", "90+ Score SEO"],
    reverse: true,
    images: [{ src: "/imagenes-optim/quienes-somos/imagenes/conceptos/comunicacion-tension", alt: "Desarrollo Web", stackLayer: "tertiary" } as ImageStackImage],
    href: "/servicios/",
    icon: <Code className="h-5 w-5" />,
  },
  {
    id: "branding",
    title: "Branding",
    description: "",
    details: "Diseñamos sistemas de marca que no se quedan solo en el logo: construimos lenguaje visual, tono, orden y coherencia para que tu empresa se vea más madura y memorable.",
    benefits: ["Logo profesional", "Manual de marca", "Paleta de colores", "Tipografía", "Aplicaciones visuales"],
    reverse: false,
    images: [{ src: "/imagenes-optim/servicios/branding/branding", alt: "Branding", stackLayer: "tertiary" } as ImageStackImage],
    href: "/servicios",
    icon: <Palette className="h-5 w-5" />,
  },
  {
    id: "diseno-ui-ux",
    title: "Diseño UI/UX",
    description: "",
    details: "Antes de diseñar lo visual, definimos la lógica. Trabajamos desde wireframes para organizar contenido, jerarquizar mensajes y construir flujos que se entienden sin esfuerzo.",
    benefits: ["User Research", "Wireframing", "Prototipado", "Usability Testing", "Design System"],
    reverse: true,
    images: [{ src: "/imagenes-optim/servicios/ui/wireframe-calera-boceto", alt: "Diseño UI/UX", stackLayer: "tertiary" } as ImageStackImage],
    href: "/servicios/",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    id: "modelado-3d",
    title: "Modelado 3D",
    description: "",
    details: "Usamos 3D para sumar presencia, atmósfera y sofisticación. Es una capa visual poderosa cuando quieres vender innovación, premium o una propuesta más aspiracional.",
    benefits: ["Renders HD", "Texturas realistas", "Animaciones", "Iluminación profesional"],
    reverse: false,
    images: [{ src: "/imagenes-optim/servicios/modelado3D/inti-pintay", alt: "Modelado 3D", stackLayer: "tertiary" } as ImageStackImage],
    href: "/servicios",
    icon: <Box className="h-5 w-5" />,
  },
  {
    id: "campanas-digitales",
    title: "Campañas Digitales",
    description: "",
    details: "Gestionamos campañas en (Meta ads, Tiktok ads, Google ads), con integración directa a sus APIs desde nuestro CRM. para un mejor análisis de: métricas, conversiones y audiencias.",
    benefits: ["Meta Ads", "TikTok Ads", "Google Ads", "CRM propio", "API integrada"],
    reverse: true,
    images: [{ src: "/imagenes-optim/servicios/campañas/ads001", alt: "Campañas Digitales", stackLayer: "tertiary" } as ImageStackImage],
    href: "/servicios",
    icon: <TrendingUp className="h-5 w-5" />,
  },
];

export default function ServiciosContent({ className = "" }: ServiciosContentProps) {
  return (
    <section className={`relative overflow-hidden bg-[#0a0a0a] ${className}`}>
      <div className="relative mx-auto w-full max-w-7xl px-6 pt-20 pb-10 lg:px-10 lg:pt-24 lg:pb-12">
        <div className="mb-16 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-4 font-body text-[10px] uppercase tracking-[.34em] text-[#e9c893]">
              Servicios
            </p>
            <h2 className="font-display max-w-4xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
              Cinco servicios.
              <br />
              <span className="text-white/50">Una dirección visual clara.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#f4f1ea]/50 sm:text-base">
              Diseñamos experiencias digitales con criterio visual y estructura minimalista.
            </p>
          </div>
          <div className="lg:col-span-5 lg:pl-10" />
        </div>
      </div>

      <ServicesCarousel items={SERVICES_DATA} />
    </section>
  );
}
