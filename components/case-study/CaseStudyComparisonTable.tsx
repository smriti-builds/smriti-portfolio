import type { CaseStudyComparisonTable as CaseStudyComparisonTableData } from "@/types/case-study";

const CELL_CLASS =
  "px-4 py-3 align-top font-instrument-sans text-[16px] leading-[24px] text-text-secondary md:px-5 md:py-4";

export default function CaseStudyComparisonTable({
  table,
}: {
  table: CaseStudyComparisonTableData;
}) {
  return (
    <div className="mt-6 w-full overflow-x-auto md:mt-8">
      <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-2xl border border-neutral-200/80">
        <thead>
          <tr className="border-b border-neutral-200/80 bg-[#f8fafc]">
            <th
              scope="col"
              className={`${CELL_CLASS} text-left font-semibold text-text-primary`}
            >
              {table.headers.stage}
            </th>
            <th
              scope="col"
              className={`${CELL_CLASS} text-left font-semibold text-text-primary`}
            >
              {table.headers.traditional}
            </th>
            <th
              scope="col"
              className={`${CELL_CLASS} text-left font-semibold text-text-primary`}
            >
              {table.headers.aiAssisted}
            </th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr
              key={row.stage}
              className="border-b border-neutral-200/80 last:border-b-0"
            >
              <th
                scope="row"
                className={`${CELL_CLASS} font-semibold text-text-primary`}
              >
                {row.stage}
              </th>
              <td className={CELL_CLASS}>{row.traditional}</td>
              <td className={CELL_CLASS}>{row.aiAssisted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
