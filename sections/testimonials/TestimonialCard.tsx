import Image from "next/image";
import type { Testimonial } from "@/types/testimonials";
import { TESTIMONIAL_CARD_BORDER_RADIUS, TESTIMONIAL_CARD_WIDTH } from "@/lib/content/testimonials";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { quote, name, role, avatar } = testimonial;
  const quotedText = `\u201C${quote}\u201D`;

  return (
    <article
      className="flex h-full w-[min(560px,85vw)] shrink-0 flex-col border border-[#e0e0e0] bg-white p-9 md:w-[560px] md:p-10"
      style={{ borderRadius: TESTIMONIAL_CARD_BORDER_RADIUS }}
    >
      <div className="flex-1">
        <p className="font-instrument-sans text-[20px] leading-[32px] text-text-primary">
          {quotedText}
        </p>
      </div>

      <footer className="mt-10 flex shrink-0 items-center gap-4">
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
          <cite className="font-instrument-sans text-[24px] font-semibold not-italic leading-[38px] tracking-[1px] text-text-primary">
            {name}
          </cite>
          <p className="font-instrument-sans text-[16px] font-semibold uppercase leading-[28px] tracking-[2px] text-text-secondary">
            {role}
          </p>
        </div>
      </footer>
    </article>
  );
}
