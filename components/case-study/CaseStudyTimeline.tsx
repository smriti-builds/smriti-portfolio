import type { CaseStudyTimelineItem } from "@/types/case-study";

export default function CaseStudyTimeline({
  items,
}: {
  items: CaseStudyTimelineItem[];
}) {
  return (
    <ol className="flex flex-col gap-0">
      {items.map((item, index) => (
        <li key={`${item.date}-${item.title}`} className="relative flex gap-5 pb-8 last:pb-0">
          {index < items.length - 1 ? (
            <span
              className="absolute left-[11px] top-6 h-[calc(100%-12px)] w-px bg-neutral-200"
              aria-hidden
            />
          ) : null}
          <span className="relative z-10 mt-1 size-[22px] shrink-0 rounded-full border-2 border-text-primary bg-white" />
          <div className="flex min-w-0 flex-col gap-1 pt-0.5">
            <p className="font-instrument-sans text-xs font-semibold uppercase tracking-[1.5px] text-[#525d6d]">
              {item.date}
            </p>
            <p className="font-instrument-sans text-lg font-semibold text-text-primary">
              {item.title}
            </p>
            <p className="font-instrument-sans text-[18px] leading-[28px] text-text-secondary">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
