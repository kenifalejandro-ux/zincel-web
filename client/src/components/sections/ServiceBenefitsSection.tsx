/**client/src/components/sections/ServiceBenefitsSection.tsx */

import { type ReactNode, useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "../../hooks/useInView";
import { ImageStack } from "../ui/ImageStack";
import { OptimizedImage } from "../ui/OptimizedImage";
import { VideoPreview } from "../ui/VideoPreview";
import { useVideoInView } from "../ui/useVideoInView";

interface SectionSEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
}

interface ServiceBenefit {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  videoSrc?: string;
  videoPoster?: string;
  videoAlt?: string;
}

export interface ServiceBenefitsSectionProps {
  seo?: SectionSEOConfig;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  whatsappText: string;
  reverse?: boolean;
  benefitsTitle?: string;
  benefitsDescription: string;
  benefits: ServiceBenefit[];
  galleryLayout?: "cards" | "viewport";
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type BenefitGalleryMedia =
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      alt: string;
    };

function getMediaGridCols(count: number, layout: ServiceBenefitsSectionProps["galleryLayout"]) {
  if (layout !== "viewport") {
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  }

  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
}

function BenefitGalleryCard({
  item,
  priority = false,
}: {
  item: BenefitGalleryMedia;
  priority?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldRenderVideo = useInView(cardRef, {
    threshold: 0.15,
  });

  useVideoInView(videoRef, {
    enabled: item.type === "video" && shouldRenderVideo,
    threshold: 0.15,
  });

  return (
    <div
      ref={cardRef}
      className="relative h-[250px] overflow-hidden rounded-[1.8rem] border border-black/10 bg-[#f3efe7] sm:h-[290px] lg:h-[340px]"
    >
      {item.type === "video" ? (
        shouldRenderVideo ? (
          <VideoPreview
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload={priority ? "metadata" : "none"}
            controls={false}
          />
        ) : item.poster ? (
          <OptimizedImage
            src={item.poster}
            alt={item.alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 380px"
            className="transition-opacity duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-[#e8e1d5]" aria-hidden />
        )
      ) : (
        <OptimizedImage
          src={item.src}
          alt={item.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 380px"
          className="transition-transform duration-700 hover:scale-[1.015]"
        />
      )}
    </div>
  );
}

export default function ServiceBenefitsSection(props: ServiceBenefitsSectionProps) {
  const sectionTitle = props.benefitsTitle?.trim() || props.title?.trim() || "Beneficios";

  const benefitGalleryMedia = props.benefits
    .filter((benefit) => Boolean(benefit.videoSrc || benefit.image))
    .slice(0, 3)
    .map<BenefitGalleryMedia>((benefit) =>
      benefit.videoSrc
        ? {
            type: "video",
            src: benefit.videoSrc,
            poster: benefit.videoPoster,
            alt: benefit.videoAlt ?? benefit.title,
          }
        : {
            type: "image",
            src: benefit.image ?? "",
            alt: benefit.imageAlt ?? benefit.title,
          }
    );

  const benefitGalleryImages = props.benefits
    .filter((benefit) => Boolean(benefit.image))
    .slice(0, 3)
    .map((benefit) => ({
      src: benefit.image ?? "",
      alt: benefit.imageAlt ?? benefit.title,
      surfaceClassName: "rounded-[1.8rem] border border-black/10 bg-[#f3efe7]",
      safeAreaClassName: "!inset-0",
      imageClassName: "!object-cover",
    }));

  const hasGalleryVideo = benefitGalleryMedia.some((item) => item.type === "video");
  const hasGalleryImages = benefitGalleryImages.length > 0;
  const mediaGridCols = getMediaGridCols(benefitGalleryMedia.length, props.galleryLayout);

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className={`space-y-5 ${props.reverse ? "lg:order-2" : ""}`}>
            {props.eyebrow ? (
              <FadeIn>
                <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                  {props.eyebrow}
                </p>
              </FadeIn>
            ) : null}

            <h2 className="text-4xl leading-[0.98] tracking-[-0.04em] text-zinc-900 lg:text-5xl">
              {sectionTitle}
            </h2>

            <FadeIn delay={0.1}>
              <p className="max-w-xl text-base leading-7 text-zinc-600 lg:text-lg">
                {props.benefitsDescription}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} className={props.reverse ? "lg:order-1" : ""}>
            <div className="space-y-4">
              {hasGalleryVideo ? (
                <div className="rounded-[2rem] border border-black/10 bg-[#faf7f2] p-2 sm:p-2">
                  <div className={`grid gap-2 ${mediaGridCols}`}>
                    {benefitGalleryMedia.map((item, index) => (
                      <BenefitGalleryCard
                        key={`${item.type}-${item.src}-${index}`}
                        item={item}
                        priority={index === 0}
                      />
                    ))}
                  </div>
                </div>
              ) : hasGalleryImages ? (
                <div className="rounded-[2rem] border border-black/10 bg-[#faf7f2] p-2 sm:p-2">
                  <ImageStack layout="inline" images={benefitGalleryImages} className="gap-1" />
                </div>
              ) : null}
            </div>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {props.benefits.map((benefit, index) => (
            <FadeIn key={`${benefit.title}-${index}`} delay={0.05 * index} className="h-full">
              <article className="flex h-full flex-col rounded-[1.75rem] border border-black/10 bg-[#faf8f3] p-6">
                <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-400">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-2xl leading-tight tracking-[-0.03em] text-zinc-950">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-zinc-600">{benefit.description}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
