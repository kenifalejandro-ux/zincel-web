// client/src/components/ui/OptimizedImage.tsx

import type { CSSProperties, ReactEventHandler } from "react";

import { cn } from "./utils";

const SIZES = [768, 1280, 1920];
const EXTENSION_REGEX = /\.(avif|webp|jpe?g|png)(?:\?.*)?$/i;

// Traemos la URL de SiteGround desde el .env
const IMG_BASE = import.meta.env.VITE_IMG_URL;

interface OptimizedImageProps {
  src: string; // Ej: "Hero/banner-principal"
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  fit?: "cover" | "contain";
  style?: CSSProperties;
  onLoad?: ReactEventHandler<HTMLImageElement>;
  onError?: ReactEventHandler<HTMLImageElement>;
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  priority = false,
  fill = false,
  sizes,
  fit = "cover",
  style,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const imageClassName = cn(
    fill ? "absolute inset-0 h-full w-full" : "h-auto w-full",
    fit === "contain" ? "object-contain" : "object-cover",
    "object-center",
    className
  );
  const baseHost = (IMG_BASE ?? "").replace(/\/+$/, "");
  const normalizedSrc = src.trim();
  const isAbsoluteUrl = /^https?:\/\//i.test(normalizedSrc);
  const cleanPath = (isAbsoluteUrl ? normalizedSrc : normalizedSrc.replace(/^\/+/, "")).replace(
    EXTENSION_REGEX,
    ""
  );
  const directPath = normalizedSrc.replace(/^\/+/, "");
  const fullBase = isAbsoluteUrl
    ? cleanPath
    : baseHost
      ? `${baseHost}/${cleanPath}`
      : `/${cleanPath}`;
  const directUrl = isAbsoluteUrl
    ? normalizedSrc
    : baseHost
      ? `${baseHost}/${directPath}`
      : `/${directPath}`;
  const hasExplicitExtension = EXTENSION_REGEX.test(normalizedSrc);

  const buildSrcSet = (ext: string) =>
    SIZES.map((size) => `${fullBase}-${size}.${ext} ${size}w`).join(", ");

  if (isAbsoluteUrl) {
    return (
      <img
        src={directUrl}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={imageClassName}
        style={style}
        onLoad={onLoad}
        onError={onError}
        {...(sizes ? { sizes } : {})}
      />
    );
  }

  if (hasExplicitExtension) {
    return (
      <img
        src={directUrl}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={imageClassName}
        style={style}
        onLoad={onLoad}
        onError={onError}
        {...(sizes ? { sizes } : {})}
      />
    );
  }

  return (
    <picture className={fill ? "absolute inset-0 block h-full w-full" : "block"}>
      {/* AVIF de SiteGround */}
      <source type="image/avif" srcSet={buildSrcSet("avif")} {...(sizes ? { sizes } : {})} />

      {/* WEBP de SiteGround */}
      <source type="image/webp" srcSet={buildSrcSet("webp")} {...(sizes ? { sizes } : {})} />

      {/* IMG Fallback de SiteGround */}
      <img
        src={`${fullBase}.jpg`}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={imageClassName}
        style={style}
        onLoad={onLoad}
        onError={onError}
        {...(sizes ? { sizes } : {})}
      />
    </picture>
  );
}
