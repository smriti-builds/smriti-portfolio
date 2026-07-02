"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Testimonial } from "@/types/testimonials";
import { TESTIMONIAL_CARD_WIDTH } from "@/lib/content/testimonials";

const CARD_TRANSITION = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

type TestimonialCardProps = {
  testimonial: Testimonial;
  index: number;
};

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const { quote, name, role, avatar } = testimonial;

  return (
    <motion.article
      className="flex w-[min(560px,85vw)] shrink-0 snap-center flex-col justify-between rounded-3xl border border-[#e0e0e0] bg-white p-9 md:w-[560px] md:p-10"
      style={{ scrollSnapAlign: "center" }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...CARD_TRANSITION, delay: index * 0.08 }}
    >
      <p className="font-instrument-sans text-xl leading-9 text-text-primary md:text-[22px] md:leading-10">
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
        <div>
          <cite className="font-instrument-sans text-2xl font-semibold not-italic text-text-primary">
            {name}
          </cite>
          <p className="font-instrument-sans text-sm font-semibold uppercase tracking-wide text-text-secondary">
            {role}
          </p>
        </div>
      </footer>
    </motion.article>
  );
}
