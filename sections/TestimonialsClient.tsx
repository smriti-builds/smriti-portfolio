"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  TESTIMONIAL_CARD_GAP,
  TESTIMONIAL_MARQUEE_COPIES,
  TESTIMONIAL_MARQUEE_SECONDS_PER_CARD,
  TESTIMONIAL_MARQUEE_SECONDS_PER_CARD_MOBILE,
  testimonials,
  testimonialsContent,
  testimonialsLayout,
} from "@/lib/content/testimonials";
import type { Testimonial } from "@/types/testimonials";
import CarouselEdgeFade from "@/sections/testimonials/CarouselEdgeFade";
import TestimonialCard from "@/sections/testimonials/TestimonialCard";

const HEADER_TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

type MarqueeSlide = Testimonial & {
  slideKey: string;
  copyIndex: number;
};

export default function TestimonialsClient() {
  const { title } = testimonialsContent;
  const { headingToCardsPx } = testimonialsLayout;
  const prefersReducedMotion = useReducedMotion();
  const cardCount = testimonials.length;
  const marqueeDurationSeconds = cardCount * TESTIMONIAL_MARQUEE_SECONDS_PER_CARD;
  const marqueeDurationMobileSeconds =
    cardCount * TESTIMONIAL_MARQUEE_SECONDS_PER_CARD_MOBILE;

  const marqueeSlides = useMemo<MarqueeSlide[]>(
    () =>
      Array.from({ length: TESTIMONIAL_MARQUEE_COPIES }, (_, copyIndex) =>
        testimonials.map((testimonial) => ({
          ...testimonial,
          slideKey: `${testimonial.id}-marquee-${copyIndex}`,
          copyIndex,
        })),
      ).flat(),
    [],
  );

  const marqueeStyle = {
    "--testimonial-card-gap": `${TESTIMONIAL_CARD_GAP}px`,
    "--testimonial-marquee-duration": `${marqueeDurationSeconds}s`,
    "--testimonial-marquee-duration-mobile": `${marqueeDurationMobileSeconds}s`,
  } as React.CSSProperties;

  return (
    <section aria-label="Recommendations" className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-8 pb-24 md:px-[88px] md:pt-10 md:pb-[100px]">
        <header
          className="text-center"
          style={{ marginBottom: `${headingToCardsPx}px` }}
        >
          <motion.h2
            className="font-instrument-sans text-[20px] font-semibold uppercase leading-[28px] tracking-[2px] text-text-primary md:text-[32px] md:leading-[32px] md:tracking-[4px]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={HEADER_TRANSITION}
          >
            {title}
          </motion.h2>
        </header>

        <div className="relative -mx-6 md:-mx-[88px]">
          <div
            className="testimonial-marquee overflow-hidden"
            style={marqueeStyle}
            aria-label="Recommendations"
          >
            <div
              className="testimonial-marquee-track items-stretch pl-6 md:pl-[88px]"
              role="list"
            >
              {marqueeSlides.map((slide) => (
                <div
                  key={slide.slideKey}
                  role="listitem"
                  aria-hidden={slide.copyIndex > 0 || undefined}
                  className="flex shrink-0"
                >
                  <TestimonialCard testimonial={slide} />
                </div>
              ))}
            </div>
          </div>

          <CarouselEdgeFade side="left" visible />
          <CarouselEdgeFade side="right" visible />
        </div>
      </div>
    </section>
  );
}
