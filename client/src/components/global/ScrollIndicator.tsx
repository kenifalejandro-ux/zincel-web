import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollIndicator({ color = "text-black" }) {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!indicatorRef.current) return;

    gsap.to(indicatorRef.current, {
      opacity: 0,
      y: 20,
      ease: "power2.out",
      scrollTrigger: {
        trigger: document.body,
        start: "top+=60 top",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={indicatorRef} className={`flex flex-col items-center gap-3 ${color}`}>
      {/* Mouse */}
      <div className="relative w-6 h-10 border-2 border-current rounded-full">
        <motion.div
          className="absolute left-1/2 top-2 w-1 h-2 bg-current rounded-full -translate-x-1/2"
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Texto */}
      <motion.span
        className="text-sm opacity-100"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ________________
      </motion.span>
    </div>
  );
}
