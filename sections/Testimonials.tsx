const testimonials = [
  {
    quote:
      "In her short time at Dunzo, Smriti has delivered quality work with precision and care. She has proven to be someone whom the team can rely on.",
    name: "Haziq Mir",
    role: "Design Director, Dunzo",
  },
  {
    quote:
      "A talented designer with a sharp eye for detail and a great balance of usability and aesthetics. She will add tremendous value to any team she joins",
    name: "Vikram Shah",
    role: "CO-Founder & CTO, internshala",
  },
  {
    quote:
      "Smriti is one of the most reliable team member who is hard working and have great ownership to deliver projects. She has led the entire recruitment product single handedly",
    name: "Shivani Gaur",
    role: "Lead product designer, Phonepe",
  },
];

export default function Testimonials() {
  return (
    <section aria-label="Testimonials" className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-[88px] md:py-[100px]">
        <p className="mb-12 font-instrument-sans text-sm font-semibold uppercase tracking-[0.35em] text-text-secondary">
          Recommendations
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              className="flex flex-col gap-8 rounded-3xl bg-bg-cream p-9"
            >
              <p className="font-instrument-sans text-xl leading-9 text-text-primary">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-4">
                <div className="h-[78px] w-[78px] shrink-0 rounded-full bg-neutral-200" />
                <div>
                  <cite className="font-instrument-sans text-2xl font-semibold not-italic text-text-primary">
                    {testimonial.name}
                  </cite>
                  <p className="font-instrument-sans text-sm font-semibold uppercase tracking-wide text-text-secondary">
                    {testimonial.role}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
