import type { CaseStudyFallbackRules as FallbackRulesData } from "@/types/case-study";

type CaseStudyFallbackRulesProps = {
  rules: FallbackRulesData;
};

export default function CaseStudyFallbackRules({
  rules,
}: CaseStudyFallbackRulesProps) {
  return (
    <div className="mt-6 w-full md:mt-8">
      <div className="rounded-[20px] border border-neutral-200/80 bg-white p-5 md:rounded-[24px] md:p-8">
        <h3 className="font-instrument-serif text-[22px] font-normal leading-7 text-text-primary md:text-[26px] md:leading-8">
          {rules.title}
        </h3>
        {rules.intro ? (
          <p className="mt-3 font-instrument-sans text-[14px] font-medium leading-[22px] text-[#525d6d] md:mt-4 md:text-[16px] md:leading-[24px]">
            {rules.intro}
          </p>
        ) : null}

        <div className="mt-5 divide-y divide-neutral-200/80 border-t border-neutral-200/80 md:mt-6">
          {rules.items.map((item) => (
            <div
              key={`${item.condition}-${item.fallback}`}
              className="grid grid-cols-1 gap-3 py-4 md:grid-cols-[minmax(0,1.1fr)_16px_minmax(0,1fr)] md:items-center md:gap-5 md:py-5"
            >
              <div className="min-w-0">
                <p className="font-instrument-sans text-[11px] font-medium uppercase tracking-[1.4px] text-[#8A93A3]">
                  If
                </p>
                <p className="mt-1.5 font-instrument-sans text-[14px] font-semibold leading-[22px] text-text-primary md:text-[15px] md:leading-6">
                  {item.condition}
                </p>
              </div>

              <div
                className="hidden items-center justify-center md:flex"
                aria-hidden
              >
                <span className="text-[14px] leading-none text-[#C8CDD5]">→</span>
              </div>

              <div className="min-w-0 border-l border-neutral-200/80 pl-4 md:border-l-0 md:pl-0">
                <p className="font-instrument-sans text-[11px] font-medium uppercase tracking-[1.4px] text-[#8A93A3]">
                  Then
                </p>
                <p className="mt-1.5 font-instrument-sans text-[14px] font-semibold leading-[22px] text-text-primary md:text-[15px] md:leading-6">
                  {item.fallback}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
