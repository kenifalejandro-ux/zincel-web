import type { ReactNode } from "react";
import { OptimizedImage } from "./OptimizedImage";
import { cn } from "./utils";

type VisibleCount = 1 | 2 | 3;
type StackLayer = "primary" | "secondary" | "tertiary";
export type ImageStackLayer = StackLayer;

export interface ImageStackImage {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  stackLayer?: StackLayer;
  stackClassName?: string;
  surfaceClassName?: string;
  imageClassName?: string;
  safeAreaClassName?: string;
}

export interface ImageStackBadge {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface ImageStackProps {
  images: ImageStackImage[];
  layout?: "stacked" | "inline";
  badge?: ImageStackBadge;
  className?: string;
  fullScreen?: boolean;
  imageClassName?: string;
  inlineCardClassName?: string;
  stackedLayoutOverrides?: Partial<Record<VisibleCount, ImageStackLayoutOverride>>;
}

interface StackSlot {
  className: string;
  layer: StackLayer;
}

interface StackLayout {
  stackHeight: string;
  slots: StackSlot[];
}

export interface ImageStackLayoutOverride {
  stackHeight?: string;
  slots?: Partial<Record<StackLayer, string>>;
}

const MAX_STACK_IMAGES = 3;

const STACKED_SIZES = "(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 520px";

const INLINE_SIZES = "(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 380px";
/**configirar amaño de página de servicios para mobiles y desktop*/
const INLINE_GRID_COLS: Record<VisibleCount, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2 sm:grid-cols-2",
  3: "grid-cols-3 sm:grid-cols-2 lg:grid-cols-3",
};

const DEFAULT_STACK_LAYER_ORDER: Record<VisibleCount, StackLayer[]> = {
  1: ["primary"],
  2: ["primary", "secondary"],
  3: ["primary", "secondary", "tertiary"],
};

const LAYER_MIN_COUNT: Record<StackLayer, VisibleCount> = {
  primary: 1,
  secondary: 2,
  tertiary: 3,
};

const NAMED_STACK_SLOT_CLASSES: Record<StackLayer, string> = {
  primary: "absolute left-[2%] top-[4%] h-[68%] w-[68%] z-10",
  secondary: "absolute left-[15%] bottom-[2%] h-[58%] w-[72%] z-20",
  tertiary: "absolute left-[9%] bottom-[4%] h-[28%] w-[82%] z-30",
};

const STACKED_LAYOUTS: Record<VisibleCount, StackLayout> = {
  1: {
    stackHeight: "h-[300px] sm:h-[340px] lg:h-[590px]",
    slots: [
      {
        className:
          "absolute left-1/2 top-1/2 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 z-20",
        layer: "primary",
      },
    ],
  },
  2: {
    stackHeight: "h-[360px] sm:h-[420px] lg:h-[300px]",
    slots: [
      {
        className: "absolute left-[2%] top-[4%] h-[58%] w-[68%] z-10",
        layer: "primary",
      },
      {
        className:
          "absolute left-1/2 top-1/2 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 z-20",
        layer: "secondary",
      },
    ],
  },
  3: {
    stackHeight: "h-[390px] sm:h-[440px] lg:h-[620px]",
    slots: [
      {
        className: NAMED_STACK_SLOT_CLASSES.primary,
        layer: "primary",
      },
      {
        className: NAMED_STACK_SLOT_CLASSES.secondary,
        layer: "secondary",
      },
      {
        className: NAMED_STACK_SLOT_CLASSES.tertiary,
        layer: "tertiary",
      },
    ],
  },
};

function toVisibleCount(imageCount: number): VisibleCount {
  if (imageCount <= 1) return 1;
  if (imageCount === 2) return 2;
  return 3;
}

function ImageOverlay() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 " />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/60" />
    </>
  );
}

function ImageSurface({
  children,
  className,
  safeAreaClassName,
}: {
  children: ReactNode;
  className?: string;
  safeAreaClassName?: string;
}) {
  return (
    <div className={cn("group relative h-full w-full overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 " />
      <div className="pointer-events-none absolute inset-0 " />
      <div className="pointer-events-none absolute inset-[10px] " />
      <div
        className={cn(
          "absolute inset-y-[clamp(0.9rem,3vw,1.6rem)] inset-x-[clamp(1.15rem,5vw,2.3rem)]",
          safeAreaClassName
        )}
      >
        <div className="relative h-full w-full">{children}</div>
      </div>
      <ImageOverlay />
    </div>
  );
}

function InlineImageCard({
  image,
  cardClassName,
  imageClassName,
  isSingleInlineCard,
}: {
  image: ImageStackImage;
  cardClassName?: string;
  imageClassName?: string;
  isSingleInlineCard?: boolean;
}) {
  const isPanoramicTertiary = isSingleInlineCard && image.stackLayer === "tertiary";

  return (
    <div
      className={cn(
        isPanoramicTertiary
          ? "h-[240px] md:h-[360px] lg:h-[680px]"
          : "h-[250px] sm:h-[290px] lg:h-[340px]",
        cardClassName
      )}
    >
      <ImageSurface
        className={cn("rounded-[1.8rem]", image.surfaceClassName)}
        safeAreaClassName={cn(
          isPanoramicTertiary ? "!inset-0" : undefined,
          image.safeAreaClassName
        )}
      >
        <OptimizedImage
          src={image.src}
          alt={image.alt}
          fill
          sizes={image.sizes ?? (isPanoramicTertiary ? "100vw" : INLINE_SIZES)}
          priority={image.priority}
          fit={isPanoramicTertiary ? "cover" : "contain"}
          className={cn(
            "transition-transform duration-700 group-hover:scale-[1.015]",
            imageClassName,
            image.imageClassName
          )}
        />
      </ImageSurface>
    </div>
  );
}

function StackedImageCard({
  image,
  slot,
  imageClassName,
  isSingleStackedCard,
}: {
  image: ImageStackImage;
  slot: StackSlot;
  imageClassName?: string;
  isSingleStackedCard?: boolean;
}) {
  const isPrimaryStackedFull = isSingleStackedCard && image.stackLayer === "primary";

  const isSecondaryStackedFull = isSingleStackedCard && image.stackLayer === "secondary";

  const isTertiaryStackedFull = isSingleStackedCard && image.stackLayer === "tertiary";

  const isFullBleedStacked =
    isPrimaryStackedFull || isSecondaryStackedFull || isTertiaryStackedFull;

  return (
    <div className={slot.className}>
      <ImageSurface
        className={cn("rounded-[2rem]", image.surfaceClassName)}
        safeAreaClassName={cn(
          isFullBleedStacked
            ? "!inset-0"
            : "inset-y-[clamp(1rem,3vw,1.75rem)] inset-x-[clamp(1.25rem,5.5vw,2.5rem)]",
          image.safeAreaClassName
        )}
      >
        <OptimizedImage
          src={image.src}
          alt={image.alt}
          fill
          sizes={image.sizes ?? STACKED_SIZES}
          priority={image.priority}
          fit={isFullBleedStacked ? "cover" : "contain"}
          className={cn(
            "transition-transform duration-700 group-hover:scale-[1.015]",
            imageClassName,
            image.imageClassName
          )}
        />
      </ImageSurface>
    </div>
  );
}

function StackBadge({ badge }: { badge: ImageStackBadge }) {
  return (
    <div className="absolute bottom-4 left-4 z-40 max-w-[220px]">
      <div className="flex items-start gap-3">
        {badge.icon ? (
          <div className="mt-0.5 flex h-9 w-9 items-center justify-center ">{badge.icon}</div>
        ) : null}

        <div className="min-w-0">
          <div className="text-lg font-semibold tracking-[-0.04em] text-zinc-900">
            {badge.value}
          </div>
          <p className="text-xs leading-5 text-zinc-600">{badge.label}</p>
        </div>
      </div>
    </div>
  );
}

export function ImageStack({
  images,
  layout = "stacked",
  badge,
  className = "",
  fullScreen = false,
  imageClassName,
  inlineCardClassName,
  stackedLayoutOverrides,
}: ImageStackProps) {
  const visibleImages = images.slice(0, MAX_STACK_IMAGES);
  const count = visibleImages.length;

  if (count === 0) return null;

  const visibleCount = toVisibleCount(count);

  if (layout === "inline") {
    const gridCols = INLINE_GRID_COLS[visibleCount];

    return (
      <div className={cn("grid gap-6", gridCols, className)}>
        {visibleImages.map((image) => (
          <InlineImageCard
            key={image.src}
            image={image}
            cardClassName={inlineCardClassName}
            imageClassName={imageClassName}
            isSingleInlineCard={visibleCount === 1}
          />
        ))}
      </div>
    );
  }

  const requestedLayers = visibleImages.map(
    (image, index) =>
      image.stackLayer ?? DEFAULT_STACK_LAYER_ORDER[visibleCount][index] ?? "tertiary"
  );

  const stackedLayoutPresetCount = toVisibleCount(
    Math.max(visibleCount, ...requestedLayers.map((layer) => LAYER_MIN_COUNT[layer]))
  );

  const stackedLayout = STACKED_LAYOUTS[stackedLayoutPresetCount];
  const stackedLayoutOverride = stackedLayoutOverrides?.[stackedLayoutPresetCount];

  const stackHeightClass = fullScreen
    ? "h-screen"
    : (stackedLayoutOverride?.stackHeight ?? stackedLayout.stackHeight);

  const slotsByLayer = Object.fromEntries(
    stackedLayout.slots.map((slot) => [slot.layer, slot])
  ) as Record<StackLayer, StackSlot>;

  const resolvedSlots = visibleImages
    .map((image, index) => {
      const layer = requestedLayers[index];
      const baseSlot = slotsByLayer[layer];

      if (!baseSlot) return null;

      const overrideSlotClass = stackedLayoutOverride?.slots?.[layer];

      return {
        image,
        slot: {
          ...baseSlot,
          layer,
          className: cn(overrideSlotClass ?? baseSlot.className, image.stackClassName),
        },
      };
    })
    .filter(Boolean) as {
    image: ImageStackImage;
    slot: StackSlot;
  }[];

  return (
    <div
      className={cn(
        "relative isolate w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px]",
        stackHeightClass,
        className
      )}
    >
      {resolvedSlots.map(({ image, slot }) => (
        <StackedImageCard
          key={`${image.src}-${slot.layer}`}
          image={image}
          slot={slot}
          imageClassName={imageClassName}
          isSingleStackedCard={visibleCount === 1}
        />
      ))}

      {badge ? <StackBadge badge={badge} /> : null}
    </div>
  );
}
