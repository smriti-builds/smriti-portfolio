import Link from "next/link";

type CaseStudyHeaderProps = {
  backHref?: string;
  backLabel?: string;
};

export default function CaseStudyHeader({
  backHref = "/#experiments",
  backLabel = "Back to experiments",
}: CaseStudyHeaderProps) {
  return (
    <header className="w-full border-b border-neutral-200/80 bg-white">
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-5 py-4 md:px-12 md:py-5 lg:px-[120px]">
        <Link
          href={backHref}
          className="font-instrument-sans text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
        >
          <span className="sm:hidden">← Back</span>
          <span className="hidden sm:inline">← {backLabel}</span>
        </Link>
        <Link
          href="/"
          className="font-instrument-sans text-sm font-semibold text-text-primary"
        >
          Smriti Rawat
        </Link>
      </div>
    </header>
  );
}
