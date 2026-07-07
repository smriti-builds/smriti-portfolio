import CaseStudyMediaBlock from "@/components/case-study/CaseStudyMediaBlock";
import type { CaseStudyMediaGrid as CaseStudyMediaGridData } from "@/types/case-study";

type CaseStudyMediaGridProps = {
  grid: CaseStudyMediaGridData;
};

export default function CaseStudyMediaGrid({ grid }: CaseStudyMediaGridProps) {
  const columns = grid.columns ?? 2;

  return (
    <div
      className={
        columns === 2
          ? "grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8"
          : "flex w-full flex-col gap-4 sm:gap-6 md:gap-8"
      }
    >
      {grid.items.map((item) => (
        <CaseStudyMediaBlock key={item.src} media={item} />
      ))}
    </div>
  );
}
