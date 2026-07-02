import Link from "next/link";
import type { CaseStudy } from "@/types/case-study";

type CaseStudyExperimentNavProps = {
  prev?: CaseStudy;
  next?: CaseStudy;
};

export default function CaseStudyExperimentNav({
  prev,
  next,
}: CaseStudyExperimentNavProps) {
  return (
    <nav
      aria-label="Other experiments"
      className="-mt-2 flex flex-col gap-4 border-t border-neutral-200/80 pt-8 md:mt-16 md:pt-10 lg:flex-row lg:items-stretch lg:justify-between"
    >
      {prev ? (
        <Link
          href={`/experiments/${prev.slug}`}
          className="group flex min-w-0 flex-1 flex-col gap-2 rounded-2xl border border-neutral-200/80 bg-white p-4 transition-shadow hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)] md:p-5"
        >
          <span className="font-instrument-sans text-xs font-semibold uppercase tracking-[1.5px] text-[#525d6d]">
            ← Previous
          </span>
          <span className="font-instrument-sans text-base font-semibold text-text-primary group-hover:underline md:text-lg">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="hidden flex-1 lg:block" />
      )}

      {next ? (
        <Link
          href={`/experiments/${next.slug}`}
          className="group flex min-w-0 flex-1 flex-col gap-2 rounded-2xl border border-neutral-200/80 bg-white p-4 text-left transition-shadow hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)] md:p-5 lg:text-right"
        >
          <span className="font-instrument-sans text-xs font-semibold uppercase tracking-[1.5px] text-[#525d6d]">
            Next →
          </span>
          <span className="font-instrument-sans text-base font-semibold text-text-primary group-hover:underline md:text-lg">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
