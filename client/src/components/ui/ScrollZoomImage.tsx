import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ScrollZoomImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export function ScrollZoomImage({
  src,
  alt = "Scroll zoom image",
  className = "",
}: ScrollZoomImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const element = imageRef.current;

    // Crear la animación de zoom con GSAP ScrollTrigger
    const scrollTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top bottom", // Cuando el top del elemento llega al bottom del viewport
        end: "bottom top", // Cuando el bottom del elemento llega al top del viewport
        scrub: 1, // Suaviza la animación siguiendo el scroll
        onUpdate: (self) => {
          // Calcular el progreso del scroll
          const progress = self.progress;

          // Cuando el elemento entra al viewport: progreso 0 -> 0.5 = scale 1 -> 1.2
          // Cuando el elemento sale del viewport: progreso 0.5 -> 1 = scale 1.2 -> 1
          let scale = 1;
          if (progress <= 0.5) {
            // Entrando al viewport
            scale = 1 + progress * 2 * 0.2; // De 1 a 1.2
          } else {
            // Saliendo del viewport
            scale = 1.2 - (progress - 0.5) * 2 * 0.2; // De 1.2 a 1
          }

          gsap.to(element.querySelector("img"), {
            scale: scale,
            duration: 0.1,
            ease: "power2.out",
          });
        },
      },
    });

    // Cleanup
    return () => {
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={imageRef} className={`relative w-[500px] h-[500px] ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}
