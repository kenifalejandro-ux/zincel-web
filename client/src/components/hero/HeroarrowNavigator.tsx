/**client/src/components/global/HeroarrowNavigator.tsx */

import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrincipalCase } from "../../data/PrincipalCase";

gsap.registerPlugin(ScrollTrigger);

export function HeroarrowNavigator() {
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);

  const currentIndex = PrincipalCase.findIndex(
    (c) => c.path.toLowerCase() === location.pathname.toLowerCase()
  );

  if (currentIndex === -1) return null;

  const current = PrincipalCase[currentIndex];
  const prev = PrincipalCase[(currentIndex - 1 + PrincipalCase.length) % PrincipalCase.length];
  const next = PrincipalCase[(currentIndex + 1) % PrincipalCase.length];

  useEffect(() => {
    if (!navRef.current) return;

    const tween = gsap.to(navRef.current, {
      opacity: 0,
      y: 24,
      ease: "power2.out",
      scrollTrigger: {
        trigger: document.body,
        start: "top+=120 top",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [location.pathname]);

  return (
    <div ref={navRef} className="fixed bottom-8 right-8 flex gap-4 z-40">
      {/* Prev */}
      <button
        onClick={() => navigate(prev.path)}
        aria-label={`Ir a ${prev.name}`}
        className={`w-14 h-14 rounded-full
          bg-white/10 backdrop-blur-lg
          flex items-center justify-center
          ${current.arrowColor}
          hover:bg-white/20
          hover:scale-110
          transition-all duration-300`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={() => navigate(next.path)}
        aria-label={`Ir a ${next.name}`}
        className={`w-14 h-14 rounded-full
          bg-white/10 backdrop-blur-lg
          flex items-center justify-center
          ${current.arrowColor}
          hover:bg-white/20
          hover:scale-110
          transition-all duration-300`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
