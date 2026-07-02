"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  TESTIMONIAL_AUTOPLAY_INITIAL_DELAY_MS,
  TESTIMONIAL_AUTOPLAY_INTERVAL_MS,
  TESTIMONIAL_AUTOPLAY_SCROLL_MS,
  TESTIMONIAL_CARD_GAP,
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

type CarouselSlide = Testimonial & {
  slideKey: string;
  isClone?: boolean;
  cloneOf?: number;
};

const LEADING_CLONE_INDEX = 0;

function clampScrollLeft(carousel: HTMLDivElement) {
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  if (carousel.scrollLeft > maxScrollLeft) {
    carousel.scrollLeft = maxScrollLeft;
  }
  if (carousel.scrollLeft < 0) {
    carousel.scrollLeft = 0;
  }
}

function getSnapTargetForIndex(
  carousel: HTMLDivElement,
  cardLeft: number,
  cardWidth: number,
) {
  return cardLeft + cardWidth / 2 - carousel.clientWidth / 2;
}

function getFirstRealIndex() {
  return LEADING_CLONE_INDEX + 1;
}

function getLastRealIndex(realCount: number) {
  return LEADING_CLONE_INDEX + realCount;
}

function getTrailingCloneIndex(realCount: number) {
  return LEADING_CLONE_INDEX + realCount + 1;
}

function getSlideCount(realCount: number) {
  return realCount + 2;
}

function getCardElement(carousel: HTMLDivElement, index: number) {
  return carousel.querySelector<HTMLElement>(`[data-testimonial-index="${index}"]`);
}

function getCloneLoopOffset(
  carousel: HTMLDivElement,
  fromIndex: number,
  toIndex: number,
) {
  const from = getCardElement(carousel, fromIndex);
  const to = getCardElement(carousel, toIndex);
  if (!from || !to) return 0;
  return from.offsetLeft - to.offsetLeft;
}

function getCardScrollTarget(carousel: HTMLDivElement, index: number) {
  const card = getCardElement(carousel, index);
  if (!card) return 0;

  return getSnapTargetForIndex(carousel, card.offsetLeft, card.offsetWidth);
}

function scrollToCardIndex(
  carousel: HTMLDivElement,
  index: number,
  behavior: ScrollBehavior,
) {
  carousel.scrollTo({
    left: Math.max(0, getCardScrollTarget(carousel, index)),
    behavior,
  });
}

function easeInOutQuart(progress: number) {
  return progress < 0.5
    ? 8 * progress ** 4
    : 1 - (-2 * progress + 2) ** 4 / 2;
}

type ScrollAnimationControls = {
  frameId: number | null;
};

function cancelScrollAnimation(controls: ScrollAnimationControls, carousel: HTMLDivElement) {
  if (controls.frameId !== null) {
    cancelAnimationFrame(controls.frameId);
    controls.frameId = null;
  }
  carousel.classList.add("snap-x", "snap-mandatory");
}

function animateScrollToCardIndex(
  carousel: HTMLDivElement,
  index: number,
  realCount: number,
  duration: number,
  controls: ScrollAnimationControls,
  onComplete?: () => void,
) {
  cancelScrollAnimation(controls, carousel);

  const targetLeft = Math.max(0, getCardScrollTarget(carousel, index));
  const startLeft = carousel.scrollLeft;
  const distance = targetLeft - startLeft;
  const trailingCloneIndex = getTrailingCloneIndex(realCount);
  const firstRealIndex = getFirstRealIndex();

  if (Math.abs(distance) < 1) {
    onComplete?.();
    return;
  }

  carousel.classList.remove("snap-x", "snap-mandatory");
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    carousel.scrollLeft = startLeft + distance * easeInOutQuart(progress);

    if (progress < 1) {
      controls.frameId = requestAnimationFrame(step);
      return;
    }

    let finalLeft = targetLeft;
    if (index === trailingCloneIndex) {
      finalLeft =
        targetLeft -
        getCloneLoopOffset(carousel, trailingCloneIndex, firstRealIndex);
    }

    carousel.scrollLeft = Math.max(0, finalLeft);
    controls.frameId = null;
    carousel.classList.add("snap-x", "snap-mandatory");
    onComplete?.();
  };

  controls.frameId = requestAnimationFrame(step);
}

function getActiveCardIndex(carousel: HTMLDivElement, slideCount: number) {
  const cards = Array.from(
    carousel.querySelectorAll<HTMLElement>("[data-testimonial-index]"),
  );
  if (cards.length === 0) return 0;

  const scrollLeft = carousel.scrollLeft;
  let activeIndex = 0;
  let minDistance = Infinity;

  for (let index = 0; index < cards.length; index += 1) {
    const card = cards[index];
    const snapLeft = getSnapTargetForIndex(
      carousel,
      card.offsetLeft,
      card.offsetWidth,
    );

    const distance = Math.abs(scrollLeft - snapLeft);
    if (distance < minDistance) {
      minDistance = distance;
      activeIndex = index;
    }
  }

  return activeIndex;
}

function applyBoundaryLoopJump(carousel: HTMLDivElement, realCount: number) {
  const firstRealIndex = getFirstRealIndex();
  const lastRealIndex = getLastRealIndex(realCount);
  const trailingCloneIndex = getTrailingCloneIndex(realCount);

  const firstReal = getCardElement(carousel, firstRealIndex);
  const lastReal = getCardElement(carousel, lastRealIndex);
  const leadingClone = getCardElement(carousel, LEADING_CLONE_INDEX);
  const trailingClone = getCardElement(carousel, trailingCloneIndex);
  if (!firstReal || !lastReal || !leadingClone || !trailingClone) return;

  const scrollLeft = carousel.scrollLeft;
  const trailingSnap = getSnapTargetForIndex(
    carousel,
    trailingClone.offsetLeft,
    trailingClone.offsetWidth,
  );
  const leadingSnap = getSnapTargetForIndex(
    carousel,
    leadingClone.offsetLeft,
    leadingClone.offsetWidth,
  );
  const lastRealSnap = getSnapTargetForIndex(
    carousel,
    lastReal.offsetLeft,
    lastReal.offsetWidth,
  );
  const firstRealSnap = getSnapTargetForIndex(
    carousel,
    firstReal.offsetLeft,
    firstReal.offsetWidth,
  );

  const forwardThreshold = (lastRealSnap + trailingSnap) / 2;
  const backwardThreshold = (leadingSnap + firstRealSnap) / 2;

  if (scrollLeft >= forwardThreshold) {
    carousel.scrollLeft -= getCloneLoopOffset(
      carousel,
      trailingCloneIndex,
      firstRealIndex,
    );
    return;
  }

  if (scrollLeft <= backwardThreshold) {
    carousel.scrollLeft += getCloneLoopOffset(
      carousel,
      lastRealIndex,
      LEADING_CLONE_INDEX,
    );
  }
}

function applyCloneLoopCorrection(
  carousel: HTMLDivElement,
  realCount: number,
  slideCount: number,
) {
  const firstRealIndex = getFirstRealIndex();
  const lastRealIndex = getLastRealIndex(realCount);
  const trailingCloneIndex = getTrailingCloneIndex(realCount);
  const activeIndex = getActiveCardIndex(carousel, slideCount);

  carousel.classList.remove("snap-x", "snap-mandatory");

  if (activeIndex === trailingCloneIndex) {
    carousel.scrollLeft -= getCloneLoopOffset(
      carousel,
      trailingCloneIndex,
      firstRealIndex,
    );
    carousel.classList.add("snap-x", "snap-mandatory");
    return firstRealIndex;
  }

  if (activeIndex === LEADING_CLONE_INDEX) {
    carousel.scrollLeft += getCloneLoopOffset(
      carousel,
      lastRealIndex,
      LEADING_CLONE_INDEX,
    );
    carousel.classList.add("snap-x", "snap-mandatory");
    return lastRealIndex;
  }

  carousel.classList.add("snap-x", "snap-mandatory");
  return activeIndex;
}

function scrollToSnapCard(
  carousel: HTMLDivElement,
  direction: "next" | "prev",
  realCount: number,
  slideCount: number,
  behavior: ScrollBehavior,
) {
  let activeIndex = getActiveCardIndex(carousel, slideCount);
  activeIndex = applyCloneLoopCorrection(carousel, realCount, slideCount);

  const trailingCloneIndex = getTrailingCloneIndex(realCount);
  const targetIndex =
    direction === "next"
      ? Math.min(activeIndex + 1, trailingCloneIndex)
      : Math.max(activeIndex - 1, LEADING_CLONE_INDEX);

  scrollToCardIndex(carousel, targetIndex, behavior);
}

function getSnapAlignClass(enabled: boolean) {
  return enabled ? "snap-center" : "";
}

function toVisualIndex(domIndex: number, realCount: number) {
  const firstRealIndex = getFirstRealIndex();
  const trailingCloneIndex = getTrailingCloneIndex(realCount);

  if (domIndex === trailingCloneIndex) return 0;
  if (domIndex === LEADING_CLONE_INDEX) return realCount - 1;
  return domIndex - firstRealIndex;
}

export default function TestimonialsClient() {
  const { title } = testimonialsContent;
  const { headingToCardsPx } = testimonialsLayout;
  const prefersReducedMotion = useReducedMotion();
  const realCount = testimonials.length;
  const carouselSlides = useMemo<CarouselSlide[]>(
    () => [
      {
        ...testimonials[testimonials.length - 1],
        slideKey: `${testimonials[testimonials.length - 1].id}-leading-clone`,
        isClone: true,
        cloneOf: testimonials.length - 1,
      },
      ...testimonials.map((testimonial) => ({
        ...testimonial,
        slideKey: testimonial.id,
      })),
      {
        ...testimonials[0],
        slideKey: `${testimonials[0].id}-trailing-clone`,
        isClone: true,
        cloneOf: 0,
      },
    ],
    [],
  );
  const slideCount = getSlideCount(realCount);
  const firstRealIndex = getFirstRealIndex();
  const trailingCloneIndex = getTrailingCloneIndex(realCount);

  const [activeCardIndex, setActiveCardIndex] = useState(firstRealIndex);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoplayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayPausedRef = useRef(false);
  const isSectionVisibleRef = useRef(false);
  const isAutoplayAnimatingRef = useRef(false);
  const lastScrollLeftRef = useRef(0);
  const scrollAnimationRef = useRef<ScrollAnimationControls>({ frameId: null });
  const dragState = useRef({
    active: false,
    dragging: false,
    pointerId: -1,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const scrollReconcileTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const reconcileCarouselPosition = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return firstRealIndex;
    return applyCloneLoopCorrection(carousel, realCount, slideCount);
  }, [firstRealIndex, realCount, slideCount]);

  const updateActiveCardIndex = useCallback(() => {
    setActiveCardIndex(reconcileCarouselPosition());
  }, [reconcileCarouselPosition]);

  const scheduleScrollEndReconcile = useCallback(() => {
    if (scrollReconcileTimeoutRef.current) {
      clearTimeout(scrollReconcileTimeoutRef.current);
    }

    scrollReconcileTimeoutRef.current = setTimeout(() => {
      scrollReconcileTimeoutRef.current = null;
      if (dragState.current.dragging || isAutoplayAnimatingRef.current) return;
      updateActiveCardIndex();
    }, 120);
  }, [updateActiveCardIndex]);

  const advanceCarousel = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel || isAutoplayAnimatingRef.current) return;

    let activeIndex = getActiveCardIndex(carousel, slideCount);
    if (
      activeIndex === trailingCloneIndex ||
      activeIndex === LEADING_CLONE_INDEX
    ) {
      activeIndex = applyCloneLoopCorrection(carousel, realCount, slideCount);
    }

    const nextIndex = activeIndex + 1;

    const finishAdvance = () => {
      isAutoplayAnimatingRef.current = false;
      setActiveCardIndex(
        nextIndex === trailingCloneIndex ? firstRealIndex : nextIndex,
      );
      lastScrollLeftRef.current = carousel.scrollLeft;
    };

    if (prefersReducedMotion) {
      scrollToCardIndex(carousel, nextIndex, "auto");
      finishAdvance();
      return;
    }

    isAutoplayAnimatingRef.current = true;
    animateScrollToCardIndex(
      carousel,
      nextIndex,
      realCount,
      TESTIMONIAL_AUTOPLAY_SCROLL_MS,
      scrollAnimationRef.current,
      finishAdvance,
    );
  }, [firstRealIndex, prefersReducedMotion, realCount, slideCount, trailingCloneIndex]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (
      prefersReducedMotion ||
      autoplayPausedRef.current ||
      !isSectionVisibleRef.current ||
      isAutoplayAnimatingRef.current
    ) {
      return;
    }

    stopAutoplay();
    autoplayTimeoutRef.current = setTimeout(() => {
      if (autoplayPausedRef.current || !isSectionVisibleRef.current) return;

      advanceCarousel();
      autoplayIntervalRef.current = setInterval(() => {
        if (autoplayPausedRef.current || !isSectionVisibleRef.current) return;
        advanceCarousel();
      }, TESTIMONIAL_AUTOPLAY_INTERVAL_MS);
    }, TESTIMONIAL_AUTOPLAY_INITIAL_DELAY_MS);
  }, [advanceCarousel, prefersReducedMotion, stopAutoplay]);

  const resetAutoplay = useCallback(() => {
    stopAutoplay();
    startAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const pauseAutoplay = useCallback(() => {
    autoplayPausedRef.current = true;
    stopAutoplay();
    const carousel = carouselRef.current;
    if (carousel) {
      cancelScrollAnimation(scrollAnimationRef.current, carousel);
      isAutoplayAnimatingRef.current = false;
    }
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

  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    scrollToCardIndex(carousel, firstRealIndex, "auto");
    lastScrollLeftRef.current = carousel.scrollLeft;
    updateActiveCardIndex();
  }, [firstRealIndex, updateActiveCardIndex]);

  useEffect(() => {
    return () => {
      const carousel = carouselRef.current;
      if (carousel) {
        cancelScrollAnimation(scrollAnimationRef.current, carousel);
      }
      if (scrollReconcileTimeoutRef.current) {
        clearTimeout(scrollReconcileTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScrollEnd = () => {
      if (scrollReconcileTimeoutRef.current) {
        clearTimeout(scrollReconcileTimeoutRef.current);
        scrollReconcileTimeoutRef.current = null;
      }
      if (dragState.current.dragging || isAutoplayAnimatingRef.current) return;
      updateActiveCardIndex();
    };

    carousel.addEventListener("scrollend", handleScrollEnd);
    return () => carousel.removeEventListener("scrollend", handleScrollEnd);
  }, [updateActiveCardIndex]);

  const onWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      event.preventDefault();
      resetAutoplay();
      carousel.scrollBy({
        left: event.deltaY,
        behavior: "auto",
      });
    },
    [resetAutoplay],
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
      if (!prefersReducedMotion) {
        carousel.classList.remove("snap-x", "snap-mandatory");
      }
    }

    carousel.scrollLeft = dragState.current.scrollLeft - deltaX;
    clampScrollLeft(carousel);
    applyBoundaryLoopJump(carousel, realCount);
    dragState.current.scrollLeft = carousel.scrollLeft + deltaX;
  }, [prefersReducedMotion, realCount]);

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
      if (!prefersReducedMotion) {
        carousel.classList.add("snap-x", "snap-mandatory");
      }
      window.setTimeout(() => {
        dragState.current.moved = false;
      }, 0);
      scheduleScrollEndReconcile();
    } else {
      if (!prefersReducedMotion) {
        carousel.classList.add("snap-x", "snap-mandatory");
      }
      resumeAutoplay();
    }
  }, [prefersReducedMotion, resetAutoplay, resumeAutoplay, scheduleScrollEndReconcile]);

  const visualCardIndex = toVisualIndex(activeCardIndex, realCount);

  return (
    <section ref={sectionRef} aria-label="Recommendations" className="w-full bg-white">
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
            className={`overflow-x-auto overscroll-x-contain scroll-px-6 [touch-action:pan-x] [-ms-overflow-style:none] [scrollbar-width:none] md:scroll-px-[88px] [&::-webkit-scrollbar]:hidden ${prefersReducedMotion ? "" : "snap-x snap-mandatory"}`}
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
              if (!carousel) return;
              clampScrollLeft(carousel);

              if (!isAutoplayAnimatingRef.current) {
                if (!dragState.current.dragging) {
                  applyBoundaryLoopJump(carousel, realCount);
                }

                setActiveCardIndex(getActiveCardIndex(carousel, slideCount));
                if (!dragState.current.dragging) {
                  scheduleScrollEndReconcile();
                }
              }
              lastScrollLeftRef.current = carousel.scrollLeft;
            }}
            onKeyDown={(event) => {
              const carousel = carouselRef.current;
              if (!carousel) return;

              if (event.key === "ArrowRight") {
                event.preventDefault();
                resetAutoplay();
                scrollToSnapCard(carousel, "next", realCount, slideCount, "auto");
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                resetAutoplay();
                scrollToSnapCard(carousel, "prev", realCount, slideCount, "auto");
              }
            }}
          >
            <div
              className="flex w-max items-stretch px-6 md:px-[88px]"
              style={{ gap: TESTIMONIAL_CARD_GAP }}
            >
              {carouselSlides.map((slide, index) => (
                <div
                  key={slide.slideKey}
                  role="listitem"
                  data-testimonial-index={index}
                  aria-hidden={slide.isClone ? true : undefined}
                  className={`flex shrink-0 ${getSnapAlignClass(!prefersReducedMotion)}`}
                >
                  <TestimonialCard testimonial={slide} />
                </div>
              ))}
            </div>
          </div>

          <CarouselEdgeFade side="left" visible={visualCardIndex > 0} />
          <CarouselEdgeFade side="right" visible={visualCardIndex < realCount - 1} />
        </div>
      </div>
    </section>
  );
}
