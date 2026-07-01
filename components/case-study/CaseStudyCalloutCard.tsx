import type { CaseStudyCallout, CaseStudyCalloutType } from "@/types/case-study";

const CALLOUT_STYLES: Record<
  CaseStudyCalloutType,
  { label: string; iconBg: string; Icon: () => React.JSX.Element }
> = {
  learning: {
    label: "Learning",
    iconBg: "bg-[#b3d7ff]",
    Icon: LearningIcon,
  },
  hiccup: {
    label: "Hiccup",
    iconBg: "bg-[#f2d1e5]",
    Icon: HiccupIcon,
  },
  decision: {
    label: "Decision",
    iconBg: "bg-[#98d8b1]",
    Icon: DecisionIcon,
  },
  impact: {
    label: "Impact",
    iconBg: "bg-[#d4e4ff]",
    Icon: ImpactIcon,
  },
};

type CaseStudyCalloutCardProps = {
  callout: CaseStudyCallout;
  layout?: "default" | "featured";
};

function LearningIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-text-primary"
    >
      <path
        d="M12 3v2M5.5 8.5 4 7M19.5 8.5 21 7M12 21v-2M8 14h8M10 18h4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M9 10a3 3 0 1 1 6 0c0 2-1.5 2.5-3 4.5S9 12 9 10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HiccupIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-text-primary"
    >
      <path
        d="M4 8l4 3-3 5h6l-3 5 6-8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DecisionIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-text-primary"
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 8v4l2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ImpactIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-text-primary"
    >
      <path
        d="M5 16l4-6 4 3 5-8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 19h14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CaseStudyCalloutCard({
  callout,
  layout = "default",
}: CaseStudyCalloutCardProps) {
  const style = CALLOUT_STYLES[callout.type];
  const { Icon } = style;

  return (
    <article
      className={`flex h-full flex-col rounded-[32px] bg-[#f9f9f9] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] ${
        layout === "featured" ? "md:row-span-2" : ""
      }`}
    >
      <div
        className={`flex size-12 shrink-0 items-center justify-center rounded-full ${style.iconBg}`}
      >
        <Icon />
      </div>

      <p className="mt-6 font-instrument-sans text-xs font-semibold uppercase tracking-[1.5px] text-[#525d6d]">
        {style.label}
      </p>

      <h3 className="mt-2 font-instrument-serif text-[28px] leading-[1.2] text-text-primary md:text-[32px]">
        {callout.title}
      </h3>

      <p className="mt-4 font-instrument-sans text-[18px] leading-[28px] text-text-secondary">
        {callout.body}
      </p>
    </article>
  );
}
