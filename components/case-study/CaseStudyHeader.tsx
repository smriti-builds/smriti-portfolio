import Link from "next/link";

export default function CaseStudyHeader() {
  return (
    <header className="w-full border-b border-neutral-200/80 bg-white">
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-6 py-5 md:px-[88px]">
        <Link
          href="/#experiments"
          className="font-instrument-sans text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
        >
          ← Back to experiments
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
