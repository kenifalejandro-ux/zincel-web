/** client/src/components/hero/HeroHeaderVideos.tsx */

import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VideoPreview } from "../ui/VideoPreview";
import { useVideoInView } from "../ui/useVideoInView";
import { useTranslation } from "react-i18next";

const HeroHeaderVideos: React.FC = () => {
  const { t } = useTranslation();

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const videoRefs = {
    calera: useRef<HTMLVideoElement>(null),
    tiesto: useRef<HTMLVideoElement>(null),
    bkars: useRef<HTMLVideoElement>(null),
    inti: useRef<HTMLVideoElement>(null),
  };

  useVideoInView(videoRefs.calera, { rootMargin: "120px 0px", threshold: 0.1 });
  useVideoInView(videoRefs.tiesto, { rootMargin: "120px 0px", threshold: 0.1 });
  useVideoInView(videoRefs.bkars, { rootMargin: "120px 0px", threshold: 0.1 });
  useVideoInView(videoRefs.inti, { rootMargin: "120px 0px", threshold: 0.1 });

  const videos = [
    {
      key: "calera",
      ref: videoRefs.calera,
      src: "/videos-optim/hero/calera/parallax-calera.mp4",
      poster: "/imagenes-optim/poster/poster-calera/cantera001",
      title: "Calera Santa Isabel",
      category: t("heroHome.videos.calera.category"),
      description: t("heroHome.videos.calera.description"),
    },
    {
      key: "tiesto",
      ref: videoRefs.tiesto,
      src: "/videos-optim/hero/tiesto-coffee/animacion-cafe.mp4",
      poster: "/imagenes-optim/trabajos/imagenes/tiesto-coffee/branding/tiesto-coffee",
      title: "Tiesto Coffee",
      category: t("heroHome.videos.tiesto.category"),
      description: t("heroHome.videos.tiesto.description"),
    },
    {
      key: "bkars",
      ref: videoRefs.bkars,
      src: "/videos-optim/hero/bkars/bkars.mp4",
      poster: "/imagenes-optim/trabajos/imagenes/bkars/bkars",
      title: "BKARS",
      category: t("heroHome.videos.bkars.category"),
      description: t("heroHome.videos.bkars.description"),
    },
    {
      key: "inti",
      ref: videoRefs.inti,
      src: "/videos-optim/hero/inti-pintay/inti-pintay.mp4",
      poster: "/imagenes-optim/trabajos/imagenes/inti-pintay/inti-pintay",
      title: "Inti Pintay",
      category: t("heroHome.videos.inti.category"),
      description: t("heroHome.videos.inti.description"),
    },
  ];

  const visibleVideos = isSmallScreen ? videos.slice(0, 1) : videos;

  return (
    <section className="relative w-full bg-[#f3efe7] py-20 lg:py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="mb-10 text-2xl lg:text-4xl text-zinc-900 tracking-tight leading-tight">
          {t("heroHome.recentWork")}
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-6">
          {visibleVideos.map((v) => (
            <Link key={v.key} to="/portfolio" className="group block border-t border-black/10 pt-4">
              <div className="relative aspect-[16/9] overflow-hidden border border-black/10 bg-white/20">
                <VideoPreview
                  ref={v.ref}
                  src={v.src}
                  poster={v.poster}
                  autoPlay
                  preload="auto"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div className="pt-4">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">{v.category}</p>
                <p className="mt-2 text-base text-zinc-900 font-medium">{v.title}</p>
                <p className="mt-1 text-sm text-zinc-600 line-clamp-2">{v.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroHeaderVideos;
