/**client/src/components/ui/OptimizedModel.ts */

const MODEL_BASE = import.meta.env.VITE_MODEL_URL ?? import.meta.env.VITE_IMG_URL;

export interface OptimizedModelOptions {
  src: string;
}

export function resolveModelUrl({ src }: OptimizedModelOptions): string {
  const baseHost = (MODEL_BASE ?? "").replace(/\/+$/, "");
  const normalizedSrc = src.trim();

  if (!normalizedSrc) return "";

  const isAbsoluteUrl = /^(https?:\/\/|data:|blob:)/i.test(normalizedSrc);
  const isBundledAsset =
    normalizedSrc.startsWith("/assets/") ||
    normalizedSrc.startsWith("assets/") ||
    normalizedSrc.startsWith("/@fs/") ||
    normalizedSrc.startsWith("@fs/") ||
    normalizedSrc.startsWith("/@id/") ||
    normalizedSrc.startsWith("@id/") ||
    normalizedSrc.startsWith("/src/") ||
    normalizedSrc.startsWith("src/") ||
    normalizedSrc.includes("?import") ||
    normalizedSrc.includes("&import") ||
    normalizedSrc.includes("?url") ||
    normalizedSrc.includes("&url");

  if (isAbsoluteUrl || isBundledAsset) return normalizedSrc;

  const cleanPath = normalizedSrc.replace(/^\/+/, "");
  const [pathname, search = ""] = cleanPath.split("?");

  const hasExplicitExtension = /\.(glb|gltf)$/i.test(pathname);
  const finalPath = hasExplicitExtension ? pathname : `${pathname}.glb`;
  const finalSrc = search ? `${finalPath}?${search}` : finalPath;

  return baseHost ? `${baseHost}/${finalSrc}` : `/${finalSrc}`;
}
