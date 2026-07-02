import Image from "next/image";
import type { Testimonial } from "@/types/testimonials";
import { TESTIMONIAL_CARD_WIDTH } from "@/lib/content/testimonials";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { quote, name, role, avatar } = testimonial;

  return (
    <article className="flex w-[min(560px,85vw)] shrink-0 flex-col justify-between rounded-3xl border border-[#e0e0e0] bg-white p-9 md:w-[560px] md:p-10">
      <p className="font-instrument-sans text-xl leading-9 text-text-primary">
        &ldquo;{quote}&rdquo;
      </p>

      <footer className="mt-10 flex items-center gap-4">
        <div className="relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-full">
          <Image
            src={avatar.src}
            alt={avatar.alt}
            width={avatar.width}
            height={avatar.height}
            className="h-full w-full object-cover"
            sizes={`${TESTIMONIAL_CARD_WIDTH}px`}
            draggable={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <cite className="font-instrument-sans text-2xl font-semibold not-italic leading-8 text-text-primary">
            {name}
          </cite>
          <p className="font-instrument-sans text-sm font-semibold uppercase leading-5 tracking-wide text-text-secondary">
            {role}
          </p>
        </div>
      </footer>
    </article>
  );
}
