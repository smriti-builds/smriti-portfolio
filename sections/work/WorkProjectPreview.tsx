"use client";

import Image from "next/image";
import { workPreviewFloaters } from "@/lib/content/work-preview-floaters";
import type { WorkProjectPreview } from "@/types/work";
import WorkPreviewFloater from "@/sections/work/WorkPreviewFloater";

const previewImages: Record<WorkProjectPreview, string> = {
  "ai-commentary": "/Work/previews/ai-commentary.png",
  "padel-platform": "/Work/previews/padel-platform.png",
  checkout: "/Work/previews/checkout.png",
  "interview-scheduler": "/Work/previews/interview-scheduler.png",
};

/** Figma display size — 1060:14653 mask group */
const PREVIEW_DISPLAY_WIDTH = 617;

/** 3x retina exports from Figma download_assets (covers 3× DPR displays) */
const PREVIEW_INTRINSIC_WIDTH = 1850;
const PREVIEW_INTRINSIC_HEIGHT = 1200;

type WorkProjectPreviewProps = {
  variant: WorkProjectPreview;
  backgroundColor: string;
  priority?: boolean;
  hoverOverlayLabel?: string;
};

/**
 * Figma 1060:14653+ — CSS border-radius clip + animated floater overlays for
 * side decorative elements (ball, bag, receipt, etc.).
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
      className="group relative aspect-[616.5/400] w-full shrink-0 overflow-hidden rounded-[24px] [transform:translateZ(0)]"
      style={{ backgroundColor }}
    >
      <Image
        src={previewImages[variant]}
        alt=""
        width={PREVIEW_INTRINSIC_WIDTH}
        height={PREVIEW_INTRINSIC_HEIGHT}
        sizes={`(max-width: 768px) 100vw, (max-width: 1440px) 50vw, ${PREVIEW_DISPLAY_WIDTH}px`}
        quality={100}
        priority={priority}
        className="absolute inset-0 size-full object-cover"
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
          <span className="font-instrument-sans text-[28px] font-semibold text-white">
            {hoverOverlayLabel}
          </span>
        </div>
      ) : null}
    </div>
  );
}
