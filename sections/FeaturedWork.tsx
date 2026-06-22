const projects = [
  {
    title: "Real time AI commentary",
    description:
      "Designing a real-time AI experience that increased free trial starts by 162%",
    tags: ["AI Prediction", "Monetisation"],
  },
  {
    title: "AI-powered padel intelligence platform",
    description:
      "Scaling the new design to 3 international markets, achieving 88% first-time user activation.",
    tags: ["Video analytics", "Sports Intelligence"],
  },
  {
    title: "Reducing drop off at checkout",
    description: "How we reduced cart abandonment by 18% & increased AOV by ₹24",
    tags: ["Personalisation", "Q Commerce"],
  },
  {
    title: "The interview scheduler",
    description:
      "Documenting how we made hiring easier and 2X faster for our customers",
    tags: ["Recruitment", "Workflow"],
  },
];

export default function FeaturedWork() {
  return (
    <section aria-label="Featured work" className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-[88px] md:py-[100px]">
        <div className="mb-16 max-w-xl">
          <p className="font-instrument-sans text-sm font-medium uppercase tracking-[0.2em] text-text-secondary">
            Case studies
          </p>
          <h2 className="mt-4 font-inter text-4xl font-bold leading-tight text-text-primary md:text-5xl">
            Think. Design. Develop. Launch. Repeat
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-[33px]">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex flex-col gap-6 border-t border-neutral-200 pt-6"
            >
              <div className="aspect-[616/400] w-full rounded-3xl bg-neutral-100" />
              <div className="flex flex-col gap-4">
                <h3 className="font-instrument-sans text-2xl font-semibold text-text-primary">
                  {project.title}
                </h3>
                <p className="font-inter text-lg leading-8 text-text-secondary">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-neutral-100 px-4 py-2 font-inter text-sm font-medium uppercase text-text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
