export default function Hero() {
  return (
    <section aria-label="Hero" className="w-full bg-bg-cream">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-[1440px] flex-col justify-between px-6 py-24 md:px-[88px] md:py-[100px]">
        <div className="flex max-w-3xl flex-col gap-6">
          <p className="font-inter text-sm font-semibold uppercase tracking-wide text-text-primary">
            THE WORLD IS FULL OF
          </p>
          <h1 className="font-inter text-4xl font-semibold uppercase leading-tight text-text-primary md:text-5xl">
            Unfinished ideas &amp; frustrating experiences
          </h1>
          <p className="font-playwrite text-2xl text-text-primary">
            I design the path that make them seamless.
          </p>
          <p className="font-instrument-sans text-lg font-medium lowercase text-text-secondary">
            Smriti.205@
          </p>
        </div>

        <nav
          aria-label="Social and contact links"
          className="mt-16 flex flex-wrap items-center gap-3 rounded-full border border-white/60 bg-white/55 px-5 py-3 shadow-sm backdrop-blur-[10px]"
        >
          {["LinkedIn", "Dribbble", "Behance", "Instagram", "WhatsApp"].map(
            (label) => (
              <span
                key={label}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-xs font-medium text-text-secondary"
              >
                {label.slice(0, 2)}
              </span>
            ),
          )}
          <span aria-hidden="true" className="mx-1 h-10 w-px bg-neutral-300" />
          {["Resume", "Contact"].map((label) => (
            <span
              key={label}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xs font-medium uppercase text-text-primary"
            >
              {label.slice(0, 2)}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
