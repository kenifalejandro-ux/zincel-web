/* client/src/components/ui/OptimizedVideo.tsx */

import React, { forwardRef, useEffect, useState } from "react";

interface OptimizedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
}

const VIDEO_EXTENSION_REGEX = /\.mp4(?:\?.*)?$/i;
const ASSETS_BASE = (import.meta.env.VITE_IMG_URL ?? "").replace(/\/+$/, "");

const pickVideoSuffix = (viewportWidth: number) => {
  if (viewportWidth <= 768) return "768";
  if (viewportWidth <= 1280) return "1280";
  return "1920";
};

export const OptimizedVideo = forwardRef<HTMLVideoElement, OptimizedVideoProps>(
  function OptimizedVideo(
    { src, poster, className = "", playsInline = true, muted = true, preload = "metadata", ...videoProps },
    ref
  ) {
    const normalizedSrc = src.trim();
    const isAbsoluteUrl = /^https?:\/\//i.test(normalizedSrc);
    const cleanPath = (isAbsoluteUrl ? normalizedSrc : normalizedSrc.replace(/^\/+/, "")).replace(
      VIDEO_EXTENSION_REGEX,
      ""
    );
    const fullBase = isAbsoluteUrl
      ? cleanPath
      : ASSETS_BASE
        ? `${ASSETS_BASE}/${cleanPath}`
        : `/${cleanPath}`;
    const [videoSrc, setVideoSrc] = useState(() => {
      if (typeof window === "undefined") {
        return `${fullBase}-1280.mp4`;
      }

      return `${fullBase}-${pickVideoSuffix(window.innerWidth)}.mp4`;
    });

    const posterUrl = poster
      ? /^https?:\/\//i.test(poster)
        ? poster
        : ASSETS_BASE
          ? `${ASSETS_BASE}/${poster.replace(/^\/+/, "")}`
          : poster
      : undefined;

    useEffect(() => {
      if (typeof window === "undefined") return;

      const updateVideoSrc = () => {
        setVideoSrc(`${fullBase}-${pickVideoSuffix(window.innerWidth)}.mp4`);
      };

      updateVideoSrc();
      window.addEventListener("resize", updateVideoSrc);

      return () => {
        window.removeEventListener("resize", updateVideoSrc);
      };
    }, [fullBase]);

    return (
      <video
        ref={ref}
        src={videoSrc}
        className={`h-full w-full object-cover ${className}`}
        poster={posterUrl}
        playsInline={playsInline}
        muted={muted}
        preload={preload}
        {...videoProps}
      >
        Tu navegador no soporta video.
      </video>
    );
  }
);

OptimizedVideo.displayName = "OptimizedVideo";
