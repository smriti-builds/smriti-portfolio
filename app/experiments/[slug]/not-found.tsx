import Link from "next/link";

export default function ExperimentCaseStudyNotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-bg-cream px-6 text-center">
      <h1 className="font-inter text-3xl font-semibold text-text-primary">
        Case study not found
      </h1>
      <p className="max-w-md font-instrument-sans text-lg text-text-secondary">
        This experiment case study does not exist or may have moved.
      </p>
      <Link
        href="/#experiments"
        className="font-instrument-sans text-sm font-semibold text-text-primary underline"
      >
        Back to Gen AI experiments
      </Link>
    </main>
  );
}
