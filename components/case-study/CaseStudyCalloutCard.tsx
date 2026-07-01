import type { CaseStudyCallout, CaseStudyCalloutType } from "@/types/case-study";
import type { IconType } from "react-icons";
import {
  MdOutlineLightbulb,
  MdOutlineSchedule,
  MdOutlineTrendingDown,
  MdOutlineTrendingUp,
} from "react-icons/md";

const ICON_SIZE = 24;

const CALLOUT_STYLES: Record<
  CaseStudyCalloutType,
  { label: string; iconBg: string; Icon: IconType }
> = {
  learning: {
    label: "Learning",
    iconBg: "bg-[#b3d7ff]",
    Icon: MdOutlineLightbulb,
  },
  hiccup: {
    label: "Hiccup",
    iconBg: "bg-[#f2d1e5]",
    Icon: MdOutlineTrendingDown,
  },
  decision: {
    label: "Decision",
    iconBg: "bg-[#98d8b1]",
    Icon: MdOutlineSchedule,
  },
  impact: {
    label: "Impact",
    iconBg: "bg-[#d4e4ff]",
    Icon: MdOutlineTrendingUp,
  },
};

type CaseStudyCalloutCardProps = {
  callout: CaseStudyCallout;
  layout?: "default" | "featured";
};

export default function CaseStudyCalloutCard({
  callout,
  layout = "default",
}: CaseStudyCalloutCardProps) {
  const style = CALLOUT_STYLES[callout.type];
  const Icon = style.Icon;

  return (
    <article
      className={`flex h-full flex-col rounded-[32px] border border-neutral-200/70 bg-[#f9f9f9] p-8 ${
        layout === "featured" ? "md:row-span-2" : ""
      }`}
    >
      <div
        className={`flex size-12 shrink-0 items-center justify-center rounded-full ${style.iconBg}`}
      >
        <Icon
          size={ICON_SIZE}
          aria-hidden
          className="shrink-0 text-text-primary"
        />
      </div>

      <p className="mt-6 font-instrument-sans text-xs font-medium uppercase tracking-[1.5px] text-[#525d6d]">
        {style.label}
      </p>

      <h3 className="mt-2 font-instrument-serif text-[28px] font-normal leading-[1.2] text-text-primary md:text-[32px]">
        {callout.title}
      </h3>

      <p className="mt-6 font-instrument-sans text-[16px] font-normal leading-[24px] text-text-secondary">
        {callout.body}
      </p>
    </article>
  );
}
