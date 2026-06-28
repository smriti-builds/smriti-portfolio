import type { WorkProjectPreview } from "@/types/work";

const previewImages: Record<WorkProjectPreview, string> = {
  "ai-commentary": "/Work/previews/ai-commentary.png",
  "padel-platform": "/Work/previews/padel-platform.png",
  checkout: "/Work/previews/checkout.png",
  "interview-scheduler": "/Work/previews/interview-scheduler.png",
};

type WorkProjectPreviewProps = {
  variant: WorkProjectPreview;
  backgroundColor: string;
  rounded?: boolean;
};

/** Figma 1060:14653+ — mask-group export includes corner arrow + cutout */
export default function WorkProjectPreviewView({
  variant,
  backgroundColor,
  rounded = true,
}: WorkProjectPreviewProps) {
  return (
    <div
      className={`relative aspect-[616.5/400] w-full shrink-0 overflow-hidden ${rounded ? "rounded-[24px]" : ""}`}
      style={{ backgroundColor }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={previewImages[variant]}
        alt=""
        width={617}
        height={400}
        decoding="async"
        className="block size-full object-cover"
      />
    </div>
  );
}
