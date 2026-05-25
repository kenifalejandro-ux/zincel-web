// client/src/components/sections/BasePortfolioCarousel.tsx

import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LCPImage } from "../ui/LCPImage";

gsap.registerPlugin(ScrollTrigger);

export interface PortfolioItem {
  id: number;
  href: string;
  ariaLabel: string;
  image: {
    src: string;
    srcMobile?: string;
    alt: string;
    width: number;
    height: number;
    sizes: string;
  };
  overlay?: {
    h3?: string;
    p?: string;
    buttonText?: string;
  };
}

interface BasePortfolioCarouselProps {
  items: PortfolioItem[];
  title?: string;
  dotColors?: string[];
  fullHeight?: boolean;
  hideArrows?: boolean;
}

export function BasePortfolioCarousel({
  items,
  title = "Proyectos conceptuales que inspiran",
  dotColors,
  fullHeight = false,
  hideArrows = false,
}: BasePortfolioCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<Slider>(null); // Ref para controlar slickGoTo
  const [currentIndex, setCurrentIndex] = useState(0); // Para controlar dots activos

  // Sincroniza currentIndex cuando slick cambia slide
  const handleAfterChange = (index: number) => {
    setCurrentIndex(index);
  };

  // Animación GSAP de entrada
  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, element);

    return () => ctx.revert();
  }, []);

  const settings = {
    dots: false, // Desactivamos dots nativos, usamos custom abajo
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: !hideArrows,
    nextArrow: hideArrows ? <></> : <NextArrow />,
    prevArrow: hideArrows ? <></> : <PrevArrow />,
    afterChange: handleAfterChange, // Actualiza currentIndex
  };

  // Flechas custom
  function NextArrow(props: any) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/0 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Siguiente proyecto"
      >
        <ChevronRight className="w-6 h-6 text-zinc-800" />
      </button>
    );
  }

  function PrevArrow(props: any) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/0 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Proyecto anterior"
      >
        <ChevronLeft className="w-6 h-6 text-zinc-800" />
      </button>
    );
  }

  return (
    <div ref={carouselRef} className={fullHeight ? "relative h-screen  " : "py-16 lg:py-24"}>
      {!fullHeight && (
        <h2 className="text-4xl lg:text-5xl text-center mb-12 font-bold text-gray-900">{title}</h2>
      )}

      <div className={`relative bg-blackmx-auto ${fullHeight ? "w-full h-full" : "max-w-7xl"}`}>
        <Slider ref={sliderRef} {...settings}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className="relative group overflow-hidden cursor-pointer"
              onClick={() => (window.location.href = item.href)}
            >
              <div className={`relative ${fullHeight ? "h-screen" : "h-[400px] lg:h-[600px]"}`}>
                <LCPImage
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  sizes={item.image.sizes}
                  priority={index === 0}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 rounded-2xl"
                />

                {/* Gradiente inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/20 to-transparent pointer-events-none rounded-2xl" />

                {/* Overlay texto */}
                {item.overlay && (item.overlay.h3 || item.overlay.p) && (
                  <div className="absolute bottom-0 left-0 p-8 text-zinc-200">
                    {item.overlay.h3 && (
                      <h3 className="text-2xl lg:text-4xl font-bold mb-2">{item.overlay.h3}</h3>
                    )}
                    {item.overlay.p && (
                      <p className="text-lg lg:text-xl opacity-90">{item.overlay.p}</p>
                    )}
                  </div>
                )}

                {/* Botón en hover */}
                {item.overlay?.buttonText && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="text-zinc-800 text-xl lg:text-2xl px-8 py-4 border-2 border-white rounded-full backdrop-blur-sm">
                      {item.overlay.buttonText}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>

        {/* Dots modernos y personalizados (como tu original) */}
        <div
          className={`flex justify-center gap-3 ${
            fullHeight ? "absolute bottom-10 left-0 right-0 z-20" : "mt-8"
          }`}
        >
          {items.map((_, index) => {
            const activeColor = dotColors && dotColors[index] ? dotColors[index] : "bg-cyan-400";

            const isActive = index === currentIndex;

            return (
              <button
                key={index}
                onClick={() => {
                  sliderRef.current?.slickGoTo(index);
                  setCurrentIndex(index);
                }}
                className={`h-3 rounded-full transition-all duration-500 ${
                  isActive
                    ? `w-12 ${activeColor} shadow-lg`
                    : "w-3 bg-gray-400 hover:bg-gray-600 opacity-70"
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
