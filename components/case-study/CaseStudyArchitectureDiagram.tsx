import type { CaseStudyArchitectureDiagram as ArchitectureDiagramData } from "@/types/case-study";

type CaseStudyArchitectureDiagramProps = {
  diagram: ArchitectureDiagramData;
};

function Connector() {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden>
      <span className="h-4 w-px bg-[#C8CDD5] md:h-5" />
      <span className="text-[11px] leading-none text-[#8A93A3]">▼</span>
    </div>
  );
}

export default function CaseStudyArchitectureDiagram({
  diagram,
}: CaseStudyArchitectureDiagramProps) {
  return (
    <div
      className="mt-6 flex w-full flex-col items-center rounded-[20px] border border-neutral-200/80 bg-white px-4 py-8 md:mt-8 md:rounded-[24px] md:px-8 md:py-10"
      role="img"
      aria-label={diagram.ariaLabel}
    >
        {diagram.nodes.map((node, index) => (
          <div key={node.label} className="flex w-full max-w-[320px] flex-col items-center">
            {index > 0 ? <Connector /> : null}

            <div
              className={`w-full rounded-2xl border px-4 py-3 text-center md:px-5 md:py-3.5 ${
                node.emphasis
                  ? "border-[#9bd7b3] bg-[#e9f7ef]"
                  : "border-neutral-200/80 bg-[#F5F5F5]"
              }`}
            >
              <p className="font-instrument-sans text-[14px] font-semibold leading-5 text-text-primary md:text-[15px] md:leading-6">
                {node.label}
              </p>
            </div>

            {node.detailItems?.length ? (
              <>
                <Connector />
                <div className="w-full rounded-2xl border border-dashed border-[#C8CDD5] bg-white px-4 py-4 md:px-5 md:py-5">
                  <ul className="flex flex-col gap-2.5">
                    {node.detailItems.map((item) => (
                      <li
                        key={item}
                        className="font-instrument-sans text-[13px] leading-5 text-[#525d6d] md:text-[14px] md:leading-[22px]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
  );
}
