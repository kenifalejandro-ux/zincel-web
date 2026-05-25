// src/hooks/useImageOverlap.ts
import { useEffect, useRef, useCallback, useState } from "react";

type UseImageOverlapOptions = {
  targetElementId: string;
  debounceDelay?: number;
};

type OverlapState = {
  isDarkOverlapping: boolean;
  isLightOverlapping: boolean;
};

export function useImageOverlap({
  targetElementId,
  debounceDelay = 10,
}: UseImageOverlapOptions): OverlapState {
  const [overlapState, setOverlapState] = useState<OverlapState>({
    isDarkOverlapping: false,
    isLightOverlapping: false,
  });

  const debounceRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const darkImagesRef = useRef<HTMLElement[]>([]);
  const lightImagesRef = useRef<HTMLElement[]>([]);

  const collectImages = useCallback(() => {
    darkImagesRef.current = Array.from(document.querySelectorAll<HTMLElement>(".dark-image"));
    lightImagesRef.current = Array.from(document.querySelectorAll<HTMLElement>(".light-image"));
  }, []);

  const getOverlapState = useCallback((): OverlapState => {
    const target = document.getElementById(targetElementId);
    if (!target) {
      return { isDarkOverlapping: false, isLightOverlapping: false };
    }

    const targetRect = target.getBoundingClientRect();

    const darkImages = darkImagesRef.current;
    const lightImages = lightImagesRef.current;

    let isDarkOverlapping = false;
    let isLightOverlapping = false;

    // Dark images
    darkImages.forEach((img) => {
      const imgRect = img.getBoundingClientRect();
      if (
        targetRect.bottom > imgRect.top &&
        targetRect.top < imgRect.bottom &&
        targetRect.left < imgRect.right &&
        targetRect.right > imgRect.left
      ) {
        isDarkOverlapping = true;
      }
    });

    // Light images
    lightImages.forEach((img) => {
      const imgRect = img.getBoundingClientRect();
      if (
        targetRect.bottom > imgRect.top &&
        targetRect.top < imgRect.bottom &&
        targetRect.left < imgRect.right &&
        targetRect.right > imgRect.left
      ) {
        isLightOverlapping = true;
      }
    });

    return { isDarkOverlapping, isLightOverlapping };
  }, [targetElementId]);

  const runMeasure = useCallback(() => {
    const newState = getOverlapState();
    setOverlapState(newState);
  }, [getOverlapState]);

  const scheduleMeasure = useCallback(() => {
    if (debounceDelay > 0) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = window.setTimeout(() => {
        if (rafRef.current !== null) return;
        rafRef.current = window.requestAnimationFrame(() => {
          rafRef.current = null;
          runMeasure();
        });
      }, debounceDelay);
      return;
    }

    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      runMeasure();
    });
  }, [debounceDelay, runMeasure]);

  useEffect(() => {
    collectImages();
    scheduleMeasure();

    const handleScroll = () => {
      if (darkImagesRef.current.length === 0 && lightImagesRef.current.length === 0) {
        collectImages();
      }
      scheduleMeasure();
    };

    const handleResize = () => {
      collectImages();
      scheduleMeasure();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [collectImages, scheduleMeasure]);

  return overlapState;
}
