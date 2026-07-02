"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  TESTIMONIAL_AUTOPLAY_INTERVAL_MS,
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

function scrollToCardIndex(
  carousel: HTMLDivElement,
  index: number,
  totalCards: number,
  behavior: ScrollBehavior,
) {
  const card = carousel.querySelector<HTMLElement>(`[data-testimonial-index="${index}"]`);
  if (!card) return;

  const styles = getComputedStyle(carousel);
  const scrollPaddingLeft = Number.parseFloat(styles.scrollPaddingLeft) || 0;
  const scrollPaddingRight = Number.parseFloat(styles.scrollPaddingRight) || 0;
  const cardLeft = card.offsetLeft;
  const cardWidth = card.offsetWidth;

  let targetLeft = 0;
  if (index === 0) {
    targetLeft = cardLeft - scrollPaddingLeft;
  } else if (index === totalCards - 1) {
    targetLeft = cardLeft + cardWidth - carousel.clientWidth + scrollPaddingRight;
  } else {
    targetLeft = cardLeft + cardWidth / 2 - carousel.clientWidth / 2;
  }

  carousel.scrollTo({
    left: Math.max(0, targetLeft),
    behavior,
  });
}

function getActiveCardIndex(carousel: HTMLDivElement, totalCards: number) {
  const cards = Array.from(
    carousel.querySelectorAll<HTMLElement>("[data-testimonial-index]"),
  );
  if (cards.length === 0) return 0;

  const scrollLeft = carousel.scrollLeft;
  let activeIndex = 0;
  let minDistance = Infinity;

  for (let index = 0; index < cards.length; index += 1) {
    const card = cards[index];
    const styles = getComputedStyle(carousel);
    const scrollPaddingLeft = Number.parseFloat(styles.scrollPaddingLeft) || 0;
    const scrollPaddingRight = Number.parseFloat(styles.scrollPaddingRight) || 0;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;

    let snapLeft = 0;
    if (index === 0) {
      snapLeft = cardLeft - scrollPaddingLeft;
    } else if (index === totalCards - 1) {
      snapLeft = cardLeft + cardWidth - carousel.clientWidth + scrollPaddingRight;
    } else {
      snapLeft = cardLeft + cardWidth / 2 - carousel.clientWidth / 2;
    }

    const distance = Math.abs(scrollLeft - snapLeft);
    if (distance < minDistance) {
      minDistance = distance;
      activeIndex = index;
    }
  }

  return activeIndex;
}

function scrollToSnapCard(
  carousel: HTMLDivElement,
  direction: "next" | "prev",
  totalCards: number,
  behavior: ScrollBehavior,
) {
  const activeIndex = getActiveCardIndex(carousel, totalCards);
  const targetIndex =
    direction === "next"
      ? Math.min(activeIndex + 1, totalCards - 1)
      : Math.max(activeIndex - 1, 0);

  scrollToCardIndex(carousel, targetIndex, totalCards, behavior);
}

function getSnapAlignClass(index: number, totalCards: number, enabled: boolean) {
  if (!enabled) return "";

  if (index === 0) return "snap-start";
  if (index === totalCards - 1) return "snap-end";
  return "snap-center";
}

export default function TestimonialsClient() {
  const { title } = testimonialsContent;
  const { headingToCardsPx } = testimonialsLayout;
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoplayPausedRef = useRef(false);
  const isSectionVisibleRef = useRef(false);
  const dragState = useRef({
    active: false,
    dragging: false,
    pointerId: -1,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";
  const totalCards = testimonials.length;

  const advanceCarousel = useCallback(
    (behavior: ScrollBehavior = scrollBehavior) => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const activeIndex = getActiveCardIndex(carousel, totalCards);
      const nextIndex = (activeIndex + 1) % totalCards;
      scrollToCardIndex(carousel, nextIndex, totalCards, behavior);
    },
    [scrollBehavior, totalCards],
  );

  const stopAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (prefersReducedMotion || autoplayPausedRef.current || !isSectionVisibleRef.current) {
      return;
    }

    stopAutoplay();
    autoplayIntervalRef.current = setInterval(() => {
      if (autoplayPausedRef.current || !isSectionVisibleRef.current) return;
      advanceCarousel("smooth");
    }, TESTIMONIAL_AUTOPLAY_INTERVAL_MS);
  }, [advanceCarousel, prefersReducedMotion, stopAutoplay]);

  const resetAutoplay = useCallback(() => {
    stopAutoplay();
    startAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const pauseAutoplay = useCallback(() => {
    autoplayPausedRef.current = true;
    stopAutoplay();
  }, [stopAutoplay]);

  const resumeAutoplay = useCallback(() => {
    autoplayPausedRef.current = false;
    startAutoplay();
  }, [startAutoplay]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSectionVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      stopAutoplay();
    };
  }, [prefersReducedMotion, startAutoplay, stopAutoplay]);

  const onWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      event.preventDefault();
      resetAutoplay();
      carousel.scrollBy({
        left: event.deltaY,
        behavior: scrollBehavior,
      });
    },
    [scrollBehavior, resetAutoplay],
  );

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const carousel = carouselRef.current;
    if (!carousel || event.button !== 0) return;

    pauseAutoplay();
    dragState.current = {
      active: true,
      dragging: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: carousel.scrollLeft,
      moved: false,
    };
  }, [pauseAutoplay]);

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
      resetAutoplay();
      window.setTimeout(() => {
        dragState.current.moved = false;
      }, 100);
    } else {
      resumeAutoplay();
    }
  }, [resetAutoplay, resumeAutoplay]);

  return (
    <section ref={sectionRef} aria-label="Recommendations" className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-8 pb-24 md:px-[88px] md:pt-10 md:pb-[100px]">
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

        <div className="relative -mx-6 md:-mx-[88px]">
          <div
            ref={carouselRef}
            role="list"
            aria-label="Recommendations"
            className={`overflow-x-auto overscroll-x-contain scroll-px-6 [touch-action:pan-x] [-ms-overflow-style:none] [scrollbar-width:none] md:scroll-px-[88px] [&::-webkit-scrollbar]:hidden ${prefersReducedMotion ? "" : "snap-x snap-mandatory"}`}
            style={{
              scrollBehavior: prefersReducedMotion ? "auto" : "smooth",
            }}
            tabIndex={0}
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
            onFocus={pauseAutoplay}
            onBlur={resumeAutoplay}
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
                resetAutoplay();
                scrollToSnapCard(carousel, "next", testimonials.length, scrollBehavior);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                resetAutoplay();
                scrollToSnapCard(carousel, "prev", testimonials.length, scrollBehavior);
              }
            }}
          >
            <div
              className="flex w-max items-stretch px-6 md:px-[88px]"
              style={{ gap: TESTIMONIAL_CARD_GAP }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  role="listitem"
                  data-testimonial-index={index}
                  className={`flex shrink-0 ${getSnapAlignClass(index, testimonials.length, !prefersReducedMotion)}`}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          <CarouselEdgeFade side="left" />
          <CarouselEdgeFade side="right" />
        </div>
      </div>
    </section>
  );
}
