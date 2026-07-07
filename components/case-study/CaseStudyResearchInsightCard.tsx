import type { CaseStudyResearchInsight } from "@/types/case-study";

type CaseStudyResearchInsightCardProps = {
  insight: CaseStudyResearchInsight;
};

function SpeechBubbles() {
  return (
    <div className="relative mb-6 h-[88px] w-[148px]" aria-hidden>
      <div className="absolute left-0 top-0 rounded-[14px] rounded-bl-[4px] bg-[#9b8afb] px-3 py-1.5 font-instrument-sans text-[13px] font-medium text-white">
        Huh?
      </div>
      <div className="absolute left-[52px] top-[18px] z-10 rounded-[16px] rounded-bl-[4px] bg-[#ececff] px-4 py-2 font-instrument-sans text-[15px] font-semibold text-[#4a3f8f] shadow-[0_4px_14px_rgba(108,78,230,0.12)]">
        Wait...
      </div>
      <div className="absolute left-[6px] top-[52px] rounded-[14px] rounded-bl-[4px] bg-[#6c4ee6] px-3 py-1.5 font-instrument-sans text-[13px] font-medium text-white">
        Why?
      </div>
    </div>
  );
}

function CaseStudyResearchInsightCard({ insight }: CaseStudyResearchInsightCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:p-7">
      <SpeechBubbles />

      <blockquote className="font-instrument-serif text-[20px] font-normal leading-[26px] text-text-primary">
        <span>{insight.quoteRegular}</span>
        {insight.quoteItalic ? (
          <>
            {" "}
            <span className="italic">{insight.quoteItalic}</span>
          </>
        ) : null}
      </blockquote>
    </article>
  );
}

type CaseStudyResearchInsightsProps = {
  insights: CaseStudyResearchInsight[];
};

export default function CaseStudyResearchInsights({
  insights,
}: CaseStudyResearchInsightsProps) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-5">
      {insights.map((insight) => (
        <CaseStudyResearchInsightCard
          key={`${insight.quoteRegular}-${insight.quoteItalic ?? ""}`}
          insight={insight}
        />
      ))}
    </div>
  );
}
