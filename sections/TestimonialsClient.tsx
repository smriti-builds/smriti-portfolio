"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  TESTIMONIAL_CARD_GAP,
  testimonials,
  testimonialsContent,
  testimonialsLayout,
} from "@/lib/content/testimonials";
import CarouselEdgeFade from "@/sections/testimonials/CarouselEdgeFade";
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

function getEdgeFadeVisibility(carousel: HTMLDivElement) {
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  return {
    left: carousel.scrollLeft > 1,
    right: carousel.scrollLeft < maxScrollLeft - 1,
  };
}

export default function TestimonialsClient() {
  const { title } = testimonialsContent;
  const { headingToCardsPx } = testimonialsLayout;
  const prefersReducedMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [edgeFades, setEdgeFades] = useState({ left: false, right: true });
  const dragState = useRef({
    active: false,
    dragging: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    moved: false,
  });
  const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  const updateEdgeFades = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    setEdgeFades(getEdgeFadeVisibility(carousel));
  }, []);

  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollTo({ left: 0, behavior: "auto" });
    updateEdgeFades();
  }, [updateEdgeFades]);

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
      startY: event.clientY,
      scrollLeft: carousel.scrollLeft,
      moved: false,
    };
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const carousel = carouselRef.current;
    if (!carousel || !dragState.current.active) return;

    const deltaX = event.clientX - dragState.current.startX;
    const deltaY = event.clientY - dragState.current.startY;

    if (!dragState.current.dragging) {
      if (Math.abs(deltaX) <= 6) return;
      if (Math.abs(deltaX) <= Math.abs(deltaY)) return;

      dragState.current.dragging = true;
      dragState.current.moved = true;
      carousel.setPointerCapture(dragState.current.pointerId);
      carousel.style.cursor = "grabbing";
    }

    carousel.scrollLeft = dragState.current.scrollLeft - deltaX;
    clampScrollLeft(carousel);
    updateEdgeFades();
  }, [updateEdgeFades]);

  const endDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
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
      updateEdgeFades();

      if (didMove) {
        window.setTimeout(() => {
          dragState.current.moved = false;
        }, 100);
      }
    },
    [updateEdgeFades],
  );

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
            ref={carouselRef}
            role="list"
            aria-label="Recommendations"
            className="cursor-grab overflow-x-auto overscroll-x-contain scroll-smooth pb-1 [touch-action:pan-x] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden active:cursor-grabbing"
            style={{ scrollBehavior: prefersReducedMotion ? "auto" : "smooth" }}
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
              if (!carousel) return;
              clampScrollLeft(carousel);
              updateEdgeFades();
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
              className="flex w-max items-stretch px-6 md:px-[88px]"
              style={{ gap: TESTIMONIAL_CARD_GAP }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} role="listitem" className="flex shrink-0">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          <CarouselEdgeFade side="left" visible={edgeFades.left} />
          <CarouselEdgeFade side="right" visible={edgeFades.right} />
        </div>
      </div>
    </section>
  );
}
