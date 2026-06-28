import type { WorkProjectPreview } from "@/types/work";
import AiCommentaryPreview from "@/sections/work/previews/AiCommentaryPreview";
import CheckoutPreview from "@/sections/work/previews/CheckoutPreview";
import InterviewSchedulerPreview from "@/sections/work/previews/InterviewSchedulerPreview";
import PadelPlatformPreview from "@/sections/work/previews/PadelPlatformPreview";

type WorkProjectPreviewProps = {
  variant: WorkProjectPreview;
};

export default function WorkProjectPreviewView({ variant }: WorkProjectPreviewProps) {
  switch (variant) {
    case "ai-commentary":
      return <AiCommentaryPreview />;
    case "padel-platform":
      return <PadelPlatformPreview />;
    case "checkout":
      return <CheckoutPreview />;
    case "interview-scheduler":
      return <InterviewSchedulerPreview />;
  }
}
