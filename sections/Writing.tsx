const posts = [
  {
    title: "What if machines become more intelligent than human?",
    date: "Oct 1, 2019",
  },
  {
    title: "Similarities between Money Heist & UX Design",
    date: "May 28, 2020",
  },
  {
    title: "Paytm or PhonePe : The age of digital money!",
    date: "Jan 3, 2020",
  },
  {
    title: "Website redesign for a creative design agency",
    date: "Sep 01, 2021",
  },
];

export default function Writing() {
  return (
    <section aria-label="Writing" className="w-full bg-bg-cream">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-[88px] md:py-[100px]">
        <div className="mb-16 mx-auto max-w-2xl text-center">
          <h2 className="font-inter text-4xl font-semibold text-text-primary md:text-5xl">
            A record of curiosity
          </h2>
          <p className="mt-4 font-instrument-sans text-2xl text-text-secondary">
            The things I learn, question, &amp; occasionally write about.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {posts.map((post) => (
            <article
              key={post.title}
              className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm"
            >
              <div className="aspect-[348/240] w-full rounded-2xl bg-neutral-100" />
              <div className="flex flex-col gap-4">
                <h3 className="font-inter text-xl font-semibold leading-8 text-text-primary">
                  {post.title}
                </h3>
                <p className="font-inter text-base font-medium text-text-secondary">
                  {post.date}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
