/**client/src/components/ui/useVideoInView.tsx */
//reproducción automatica dentro del viewport

/** client/src/components/ui/useVideoInView.tsx */
import { useEffect } from "react";

interface UseVideoInViewOptions extends IntersectionObserverInit {
  enabled?: boolean;
}

export const useVideoInView = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  { enabled = true, root = null, rootMargin = "0px", threshold = 0.15 }: UseVideoInViewOptions = {}
) => {
  const thresholdKey = Array.isArray(threshold) ? threshold.join(",") : `${threshold}`;

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let observer: IntersectionObserver | null = null;
    let rafId: number | null = null;
    let isCancelled = false;

    const playVideo = (video: HTMLVideoElement) => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          /* autoplay bloqueado */
        });
      }
    };

    const observeWhenReady = () => {
      if (isCancelled) return;

      const video = videoRef.current;

      if (!video) {
        rafId = window.requestAnimationFrame(observeWhenReady);
        return;
      }

      // Si no existe IntersectionObserver, intentamos reproducir directamente
      if (!("IntersectionObserver" in window)) {
        playVideo(video);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          const currentVideo = videoRef.current;
          if (!currentVideo) return;

          if (entry.isIntersecting) {
            playVideo(currentVideo);
          } else {
            currentVideo.pause();
          }
        },
        {
          root,
          rootMargin,
          threshold,
        }
      );

      observer.observe(video);
    };

    observeWhenReady();

    return () => {
      isCancelled = true;

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      const video = videoRef.current;

      if (observer && video) {
        observer.unobserve(video);
      }

      if (observer) {
        observer.disconnect();
      }
    };
  }, [enabled, root, rootMargin, thresholdKey, videoRef]);
};
