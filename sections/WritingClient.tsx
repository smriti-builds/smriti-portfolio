"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  WRITING_CAROUSEL_END_PADDING,
  writingAssets,
  writingContent,
  writingPosts,
} from "@/lib/content/writing";
import WritingCard from "@/sections/writing/WritingCard";

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

export default function WritingClient() {
  const { title, subtitle } = writingContent;
  const { topSeparator, bottomSeparator } = writingAssets;
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
    carousel.scrollTo({ left: 0, behavior: "auto" });
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
    <section
      id="writing"
      aria-label="A record of curiosity"
      className="relative w-full overflow-hidden bg-white"
    >
      <Image
        src={topSeparator.src}
        alt=""
        aria-hidden
        width={topSeparator.width}
        height={topSeparator.height}
        className="pointer-events-none absolute left-0 top-0 z-0 w-full min-w-[1440px] max-w-none -translate-y-[18%] select-none"
        sizes="100vw"
        priority
      />
      <Image
        src={bottomSeparator.src}
        alt=""
        aria-hidden
        width={bottomSeparator.width}
        height={bottomSeparator.height}
        className="pointer-events-none absolute bottom-0 right-0 z-0 w-full min-w-[1440px] max-w-none translate-y-[18%] select-none"
        sizes="100vw"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 md:px-[88px] md:py-[100px]">
        <header className="mx-auto mb-16 max-w-2xl text-center">
          <motion.h2
            className="font-inter text-4xl font-semibold text-text-primary md:text-5xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={HEADER_TRANSITION}
          >
            {title}
          </motion.h2>
          <motion.p
            className="mt-4 font-instrument-serif text-2xl italic text-text-secondary md:text-[36px] md:leading-[44px]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...HEADER_TRANSITION, delay: 0.06 }}
          >
            {subtitle}
          </motion.p>
        </header>

        <div
          ref={carouselRef}
          role="list"
          aria-label="Writing posts"
          className="-mr-6 w-[calc(100%+24px)] cursor-grab overflow-x-auto overscroll-x-contain scroll-smooth pb-1 [touch-action:pan-x] [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing md:-mr-[88px] md:w-[calc(100%+88px)] [&::-webkit-scrollbar]:hidden"
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
            className="flex w-max gap-8"
            style={{ paddingRight: WRITING_CAROUSEL_END_PADDING }}
          >
            {writingPosts.map((post, index) => (
              <div key={post.id} role="listitem" className="shrink-0">
                <WritingCard post={post} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
