"use client";

import Image from "next/image";
import { workPreviewFloaters } from "@/lib/content/work-preview-floaters";
import type { WorkProjectPreview } from "@/types/work";
import WorkPreviewFloater from "@/sections/work/WorkPreviewFloater";

/** Full composite — used for cards without separated Figma layers yet */
const previewImages: Record<WorkProjectPreview, string> = {
  "ai-commentary": "/Work/previews/ai-commentary.png",
  "padel-platform": "/Work/previews/padel-platform.png",
  checkout: "/Work/previews/checkout.png",
  "interview-scheduler": "/Work/previews/interview-scheduler.png",
};

/**
 * Cards with clean Figma layer separation (frame + mockup).
 * Figma 1086:18074 — ai-commentary background + phone mockup.
 */
const splitLayerVariants = new Set<WorkProjectPreview>(["ai-commentary"]);

const frameImages: Partial<Record<WorkProjectPreview, string>> = {
  "ai-commentary": "/Work/frames/ai-commentary.png",
};

const mockupImages: Partial<Record<WorkProjectPreview, string>> = {
  "ai-commentary": "/Work/mockups/ai-commentary.png",
};

/** Figma display size — 1060:14653 mask group */
const PREVIEW_DISPLAY_WIDTH = 617;

/** 3x retina exports from Figma (covers 3× DPR displays) */
const PREVIEW_INTRINSIC_WIDTH = 1850;
const PREVIEW_INTRINSIC_HEIGHT = 1200;

const PREVIEW_SIZES = `(max-width: 768px) 100vw, (max-width: 1440px) 50vw, ${PREVIEW_DISPLAY_WIDTH}px`;

const HOVER_TRANSITION =
  "transition-transform duration-[600ms] ease-out motion-safe:group-hover:scale-[1.02] motion-safe:group-hover:-translate-y-1";

/** Phone anchor for ai-commentary — center-x of device in 3× export */
const splitLayerTransformOrigin: Partial<Record<WorkProjectPreview, string>> = {
  "ai-commentary": "45% 100%",
};

type WorkProjectPreviewProps = {
  variant: WorkProjectPreview;
  backgroundColor: string;
  priority?: boolean;
  hoverOverlayLabel?: string;
};

export default function WorkProjectPreviewView({
  variant,
  backgroundColor,
  priority = false,
  hoverOverlayLabel,
}: WorkProjectPreviewProps) {
  const floaters = workPreviewFloaters[variant];
  const usesSplitLayers = splitLayerVariants.has(variant);

  return (
    <div
      className="group relative aspect-[616.5/400] w-full shrink-0 transform-gpu overflow-hidden rounded-[24px]"
      style={{ backgroundColor }}
    >
      {usesSplitLayers ? (
        <>
          {/* Static frame — bg, shadow, arrow (never swaps) */}
          <Image
            src={frameImages[variant]!}
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

          {/* Phone mockup — same asset at rest and on hover, only transform changes */}
          <Image
            src={mockupImages[variant]!}
            alt=""
            width={PREVIEW_INTRINSIC_WIDTH}
            height={PREVIEW_INTRINSIC_HEIGHT}
            sizes={PREVIEW_SIZES}
            quality={100}
            priority={priority}
            unoptimized
            className={`absolute inset-0 size-full object-cover backface-hidden will-change-transform ${HOVER_TRANSITION}`}
            style={{ transformOrigin: splitLayerTransformOrigin[variant] ?? "50% 100%" }}
            draggable={false}
          />
        </>
      ) : (
        <Image
          src={previewImages[variant]}
          alt=""
          width={PREVIEW_INTRINSIC_WIDTH}
          height={PREVIEW_INTRINSIC_HEIGHT}
          sizes={PREVIEW_SIZES}
          quality={100}
          priority={priority}
          className={`absolute inset-0 size-full origin-bottom object-cover ${HOVER_TRANSITION}`}
          draggable={false}
        />
      )}

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
