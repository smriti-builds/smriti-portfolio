import { Fragment } from "react";
import type { CaseStudyFlowChangeRow } from "@/types/case-study";

type CaseStudyFlowChangesProps = {
  rows: CaseStudyFlowChangeRow[];
};

const ROW_TONE_STYLES = {
  pre: {
    connector: "text-[#f15b40]",
  },
  post: {
    connector: "text-[#22a559]",
  },
} as const;

function renderInlineStrongText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

export default function CaseStudyFlowChanges({ rows }: CaseStudyFlowChangesProps) {
  return (
    <div className="mt-6 w-full rounded-[20px] bg-[#F5F5F5] p-5 md:mt-8 md:rounded-[24px] md:p-8">
      <div className="flex flex-col gap-10 rounded-[18px] bg-white px-4 py-8 md:gap-14 md:rounded-[20px] md:px-5 md:py-10">
        {rows.map((row, rowIndex) => {
          const tone = row.tone ?? (rowIndex === 0 ? "pre" : "post");
          const style = ROW_TONE_STYLES[tone];

          return (
            <article key={`${row.label}-${rowIndex}`}>
              <div className="flex flex-col gap-4 md:gap-5">
                <p className="font-instrument-serif text-[16px] font-normal uppercase tracking-[0.04em] text-text-primary md:text-[18px]">
                  {row.label}
                </p>
                {row.note ? (
                  <p className="font-instrument-sans text-[14px] font-medium text-text-primary md:text-[16px]">
                    {renderInlineStrongText(row.note)}
                  </p>
                ) : null}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 md:mt-5">
                {row.steps.map((step, stepIndex) => (
                  <div key={`${row.label}-${step}`} className="flex items-center gap-2">
                    <span
                      className={`rounded-full border px-3 py-1.5 font-instrument-sans text-[12px] font-medium leading-5 md:px-3.5 md:py-2 md:text-[13px] ${
                        step === "Drop-off Point"
                          ? "border-[#f6b2a5] bg-[#fde9e4] text-[#a83a2b]"
                          : step === "AI Commentary" ||
                              step === "Inline Predictions" ||
                              step === "Contextual Free-trial CTA"
                            ? "border-[#9bd7b3] bg-[#e9f7ef] text-[#1f7a43]"
                          : "border-neutral-200/80 bg-[#F5F5F5] text-text-primary"
                      }`}
                    >
                      {step}
                    </span>
                    {stepIndex < row.steps.length - 1 ? (
                      <span
                        aria-hidden
                        className={`font-instrument-sans text-[14px] leading-none md:text-[15px] ${style.connector}`}
                      >
                        →
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
