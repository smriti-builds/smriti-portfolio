"use client";

import type { ReactNode } from "react";
import { useCallback, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  EXPERIMENT_CAROUSEL_END_PADDING,
  experimentCards,
  experimentsAssets,
  experimentsContent,
} from "@/lib/content/experiments";
import ExperimentCard from "@/sections/experiments/ExperimentCard";

const HEADER_TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

function ExperimentsGridContainer({ children }: { children: ReactNode }) {
  const { basePattern } = experimentsAssets;

  return (
    <div className="relative overflow-hidden rounded-[24px]">
      <Image
        src={basePattern.src}
        alt=""
        aria-hidden
        width={basePattern.width}
        height={basePattern.height}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        sizes="(max-width: 1440px) 100vw, 1440px"
        priority
      />
      <div className="relative py-10 md:py-12 pl-6 md:pl-10">{children}</div>
    </div>
  );
}

function clampScrollLeft(carousel: HTMLDivElement) {
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  if (carousel.scrollLeft > maxScrollLeft) {
    carousel.scrollLeft = maxScrollLeft;
  }
  if (carousel.scrollLeft < 0) {
    carousel.scrollLeft = 0;
  }
}

export default function ExperimentsClient() {
  const { title, subtitle } = experimentsContent;
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
      id="experiments"
      aria-label="Gen AI experiments"
      className="w-full min-w-0 overflow-x-clip bg-white"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-[88px] md:py-[100px]">
        <header className="mb-16 max-w-2xl">
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

        <ExperimentsGridContainer>
          <div
            ref={carouselRef}
            role="list"
            aria-label="Gen AI experiment artifacts"
            className="experiments-carousel -ml-6 w-[calc(100%+24px)] cursor-grab overflow-x-auto overscroll-x-contain scroll-smooth pb-1 [touch-action:pan-x] [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing md:-ml-10 md:w-[calc(100%+40px)] [&::-webkit-scrollbar]:hidden"
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
              className="flex w-max gap-8 pl-6 md:pl-10"
              style={{ paddingRight: EXPERIMENT_CAROUSEL_END_PADDING }}
            >
              {experimentCards.map((card, index) => (
                <div key={card.id} role="listitem" className="shrink-0">
                  <ExperimentCard card={card} index={index} />
                </div>
              ))}
            </div>
          </div>
        </ExperimentsGridContainer>
      </div>
    </section>
  );
}
