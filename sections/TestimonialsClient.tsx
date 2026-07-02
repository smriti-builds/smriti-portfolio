"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  TESTIMONIAL_CARD_GAP,
  TESTIMONIAL_CAROUSEL_END_PADDING,
  TESTIMONIAL_INITIAL_INDEX,
  testimonials,
  testimonialsContent,
  testimonialsLayout,
} from "@/lib/content/testimonials";
import TestimonialCard from "@/sections/testimonials/TestimonialCard";

const HEADER_TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

function clampScrollLeft(carousel: HTMLDivElement) {
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  if (carousel.scrollLeft > maxScrollLeft) {
    carousel.scrollLeft = maxScrollLeft;
  }
  if (carousel.scrollLeft < 0) {
    carousel.scrollLeft = 0;
  }
}

function scrollToCard(
  carousel: HTMLDivElement,
  index: number,
  behavior: ScrollBehavior = "auto",
) {
  const card = carousel.querySelector<HTMLElement>(`[data-testimonial-index="${index}"]`);
  if (!card) return;

  const cardCenter = card.offsetLeft + card.offsetWidth / 2;
  const targetLeft = cardCenter - carousel.clientWidth / 2;

  carousel.scrollTo({
    left: Math.max(0, targetLeft),
    behavior,
  });
}

export default function TestimonialsClient() {
  const { title } = testimonialsContent;
  const { headingToCardsPx } = testimonialsLayout;
  const prefersReducedMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    active: false,
    dragging: false,
    pointerId: -1,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    scrollToCard(carousel, TESTIMONIAL_INITIAL_INDEX, "auto");

    const onWindowResize = () => {
      scrollToCard(carousel, TESTIMONIAL_INITIAL_INDEX, "auto");
    };

    window.addEventListener("resize", onWindowResize);
    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  const onWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      event.preventDefault();
      carousel.scrollBy({
        left: event.deltaY,
        behavior: scrollBehavior,
      });
    },
    [scrollBehavior],
  );

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const carousel = carouselRef.current;
    if (!carousel || event.button !== 0) return;

    dragState.current = {
      active: true,
      dragging: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: carousel.scrollLeft,
      moved: false,
    };
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const carousel = carouselRef.current;
    if (!carousel || !dragState.current.active) return;

    const deltaX = event.clientX - dragState.current.startX;
    if (!dragState.current.dragging) {
      if (Math.abs(deltaX) <= 6) return;

      dragState.current.dragging = true;
      dragState.current.moved = true;
      carousel.setPointerCapture(dragState.current.pointerId);
      carousel.style.cursor = "grabbing";
    }

    carousel.scrollLeft = dragState.current.scrollLeft - deltaX;
    clampScrollLeft(carousel);
  }, []);

  const endDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const carousel = carouselRef.current;
    if (!carousel || !dragState.current.active) return;

    const didMove = dragState.current.moved;
    const wasDragging = dragState.current.dragging;

    dragState.current.active = false;
    dragState.current.dragging = false;

    if (wasDragging && carousel.hasPointerCapture(event.pointerId)) {
      carousel.releasePointerCapture(event.pointerId);
    }

    carousel.style.cursor = "";
    clampScrollLeft(carousel);

    if (didMove) {
      window.setTimeout(() => {
        dragState.current.moved = false;
      }, 100);
    }
  }, []);

  return (
    <section aria-label="Recommendations" className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-[88px] md:py-[100px]">
        <header
          className="text-center"
          style={{ marginBottom: `${headingToCardsPx}px` }}
        >
          <motion.h2
            className="font-instrument-sans text-[32px] font-semibold uppercase leading-[32px] tracking-[4px] text-text-primary"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={HEADER_TRANSITION}
          >
            {title}
          </motion.h2>
        </header>

        <div
          ref={carouselRef}
          role="list"
          aria-label="Recommendations"
          className="-mx-6 cursor-grab overflow-x-auto overscroll-x-contain [touch-action:pan-x] [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing md:-mx-[88px] [&::-webkit-scrollbar]:hidden"
          style={{
            scrollBehavior: prefersReducedMotion ? "auto" : "smooth",
          }}
          tabIndex={0}
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={(event) => {
            if (dragState.current.moved) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          onScroll={() => {
            const carousel = carouselRef.current;
            if (carousel) clampScrollLeft(carousel);
          }}
          onKeyDown={(event) => {
            const carousel = carouselRef.current;
            if (!carousel) return;

            if (event.key === "ArrowRight") {
              event.preventDefault();
              carousel.scrollBy({
                left: carousel.clientWidth * 0.6,
                behavior: scrollBehavior,
              });
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              carousel.scrollBy({
                left: -carousel.clientWidth * 0.6,
                behavior: scrollBehavior,
              });
            }
          }}
        >
          <div
            className="flex w-max pl-6 md:pl-[88px]"
            style={{
              gap: TESTIMONIAL_CARD_GAP,
              paddingRight: TESTIMONIAL_CAROUSEL_END_PADDING,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                role="listitem"
                data-testimonial-index={index}
                className="shrink-0"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
