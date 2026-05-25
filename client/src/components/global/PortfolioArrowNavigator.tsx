/**client/src/components/global/PortfolioarrowNavigator.tsx */

import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioCases } from "@/data/portfolioCases";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioArrowNavigator() {
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);

  const currentIndex = portfolioCases.findIndex(
    (c) => c.path.toLowerCase() === location.pathname.toLowerCase()
  );

  if (currentIndex === -1) return null;

  const prev = portfolioCases[(currentIndex - 1 + portfolioCases.length) % portfolioCases.length];
  const next = portfolioCases[(currentIndex + 1) % portfolioCases.length];

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
        className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-[#f7f1e7]/85 text-zinc-900 shadow-[0_18px_40px_rgba(20,20,20,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={() => navigate(next.path)}
        aria-label={`Ir a ${next.name}`}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-[#f7f1e7]/85 text-zinc-900 shadow-[0_18px_40px_rgba(20,20,20,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
