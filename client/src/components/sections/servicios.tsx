/**client/src/components/section/servicios.tsx */
/**contenido del carrusel */
import { Code, Palette, Smartphone, Box, TrendingUp } from "lucide-react";
import type { CarouselServiceItem } from "../ui/ServicesCarousel";
import ServicesCarousel from "../ui/ServicesCarousel";
import { useTranslation } from "react-i18next";
import type { ImageStackImage } from "../ui/ImageStack";

interface ServiciosContentProps {
  className?: string;
}

type ServiceId = "desarrollo-web" | "branding" | "diseno-ui-ux" | "modelado-3d" | "campanas-digitales";

const SERVICE_STATIC: Record<ServiceId, { images: ImageStackImage[]; icon: React.ReactNode; href: string; reverse: boolean }> = {
  "desarrollo-web": {
    reverse: true,
    images: [{ src: "/imagenes-optim/quienes-somos/imagenes/conceptos/comunicacion-tension", alt: "Desarrollo Web", stackLayer: "tertiary" }],
    href: "/servicios/",
    icon: <Code className="h-5 w-5" />,
  },
  branding: {
    reverse: false,
    images: [{ src: "/imagenes-optim/servicios/branding/branding", alt: "Branding", stackLayer: "tertiary" }],
    href: "/servicios",
    icon: <Palette className="h-5 w-5" />,
  },
  "diseno-ui-ux": {
    reverse: true,
    images: [{ src: "/imagenes-optim/servicios/ui/wireframe-calera-boceto", alt: "Diseño UI/UX", stackLayer: "tertiary" }],
    href: "/servicios/",
    icon: <Smartphone className="h-5 w-5" />,
  },
  "modelado-3d": {
    reverse: false,
    images: [{ src: "/imagenes-optim/servicios/modelado3D/inti-pintay", alt: "Modelado 3D", stackLayer: "tertiary" }],
    href: "/servicios",
    icon: <Box className="h-5 w-5" />,
  },
  "campanas-digitales": {
    reverse: true,
    images: [{ src: "/imagenes-optim/servicios/campañas/ads001", 
    alt: "Campañas Digitales", stackLayer: "tertiary" }],
    href: "/servicios",
    icon: <TrendingUp className="h-5 w-5" />,
  },
};

interface TranslatedItem {
  id: string;
  title: string;
  description: string;
  details: string;
  benefits: string[];
}

export default function ServiciosContent({ className = "" }: ServiciosContentProps) {
  const { t } = useTranslation();

  const translatedItems = t("servicesCarousel.items", { returnObjects: true }) as TranslatedItem[];
  const servicesData: CarouselServiceItem[] = translatedItems.map((item) => ({
    ...item,
    ...(SERVICE_STATIC[item.id as ServiceId] ?? { reverse: false, images: [], href: "/servicios", icon: null }),
  }));

  const titleLines = t("servicesCarousel.titleLines", { returnObjects: true }) as string[];

  return (
    <section className={`py-24 lg:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-16 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
              {t("servicesCarousel.eyebrow")}
            </p>

            <h2 className="max-w-4xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-zinc-950 sm:text-5xl lg:text-7xl">
              {titleLines[0]}
              <br />
              {titleLines[1]}
            </h2>
            <p className="max-w-md text-sm leading-7 text-zinc-600 sm:text-base">
              {t("servicesCarousel.description")}
            </p>
          </div>

          <div className="lg:col-span-5 lg:pl-10"></div>
        </div>

        <ServicesCarousel items={servicesData} />
      </div>
    </section>
  );
}
