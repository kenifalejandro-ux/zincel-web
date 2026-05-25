// client/src/components/ui/LCPImage.tsx

import { ImgHTMLAttributes } from "react";

import { resolveLCPImageSources } from "./lcpImageSources";

interface LCPImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> {
  src: string; // Ej: "Hero/puerta-del-valle"
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  hoverZoom?: boolean;
  pictureClassName?: string;
}

export function LCPImage({
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
  priority = false,
  hoverZoom = false,
  pictureClassName = "block w-full h-full bg-black rounded-2xl overflow-hidden",
  ...rest
}: LCPImageProps) {
  const imageSources = resolveLCPImageSources(src);

  return (
    <picture className={pictureClassName}>
      {!imageSources.hasExplicitExtension && (
        <>
          {/* AVIF de SiteGround */}
          <source srcSet={imageSources.avifSrcSet} type="image/avif" sizes={sizes} />

          {/* WebP de SiteGround */}
          <source srcSet={imageSources.webpSrcSet} type="image/webp" sizes={sizes} />
        </>
      )}

      <img
        // Fallback JPG (o URL directa si ya trae extensión)
        src={imageSources.fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`
          ${hoverZoom ? "transition-transform duration-[1200ms] ease-out hover:scale-[1.02]" : ""}
          ${className} w-full h-full object-cover
        `}
        {...rest}
      />
    </picture>
  );
}
