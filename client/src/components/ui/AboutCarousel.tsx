// client/src/components/AboutCarousel.tsx

import { useEffect, useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LCPImage } from "./LCPImage";

gsap.registerPlugin(ScrollTrigger);

interface AboutImage {
  src: string; // ruta base sin extensión ni tamaño (ej: /imagenes-optim/.../Desktop1)
  alt: string;
  width: number;
  height: number;
  sizes: string;
}

const aboutImages: AboutImage[] = [
  {
    src: "/imagenes-optim/quienes-somos/imagenes/carrusel/Desktop1",
    alt: "Mockup de sitio web moderno en pantalla de ordenador desarrollado por Zincel Agencia Digital",
    width: 1080,
    height: 1920,
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
  {
    src: "/imagenes-optim/quienes-somos/imagenes/carrusel/Desktop2",
    alt: "Equipo de desarrollo web colaborando en un proyecto digital en Zincel",
    width: 1920,
    height: 1080,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
  {
    src: "/imagenes-optim/quienes-somos/imagenes/carrusel/Desktop3",
    alt: "Sitio web optimizado para SEO y visible en resultados de Google, creado por Zincel",
    width: 1080,
    height: 1920,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
  {
    src: "/imagenes-optim/quienes-somos/imagenes/carrusel/Desktop4",
    alt: "Desarrollo de página web moderna con React, Vite y Tailwind CSS por Zincel",
    width: 1920,
    height: 1080,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
  {
    src: "/imagenes-optim/quienes-somos/imagenes/carrusel/Desktop5",
    alt: "Diseño web responsive adaptado perfectamente a dispositivos móviles por Zincel",
    width: 1080,
    height: 1920,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
  {
    src: "/imagenes-optim/quienes-somos/imagenes/carrusel/Desktop6",
    alt: "Diseño creativo y original de interfaz web desarrollado por Zincel Agencia Digital",
    width: 1920,
    height: 1080,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
  {
    src: "/imagenes-optim/quienes-somos/imagenes/carrusel/Desktop7",
    alt: "Comunicación cercana y efectiva con el cliente durante el desarrollo web en Zincel",
    width: 1080,
    height: 1920,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
  {
    src: "/imagenes-optim/quienes-somos/imagenes/carrusel/Desktop8",
    alt: "Diseño web premium y elegante con acabados de alta calidad por Zincel",
    width: 1920,
    height: 1080,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
];

export const AboutCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<Slider>(null);

  // Animación de entrada del carrusel completo cuando entra en viewport
  useEffect(() => {
    if (!carouselRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(carouselRef.current, {
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
      });
    }, carouselRef);

    return () => ctx.revert();
  }, []);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3200,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    pauseOnFocus: true,
    arrows: false, // Usamos botones personalizados
    fade: true, // Transición suave tipo fade (muy elegante)
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    className: "about-carousel-slider",
  };

  const isVertical = (image: AboutImage) => image.height > image.width;

  return (
    <div ref={carouselRef} className="relative w-full mx-auto px-4 py-8 md:py-12 lg:py-16 cols-5">
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[600px] overflow-hidden rounded-lg bg-transparent ">
        <Slider ref={sliderRef} {...settings}>
          {aboutImages.map((image, index) => (
            <div key={index} className="outline-none focus:outline-none">
              <div className="flex items-center justify-center px-4 md:px-8 h-[300px] md:h-[400px] lg:h-[600px]">
                <div
                  className={`
                    relative 
                    ${isVertical(image) ? "h-full w-auto max-w-full" : "w-full h-auto max-h-full"}
                  `}
                >
                  <LCPImage
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes={image.sizes}
                    priority={index === 0}
                    className={`
                      ${isVertical(image) ? "h-full w-auto" : "w-full h-auto"}
                      rounded-md shadow-2xl 
                      object-cover
                      transition-transform duration-700
                    `}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Botones de navegación personalizados 
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          aria-label="Imagen anterior"
          className="
            absolute 
            left-4 
            top-1/2 
            -translate-y-1/2 
            z-20 
            bg-white/90 
            hover:bg-white 
            backdrop-blur-sm 
            rounded-full 
            p-3 
            shadow-lg 
            transition-all 
            duration-300 
            hover:scale-110 
            active:scale-95 
            group
          "
        >
          <ChevronLeft className="w-6 h-6 text-neutral-800 group-hover:text-black transition-colors" />
        </button>

        <button
          onClick={() => sliderRef.current?.slickNext()}
          aria-label="Siguiente imagen"
          className="
            absolute 
            right-4 
            top-1/2 
            -translate-y-1/2 
            z-20 
            bg-white/90 
            hover:bg-white 
            backdrop-blur-sm 
            rounded-full 
            p-3 
            shadow-lg 
            transition-all 
            duration-300 
            hover:scale-110 
            active:scale-95 
            group
          "
        >
          <ChevronRight className="w-6 h-6 text-neutral-800 group-hover:text-black transition-colors" />
        </button>
        */}
      </div>

      {/* Los dots vienen incluidos con dots: true */}
      {/* Si quieres personalizarlos más, usa appendDots y customPaging */}
    </div>
  );
};
