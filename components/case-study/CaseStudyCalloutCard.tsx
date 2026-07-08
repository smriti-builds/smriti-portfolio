import type { CaseStudyCallout, CaseStudyCalloutType } from "@/types/case-study";
import type { IconType } from "react-icons";
import {
  MdOutlineLightbulb,
  MdOutlineSchedule,
  MdOutlineTrendingDown,
  MdOutlineTrendingUp,
} from "react-icons/md";
import {
  CASE_STUDY_ICON_CLASS,
  CASE_STUDY_ICON_SIZE,
} from "@/components/case-study/case-study-icons";

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
  const bodyText = typeof callout.body === "string" ? callout.body : null;
  const bulletItems = Array.isArray(callout.body) ? callout.body : null;
  const paragraphItems = bodyText
    ? bodyText
        .split(/\n\n+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : null;

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border border-neutral-200/70 bg-[#f9f9f9] p-6 md:rounded-[24px] md:p-8 ${
        layout === "featured" ? "lg:row-span-2" : ""
      }`}
    >
      <div
        className={`flex size-12 shrink-0 items-center justify-center rounded-full ${style.iconBg}`}
      >
        <Icon
          size={CASE_STUDY_ICON_SIZE}
          aria-hidden
          className={CASE_STUDY_ICON_CLASS}
        />
      </div>

      {callout.hideEyebrow ? null : (
        <p className="mt-5 font-instrument-sans text-xs font-medium uppercase tracking-[1.5px] text-[#525d6d] md:mt-6">
          {style.label}
        </p>
      )}

      <h3
        className={`type-callout-title font-instrument-serif font-normal text-text-primary ${
          callout.hideEyebrow ? "mt-6" : "mt-2"
        }`}
      >
        {callout.title}
      </h3>

      {bulletItems ? (
        <ul className="mt-4 flex flex-col gap-2 md:mt-6">
          {bulletItems.map((item) => (
            <li
              key={item}
              className="flex gap-3 font-instrument-sans text-[14px] font-normal leading-[22px] text-text-secondary md:text-[16px] md:leading-[24px]"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 flex flex-col gap-3 md:mt-6">
          {paragraphItems?.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="font-instrument-sans text-[14px] font-normal leading-[22px] text-text-secondary md:text-[16px] md:leading-[24px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </article>
  );
}
