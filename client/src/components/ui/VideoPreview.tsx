/**client/src/components/ui/VideoPreview.tsx**/

/** client/src/components/ui/VideoPreview.tsx */
"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { OptimizedVideo } from "./OptimizedVideo";
import { runWhenIdle } from "../../utils/idle";

interface VideoPreviewProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster: string;
}

const ASSETS_BASE = (import.meta.env.VITE_IMG_URL ?? "").replace(/\/+$/, "");

export const VideoPreview = forwardRef<HTMLVideoElement, VideoPreviewProps>(
  (
    {
      src,
      poster,
      className = "",
      autoPlay,
      loop = true,
      muted = true,
      onCanPlay,
      onLoadedData,
      playsInline = true,
      preload = "metadata",
      ...videoProps
    },
    ref
  ) => {
    const [shouldRender, setShouldRender] = useState(Boolean(autoPlay));
    const [isReady, setIsReady] = useState(false);
    const posterUrl = /^https?:\/\//i.test(poster)
      ? poster
      : ASSETS_BASE
        ? `${ASSETS_BASE}/${poster.replace(/^\/+/, "")}`
        : poster;

    useEffect(() => {
      if (autoPlay) {
        setShouldRender(true);
        return;
      }

      const cleanup = runWhenIdle(() => {
        setShouldRender(true);
      }, 180);

      return () => cleanup();
    }, [autoPlay]);

    const markReady = () => {
      setIsReady(true);
    };

    return (
      <div className={`relative h-full w-full overflow-hidden bg-zinc-200 ${className}`}>
        <img
          src={posterUrl}
          alt="Poster"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            isReady ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {shouldRender && (
          <OptimizedVideo
            ref={ref}
            src={src}
            poster={poster}
            className={`relative h-full w-full object-cover transition-opacity duration-700 ${
              isReady ? "opacity-100" : "opacity-0"
            }`}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            onCanPlay={(event) => {
              markReady();
              onCanPlay?.(event);
            }}
            onLoadedData={(event) => {
              markReady();
              onLoadedData?.(event);
            }}
            playsInline={playsInline}
            preload={preload}
            {...videoProps}
          />
        )}
      </div>
    );
  }
);

VideoPreview.displayName = "VideoPreview";
