import Link from "next/link";

export default function WorkCaseStudyNotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-white px-6 text-center">
      <h1 className="type-not-found-title font-inter font-semibold text-text-primary">
        Case study not found
      </h1>
      <p className="type-not-found-body max-w-md font-instrument-sans text-text-secondary">
        This case study does not exist or may have moved.
      </p>
      <Link
        href="/#featured-work"
        className="font-instrument-sans text-sm font-semibold text-text-primary underline"
      >
        Back to case studies
      </Link>
    </main>
  );
}
