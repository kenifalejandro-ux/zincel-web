// client/src/components/sections/PrecioPortfolioCarousel.tsx

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
}

interface PrecioPortfolioCarouselProps {
  items: PortfolioItem[];
  title?: string;
  dotColors?: string[];
  fullHeight?: boolean;
  hideArrows?: boolean;
}

export function PrecioPortfolioCarousel({
  items,
  title = "Consulte Nuestros planes de precios",
  dotColors,
  fullHeight = false,
  hideArrows = false,
}: PrecioPortfolioCarouselProps) {
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
        duration: 5,
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
    autoplaySpeed: 2000,
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
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/0 hover:bg-black/20 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
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
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/0 hover:bg-black/20 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Proyecto anterior"
      >
        <ChevronLeft className="w-6 h-6 text-zinc-800" />
      </button>
    );
  }

  return (
    <div ref={carouselRef}>
      <Slider ref={sliderRef} {...settings}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative group overflow-hidden"
            onClick={() => (window.location.href = item.href)}
          >
            <div
              className={`relative ${
                fullHeight ? "h-screen" : "h-[240px] sm:h-[300px] md:h-[360px] lg:h-[500px]"
              }`}
            >
              <LCPImage
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes={item.image.sizes}
                priority={index === 0}
                className="w-full h-full object-cover bg-black transition-transform duration-1000 group-hover:scale-105 rounded-2xl"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
