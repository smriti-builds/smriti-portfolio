import type { CaseStudyFunnelMetric } from "@/types/case-study";

type CaseStudyFunnelStripProps = {
  metrics: CaseStudyFunnelMetric[];
};

export default function CaseStudyFunnelStrip({
  metrics,
}: CaseStudyFunnelStripProps) {
  const desktopGridClass = metrics.length === 5 ? "md:grid-cols-5" : "md:grid-cols-4";

  return (
    <div className="mt-6 w-full overflow-hidden rounded-[20px] bg-[#F5F5F5] md:mt-8 md:rounded-[24px]">
      <div className={`grid grid-cols-2 ${desktopGridClass}`}>
        {metrics.map((metric, index) => (
          <div
            key={`${metric.label}-${metric.value}`}
            className={`flex flex-col gap-2 px-5 py-6 md:gap-3 md:px-8 md:py-8 ${
              index > 0 ? "md:border-l md:border-[#E7E7E7]" : ""
            } ${index % 2 === 1 ? "border-l border-[#E7E7E7] md:border-l" : ""} ${
              index >= 2 ? "border-t border-[#E7E7E7] md:border-t-0" : ""
            }`}
          >
            <p className="font-instrument-sans text-[28px] font-semibold leading-none tracking-[-0.02em] text-text-primary md:text-[32px]">
              {metric.value}
            </p>
            <p className="font-instrument-sans text-[13px] leading-5 text-[#525d6d] md:text-[14px] md:leading-[22px]">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
