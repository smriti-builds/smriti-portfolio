"use client";

import Image from "next/image";
import { workPreviewFloaters } from "@/lib/content/work-preview-floaters";
import type { WorkProjectPreview } from "@/types/work";
import WorkPreviewFloater from "@/sections/work/WorkPreviewFloater";

/** Static layer — card background color + corner arrow + phone shadow */
const baseImages: Record<WorkProjectPreview, string> = {
  "ai-commentary": "/Work/base/ai-commentary.webp",
  "padel-platform": "/Work/base/padel-platform.webp",
  checkout: "/Work/base/checkout.webp",
  "interview-scheduler": "/Work/base/interview-scheduler.webp",
};

/** Zooming layer — phone / UI mockup only, transparent elsewhere */
const mockupImages: Record<WorkProjectPreview, string> = {
  "ai-commentary": "/Work/mockups/ai-commentary.webp",
  "padel-platform": "/Work/mockups/padel-platform.webp",
  checkout: "/Work/mockups/checkout.webp",
  "interview-scheduler": "/Work/mockups/interview-scheduler.webp",
};

/** Figma display size — 1060:14653 mask group */
const PREVIEW_DISPLAY_WIDTH = 617;

/** 3x retina exports from Figma (covers 3× DPR displays) */
const PREVIEW_INTRINSIC_WIDTH = 1850;
const PREVIEW_INTRINSIC_HEIGHT = 1200;

const PREVIEW_SIZES = `(max-width: 768px) 100vw, (max-width: 1440px) 50vw, ${PREVIEW_DISPLAY_WIDTH}px`;

type WorkProjectPreviewProps = {
  variant: WorkProjectPreview;
  backgroundColor: string;
  priority?: boolean;
  hoverOverlayLabel?: string;
};

/**
 * Three stacked layers so hover affects only the mockup, not the card frame:
 *  1. Static base  — bg color + corner arrow + shadow (never scales)
 *  2. Mockup       — phone/UI only, zooms from the bottom on hover so it stays
 *                    grounded to the static shadow instead of detaching
 *  3. Floaters     — decorative props, idle bounce
 */
export default function WorkProjectPreviewView({
  variant,
  backgroundColor,
  priority = false,
  hoverOverlayLabel,
}: WorkProjectPreviewProps) {
  const floaters = workPreviewFloaters[variant];

  return (
    <div
      className="group relative aspect-[616.5/400] w-full shrink-0 transform-gpu overflow-hidden rounded-[24px]"
      style={{ backgroundColor }}
    >
      {/* unoptimized: Next's optimizer re-encodes transparent WebP to JPEG,
          which drops the alpha channel and fills it white. Serve as-is. */}
      <Image
        src={baseImages[variant]}
        alt=""
        width={PREVIEW_INTRINSIC_WIDTH}
        height={PREVIEW_INTRINSIC_HEIGHT}
        sizes={PREVIEW_SIZES}
        quality={100}
        priority={priority}
        unoptimized
        className="absolute inset-0 size-full object-cover"
        draggable={false}
      />

      <Image
        src={mockupImages[variant]}
        alt=""
        width={PREVIEW_INTRINSIC_WIDTH}
        height={PREVIEW_INTRINSIC_HEIGHT}
        sizes={PREVIEW_SIZES}
        quality={100}
        priority={priority}
        unoptimized
        className="absolute inset-0 size-full origin-bottom object-cover transition-transform duration-[600ms] ease-out motion-safe:group-hover:scale-[1.05]"
        draggable={false}
      />

      {floaters.map((floater) => (
        <WorkPreviewFloater key={floater.src} floater={floater} />
      ))}

      {hoverOverlayLabel ? (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        >
          <span className="font-instrument-sans text-[16px] font-semibold text-white">
            {hoverOverlayLabel}
          </span>
        </div>
      ) : null}
    </div>
  );
}
