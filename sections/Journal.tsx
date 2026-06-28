export default function Journal() {
  return (
    <section id="journal" aria-label="Journal" className="w-full bg-bg-cream">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-[88px] md:py-[100px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="aspect-[494/629] w-full max-w-md rounded-3xl bg-neutral-200" />
          <div className="flex flex-col gap-6">
            <p className="font-instrument-sans text-sm font-medium uppercase tracking-[0.2em] text-text-secondary">
              Journal
            </p>
            <h2 className="font-inter text-4xl font-semibold text-text-primary">
              Write, you&apos;ll be a much better designer
            </h2>
            <p className="font-inter text-lg leading-8 text-text-secondary">
              Placeholder for the open journal spread — notes, sketches, and
              reflections from ongoing design work.
            </p>
            <div className="aspect-[493/628] w-full rounded-2xl bg-white shadow-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
