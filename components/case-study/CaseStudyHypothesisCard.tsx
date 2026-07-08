type CaseStudyHypothesisCardProps = {
  title: string;
  body: string;
};

export default function CaseStudyHypothesisCard({
  title,
  body,
}: CaseStudyHypothesisCardProps) {
  return (
    <aside className="flex h-full flex-col rounded-[20px] border border-[#F5F5FE] bg-[#F5F5F5] px-6 py-7 md:rounded-[24px] md:px-8 md:py-8">
      <p className="font-instrument-sans text-[15px] font-semibold leading-5 text-text-primary md:text-[16px]">
        {title}
      </p>
      <p className="mt-3 font-instrument-serif text-[24px] font-normal leading-[32px] text-text-primary md:mt-4">
        {body}
      </p>
    </aside>
  );
}
