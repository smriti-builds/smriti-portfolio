const experiments = [
  {
    title: "Claude design + Figma MCP",
    description:
      "Translated a concept into a working landing page using Claude in 5 hours.",
  },
  {
    title: "Cursor + Github",
    description: "Fixed front end UI issues directly in production code.",
  },
  {
    title: "Claude + GPT",
    description:
      "Eliminated manual color picking by automating HEX code extraction.",
  },
];

export default function Experiments() {
  return (
    <section aria-label="Experiments" className="w-full bg-bg-cream">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-[88px] md:py-[100px]">
        <div className="mb-16 max-w-2xl">
          <h2 className="font-inter text-4xl font-semibold text-text-primary md:text-5xl">
            Gen AI experiments
          </h2>
          <p className="mt-4 font-instrument-sans text-2xl text-text-secondary">
            Late-night explorations with AI
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {experiments.map((experiment) => (
            <article
              key={experiment.title}
              className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm"
            >
              <div className="aspect-[402/278] w-full rounded-2xl bg-neutral-100" />
              <div className="flex flex-col gap-3">
                <h3 className="font-instrument-sans text-lg font-medium text-text-primary">
                  {experiment.title}
                </h3>
                <p className="font-instrument-sans text-base leading-7 text-text-secondary">
                  {experiment.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
