import type { ReactNode } from "react";
import type { CaseStudyMeta } from "@/types/case-study";
import CaseStudyImpactMetrics from "@/components/case-study/CaseStudyImpactMetrics";

type CaseStudySidebarProps = {
  meta: CaseStudyMeta;
  categories: string[];
  liveUrl?: string;
  className?: string;
};

function MetaGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-instrument-sans text-xs font-semibold uppercase tracking-[1.5px] text-[#525d6d]">
        {label}
      </p>
      <div className="font-instrument-sans text-[14px] leading-[22px] md:text-sm md:leading-6 text-text-secondary">
        {children}
      </div>
    </div>
  );
}

export default function CaseStudySidebar({
  meta,
  categories,
  liveUrl,
  className = "",
}: CaseStudySidebarProps) {
  return (
    <aside
      className={`flex flex-col gap-6 md:gap-8 lg:sticky lg:top-8 lg:self-start ${className}`}
    >
      <div className="flex flex-wrap gap-3 md:gap-4">
        {categories.map((category) => (
          <span
            key={category}
            className="shrink-0 rounded bg-[#f0f4fa] px-4 py-2 font-instrument-sans text-xs font-semibold uppercase tracking-[0.16px] text-[#525d6d]"
          >
            {category}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-8 rounded-2xl border border-neutral-200/80 bg-white p-5 md:p-6">
        <MetaGroup label="Duration">{meta.duration}</MetaGroup>
        <MetaGroup label="Status">
          <span className="inline-flex items-center gap-2">
            <span
              className="size-2 rounded-full bg-[#6b8f71]"
              aria-hidden
            />
            {meta.status}
          </span>
        </MetaGroup>
        {meta.impact ? (
          <MetaGroup label="Impact">
            <CaseStudyImpactMetrics impact={meta.impact} />
          </MetaGroup>
        ) : null}
        {meta.team?.length ? (
          <MetaGroup label="Team">
            <ul className="flex flex-col gap-1">
              {meta.team.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </MetaGroup>
        ) : null}
        {meta.role.length ? (
          <MetaGroup label="Role">
            <ul className="flex flex-col gap-1">
              {meta.role.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </MetaGroup>
        ) : null}
        <MetaGroup label="Tools">
          <ul className="flex flex-col gap-1">
            {meta.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </MetaGroup>
      </div>

      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-text-primary px-5 py-3 font-instrument-sans text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          View live site ↗
        </a>
      ) : null}
    </aside>
  );
}
