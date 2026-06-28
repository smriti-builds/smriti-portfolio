import Image from "next/image";
import type { WorkProjectPreview } from "@/types/work";

const previewImages: Record<WorkProjectPreview, string> = {
  "ai-commentary": "/Work/previews/ai-commentary.png",
  "padel-platform": "/Work/previews/padel-platform.png",
  checkout: "/Work/previews/checkout.png",
  "interview-scheduler": "/Work/previews/interview-scheduler.png",
};

type WorkProjectPreviewProps = {
  variant: WorkProjectPreview;
  priority?: boolean;
};

/** Figma 1060:14638 — exported mask-group previews at 616.5×400 */
export default function WorkProjectPreviewView({
  variant,
  priority = false,
}: WorkProjectPreviewProps) {
  return (
    <div className="relative aspect-[616.5/400] w-full shrink-0 overflow-hidden rounded-[24px]">
      <Image
        src={previewImages[variant]}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 616px"
        className="object-cover"
      />
    </div>
  );
}
