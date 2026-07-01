import type { CaseStudyCallout, CaseStudyCalloutType } from "@/types/case-study";

const CALLOUT_STYLES: Record<
  CaseStudyCalloutType,
  { border: string; label: string }
> = {
  learning: {
    border: "border-l-[#6393f8]",
    label: "Learning",
  },
  hiccup: {
    border: "border-l-[#ac7f5e]",
    label: "Hiccup",
  },
  decision: {
    border: "border-l-[#6b8f71]",
    label: "Decision",
  },
  impact: {
    border: "border-l-text-primary",
    label: "Impact",
  },
};

export default function CaseStudyCalloutCard({
  callout,
}: {
  callout: CaseStudyCallout;
}) {
  const style = CALLOUT_STYLES[callout.type];

  return (
    <div
      className={`rounded-2xl border border-neutral-200/80 border-l-4 bg-white p-5 shadow-[0_8px_16px_rgba(0,0,0,0.03)] ${style.border}`}
    >
      <p className="font-inter text-xs font-semibold uppercase tracking-[1.5px] text-text-secondary">
        {style.label}
      </p>
      <p className="mt-2 font-instrument-sans text-base font-semibold text-text-primary">
        {callout.title}
      </p>
      <p className="mt-2 font-instrument-sans text-base leading-7 text-text-secondary">
        {callout.body}
      </p>
    </div>
  );
}
