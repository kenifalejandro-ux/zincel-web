/**client/src/components/secctions/VideoParallaxHover.ts */

import type { RefObject } from "react";

type InitVideoEventsReturn = () => void;

export function initVideoEvents(
  videoRef: RefObject<HTMLVideoElement | null>,
  wrapperRef: RefObject<HTMLElement | null>,
  linkRef: RefObject<HTMLElement | null>,
  spinnerRef?: RefObject<HTMLElement | null>
): InitVideoEventsReturn {
  const video = videoRef.current;
  const wrapper = wrapperRef.current;
  const link = linkRef.current;

  if (!video || !wrapper || !link) {
    console.warn("⚠️ initVideoEvents: referencias de video/wrapper/link incompletas.");
    return () => {};
  }

  // Evita warning por parámetro no usado
  void spinnerRef;

  // 🚨 DESACTIVAR ZOOM Y PARALLAX
  const BASE_WRAPPER_SCALE = 1.0;
  const VIDEO_INITIAL_SCALE = 1.0;
  const MAX_WRAPPER_SCALE_ON_HOVER = 1.0;
  const PARALLAX_STRENGTH = 0;
  const TRANSITION_DURATION = "0.4s ease-out";

  void PARALLAX_STRENGTH;

  // Transformación de centrado
  const VIDEO_RESET_TRANSFORM = `scale(${VIDEO_INITIAL_SCALE}) translate(-50%, -50%)`;

  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.controls = false;

  /* -------------------------------------------------------------------------- */
  /* 🎨 ESTILOS INICIALES Y TRANSICIONES */
  /* -------------------------------------------------------------------------- */

  wrapper.style.transition = `transform ${TRANSITION_DURATION}`;
  video.style.transition = "opacity 0.3s ease-in";

  requestAnimationFrame(() => {
    wrapper.style.opacity = "1";
    wrapper.style.transform = `scale(${BASE_WRAPPER_SCALE})`;

    video.style.opacity = "1";
    video.style.position = "absolute";
    video.style.top = "50%";
    video.style.left = "50%";
    video.style.transform = VIDEO_RESET_TRANSFORM;
  });

  // Detectar si es un dispositivo táctil
  const isTouchDevice = window.matchMedia("(hover: none)").matches;

  // Si es tablet o móvil → reproducir automáticamente el video
  let touchTimeoutId: number | undefined;
  let tryPlay: (() => void) | null = null;

  if (isTouchDevice) {
    video.style.opacity = "1";

    tryPlay = () => {
      void video.play().catch(() => {});
    };

    video.addEventListener("loadedmetadata", tryPlay);

    touchTimeoutId = window.setTimeout(() => {
      tryPlay?.();
    }, 500);
  }

  /* -------------------------------------------------------------------------- */
  /* ✨ EFECTO HOVER: Solo Play/Pause y Opacidad */
  /* -------------------------------------------------------------------------- */

  const handleMouseEnter = (): void => {
    video.style.opacity = "1";
    void video.play().catch(() => {
      video.pause();
    });
    wrapper.style.transform = `scale(${MAX_WRAPPER_SCALE_ON_HOVER})`;
  };

  const handleMouseLeave = (): void => {
    video.style.opacity = "1";
    video.pause();
    video.currentTime = 0;
    wrapper.style.transform = `scale(${BASE_WRAPPER_SCALE})`;
  };

  const handleMouseMove = (): void => {
    // Intencionalmente vacío
  };

  /* -------------------------------------------------------------------------- */
  /* 🎧 LISTENERS Y CLEANUP */
  /* -------------------------------------------------------------------------- */

  link.addEventListener("mouseenter", handleMouseEnter);
  link.addEventListener("mouseleave", handleMouseLeave);
  link.addEventListener("mousemove", handleMouseMove);

  return () => {
    link.removeEventListener("mouseenter", handleMouseEnter);
    link.removeEventListener("mouseleave", handleMouseLeave);
    link.removeEventListener("mousemove", handleMouseMove);

    if (tryPlay) {
      video.removeEventListener("loadedmetadata", tryPlay);
    }

    if (touchTimeoutId !== undefined) {
      window.clearTimeout(touchTimeoutId);
    }

    video.pause();
  };
}
