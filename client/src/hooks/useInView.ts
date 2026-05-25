// client/src/hooks/useInView.ts
// Hook para detectar cuando un elemento entra al viewport

import React, { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean; // Trigger solo una vez
}

export function useInView(
  ref: React.RefObject<Element | null>,
  options: UseInViewOptions = {}
): boolean {
  const [isInView, setIsInView] = useState(false);
  const hasTriggered = useRef(false);

  const { threshold = 0.25, rootMargin = "0px", once = false } = options;

  useEffect(() => {
    if (!ref.current) return;

    // Si ya fue disparado y once es true, no reobservar
    if (once && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          hasTriggered.current = true;

          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else {
          if (!once) {
            setIsInView(false);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, once]);

  return isInView;
}
