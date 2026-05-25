// src/components/sections/ThreeWrapperService.tsx
import { useEffect, useRef } from "react";

interface ThreeWrapperServiceProps {
  containerId?: string;
  className?: string;
  sectionClass?: string;
  preload?: boolean;

  // NUEVA PROP: solo para controlar el tema visual (cubo y luces)
  theme?: "dark" | "light"; // por defecto "light" o lo que prefieras
}

export default function ThreeWrapperService({
  containerId = "three-container-service",
  className = "three-container-service",
  sectionClass = "default",
  preload = false,
  theme = "light", // por defecto claro
}: ThreeWrapperServiceProps) {
  const cleanupRef = useRef<(() => void) | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadedRef = useRef<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    let rafId: number | null = null;

    const loadScene = async () => {
      if (loadedRef.current || !isMounted) return;
      loadedRef.current = true;

      try {
        const mod = await import(
          /* webpackChunkName: "three-services" */ "../../utils/threeSceneServiceUtilsCore.js"
        );
        const container = document.getElementById(containerId);
        if (container && isMounted && mod?.initServicesSceneCore) {
          // Solo pasamos el theme (dark/light)
          cleanupRef.current = await mod.initServicesSceneCore(container, sectionClass, theme);
        }
      } catch (err) {
        console.error("Error cargando escena de servicios:", err);
      }
    };

    rafId = requestAnimationFrame(() => {
      if (!isMounted) return;

      if (import.meta.env.DEV || preload) {
        loadScene();
        return;
      }

      const container = document.getElementById(containerId);
      if (container && "IntersectionObserver" in window) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                loadScene();
                observerRef.current?.disconnect();
              }
            });
          },
          {
            root: null,
            rootMargin: "200px",
            threshold: 0.05,
          }
        );

        observerRef.current.observe(container);
      } else {
        setTimeout(() => loadScene(), 1000);
      }
    });

    return () => {
      isMounted = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      observerRef.current?.disconnect();

      if (cleanupRef.current) {
        try {
          cleanupRef.current();
        } catch (err) {
          console.warn("Error en cleanup 3D (service)", err);
        }
      }
    };
  }, [containerId, sectionClass, preload, theme]); // theme en dependencias

  return (
    <div className={`three-wrapper ${className}`}>
      <div
        id={containerId}
        className="three-container"
        style={{
          minHeight: "auto",
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
