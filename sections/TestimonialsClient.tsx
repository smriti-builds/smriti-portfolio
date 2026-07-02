"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
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

const MOBILE_BREAKPOINT_PX = 768;
const DRAG_ACTIVATION_PX = 6;
const WHEEL_AUTO_RESUME_MS = 200;

type MarqueeSlide = Testimonial & {
  slideKey: string;
  copyIndex: number;
};

function normalizeOffset(offset: number, loopWidth: number) {
  if (loopWidth <= 0) return 0;

  let next = offset;
  while (next >= loopWidth) next -= loopWidth;
  while (next < 0) next += loopWidth;
  return next;
}

function getMarqueeDurationSeconds(cardCount: number) {
  const secondsPerCard =
    typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT_PX
      ? TESTIMONIAL_MARQUEE_SECONDS_PER_CARD_MOBILE
      : TESTIMONIAL_MARQUEE_SECONDS_PER_CARD;
  return cardCount * secondsPerCard;
}

export default function TestimonialsClient() {
  const { title } = testimonialsContent;
  const { headingToCardsPx } = testimonialsLayout;
  const prefersReducedMotion = useReducedMotion();
  const cardCount = testimonials.length;

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

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const lastFrameTimeRef = useRef<number | null>(null);
  const autoPausedRef = useRef(false);
  const wheelResumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStateRef = useRef({
    active: false,
    dragging: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    startOffset: 0,
    moved: false,
  });

  const applyTransform = () => {
    const track = trackRef.current;
    const loopWidth = loopWidthRef.current;
    if (!track || loopWidth <= 0) return;

    offsetRef.current = normalizeOffset(offsetRef.current, loopWidth);
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  };

  const measureLoopWidth = () => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>('[data-marquee-index="0"]');
    const firstCardOfSecondSet = track.querySelector<HTMLElement>(
      `[data-marquee-index="${cardCount}"]`,
    );
    if (!firstCard || !firstCardOfSecondSet) return;

    const nextLoopWidth =
      firstCardOfSecondSet.offsetLeft - firstCard.offsetLeft;
    if (nextLoopWidth <= 0) return;

    const previousLoopWidth = loopWidthRef.current;
    if (previousLoopWidth > 0 && previousLoopWidth !== nextLoopWidth) {
      const loopProgress = offsetRef.current / previousLoopWidth;
      offsetRef.current = loopProgress * nextLoopWidth;
    }

    loopWidthRef.current = nextLoopWidth;
    applyTransform();
  };

  useLayoutEffect(() => {
    measureLoopWidth();

    const track = trackRef.current;
    if (!track) return;

    const resizeObserver = new ResizeObserver(measureLoopWidth);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, [cardCount, marqueeSlides]);

  useEffect(() => {
    const onResize = () => {
      measureLoopWidth();
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let frameId = 0;

    const tick = (now: number) => {
      const lastTime = lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      if (
        lastTime !== null &&
        !prefersReducedMotion &&
        !autoPausedRef.current &&
        loopWidthRef.current > 0
      ) {
        const deltaSeconds = (now - lastTime) / 1000;
        const durationSeconds = getMarqueeDurationSeconds(cardCount);
        const pixelsPerSecond = loopWidthRef.current / durationSeconds;
        offsetRef.current += pixelsPerSecond * deltaSeconds;
        applyTransform();
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      if (wheelResumeTimeoutRef.current) {
        clearTimeout(wheelResumeTimeoutRef.current);
      }
    };
  }, [cardCount, prefersReducedMotion]);

  const pauseAutoAfterWheel = () => {
    autoPausedRef.current = true;

    if (wheelResumeTimeoutRef.current) {
      clearTimeout(wheelResumeTimeoutRef.current);
    }

    wheelResumeTimeoutRef.current = setTimeout(() => {
      wheelResumeTimeoutRef.current = null;
      if (!dragStateRef.current.active) {
        autoPausedRef.current = false;
      }
    }, WHEEL_AUTO_RESUME_MS);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    dragStateRef.current = {
      active: true,
      dragging: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startOffset: offsetRef.current,
      moved: false,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !dragStateRef.current.active) return;

    const deltaX = event.clientX - dragStateRef.current.startX;
    const deltaY = event.clientY - dragStateRef.current.startY;

    if (!dragStateRef.current.dragging) {
      if (Math.abs(deltaX) <= DRAG_ACTIVATION_PX) return;
      if (Math.abs(deltaX) <= Math.abs(deltaY)) return;

      autoPausedRef.current = true;
      dragStateRef.current.dragging = true;
      dragStateRef.current.moved = true;
      viewport.setPointerCapture(event.pointerId);
      viewport.style.cursor = "grabbing";
    }

    offsetRef.current = dragStateRef.current.startOffset - deltaX;
    applyTransform();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !dragStateRef.current.active) return;

    const wasDragging = dragStateRef.current.dragging;

    if (wasDragging && viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    viewport.style.cursor = "";
    dragStateRef.current.active = false;
    dragStateRef.current.dragging = false;
    autoPausedRef.current = false;

    window.setTimeout(() => {
      dragStateRef.current.moved = false;
    }, 0);
  };

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.shiftKey) {
      event.preventDefault();
      pauseAutoAfterWheel();
      offsetRef.current += event.deltaY;
      applyTransform();
      return;
    }

    if (Math.abs(event.deltaX) < 1) return;
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

    event.preventDefault();
    pauseAutoAfterWheel();
    offsetRef.current += event.deltaX;
    applyTransform();
  };

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
            ref={viewportRef}
            className="testimonial-marquee overflow-hidden overscroll-x-contain [touch-action:pan-y] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="list"
            aria-label="Recommendations"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onWheel={onWheel}
            onClickCapture={(event) => {
              if (dragStateRef.current.moved) {
                event.preventDefault();
                event.stopPropagation();
              }
            }}
          >
            <div
              ref={trackRef}
              className="testimonial-marquee-track flex w-max items-stretch px-6 md:px-[88px]"
              style={{ gap: TESTIMONIAL_CARD_GAP }}
            >
              {marqueeSlides.map((slide, index) => (
                <div
                  key={slide.slideKey}
                  role="listitem"
                  data-marquee-index={index}
                  aria-hidden={slide.copyIndex > 0 ? true : undefined}
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
