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
  rounded?: boolean;
};

/** Figma 1060:14653+ — mask-group export at 616.5×400 */
export default function WorkProjectPreviewView({
  variant,
  priority = false,
  rounded = true,
}: WorkProjectPreviewProps) {
  return (
    <div className="relative w-full shrink-0">
      <Image
        src={previewImages[variant]}
        alt=""
        width={617}
        height={400}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 617px"
        className={`h-auto w-full max-w-[616.5px] ${rounded ? "rounded-[24px]" : ""}`}
      />
    </div>
  );
}
