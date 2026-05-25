const SIZES = [768, 1280, 1920, 2560, 3840];
const EXTENSION_REGEX = /\.(avif|webp|jpe?g|png)$/i;
const IMG_BASE = import.meta.env.VITE_IMG_URL || import.meta.env.VITE_ASSETS_URL;

export type ResolvedLCPImageSources = {
  avifSrcSet: string;
  webpSrcSet: string;
  fallbackSrc: string;
  webpFallbackSrc: string;
  directSrc: string;
  hasExplicitExtension: boolean;
};

export function resolveLCPImageSources(src: string): ResolvedLCPImageSources {
  const baseHost = (IMG_BASE ?? "").replace(/\/+$/, "");
  const normalizedSrc = src.trim();
  const isAbsoluteUrl = /^https?:\/\//i.test(normalizedSrc);
  const directPath = normalizedSrc.replace(/^\/+/, "");
  const cleanPath = (isAbsoluteUrl ? normalizedSrc : directPath).replace(EXTENSION_REGEX, "");
  const hasExplicitExtension = EXTENSION_REGEX.test(normalizedSrc);

  const fullBase = isAbsoluteUrl
    ? cleanPath
    : baseHost
      ? `${baseHost}/${cleanPath}`
      : `/${cleanPath}`;
  const directSrc = isAbsoluteUrl
    ? normalizedSrc
    : baseHost
      ? `${baseHost}/${directPath}`
      : `/${directPath}`;
  const buildSrcSet = (ext: string) =>
    SIZES.map((size) => `${fullBase}-${size}.${ext} ${size}w`).join(", ");

  return {
    avifSrcSet: buildSrcSet("avif"),
    webpSrcSet: buildSrcSet("webp"),
    fallbackSrc: hasExplicitExtension ? directSrc : `${fullBase}.jpg`,
    webpFallbackSrc: hasExplicitExtension ? directSrc : `${fullBase}-1280.webp`,
    directSrc,
    hasExplicitExtension,
  };
}
