/**client/src/components/hero/HeroCubeScene.tsx */

import { useEffect, useRef, useState } from "react";
import { initServicesSceneCore } from "../../utils/threeSceneServiceUtilsCore.js";

type HeroCubeSceneProps = {
  className?: string;
  theme?: "dark" | "light";
  delayMs?: number;
};

export function HeroCubeScene({
  className = "",
  theme = "light",
  delayMs = 700,
}: HeroCubeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMountScene, setShouldMountScene] = useState(false);

  useEffect(() => {
    const target = containerRef.current;
    if (!target || shouldMountScene) return;

    let timeoutId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          timeoutId = window.setTimeout(() => {
            setShouldMountScene(true);
          }, delayMs);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, [delayMs, shouldMountScene]);

  useEffect(() => {
    if (!shouldMountScene || !containerRef.current) return;

    let cleanup: (() => void) | null = null;
    let isActive = true;

    const mountScene = async () => {
      cleanup = await initServicesSceneCore(containerRef.current!, "hero", theme);

      if (!isActive && cleanup) {
        cleanup();
      }
    };

    mountScene().catch((error) => {
      console.error("Error cargando escena del cubo del hero:", error);
    });

    return () => {
      isActive = false;
      if (cleanup) cleanup();
    };
  }, [shouldMountScene, theme]);

  return (
    <div ref={containerRef} className={className}>
      {!shouldMountScene ? <div className="absolute inset-0 bg-white/15" aria-hidden /> : null}
    </div>
  );
}

export default HeroCubeScene;
