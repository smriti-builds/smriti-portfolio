import type { CaseStudyFunnelMetric } from "@/types/case-study";

type CaseStudyResearchStatsProps = {
  stats: CaseStudyFunnelMetric[];
};

export default function CaseStudyResearchStats({
  stats,
}: CaseStudyResearchStatsProps) {
  return (
    <div className="mt-8 border-b border-neutral-200/80 pb-8 md:mt-10 md:pb-10">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12 md:gap-16 lg:gap-20">
        {stats.map((stat) => (
          <div
            key={`${stat.label}-${stat.value}`}
            className="flex min-w-0 flex-col gap-2 sm:flex-1"
          >
            <p className="font-instrument-sans text-sm leading-5 text-[#525d6d]">
              {stat.label}
            </p>
            <p className="font-instrument-sans text-[30px] font-semibold leading-none text-text-primary">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
