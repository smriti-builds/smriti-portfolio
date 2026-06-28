import Image from "next/image";
import type { WorkProjectPreview } from "@/types/work";

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
  rounded?: boolean;
  priority?: boolean;
};

/**
 * Figma 1060:14653+ — always clips with CSS border-radius (crisp, resolution-
 * independent) rather than relying on Figma's anti-aliased mask edges baked
 * into the PNG. translateZ(0) forces GPU compositing so overflow-hidden
 * reliably clips children in Chrome.
 */
export default function WorkProjectPreviewView({
  variant,
  backgroundColor,
  priority = false,
}: Omit<WorkProjectPreviewProps, "rounded">) {
  return (
    <div
      className="relative aspect-[616.5/400] w-full shrink-0 overflow-hidden rounded-[24px] [transform:translateZ(0)]"
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
    </div>
  );
}
