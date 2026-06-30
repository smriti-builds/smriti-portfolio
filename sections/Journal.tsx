"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { journalOpenSpreadImage, journalSectionFrame, journalSpreadDropShadow } from "@/lib/content/journal";
import { useMediaQuery } from "@/lib/use-media-query";

const JOURNAL_SECTION_HEIGHT = 918;
const WORK_JOURNAL_GAP = 100;
const JOURNAL_COVER_SRC = "/Journal/journal-cover.png";
const JOURNAL_OPEN_WIDTH = journalOpenSpreadImage.width;
const JOURNAL_OPEN_HEIGHT = journalOpenSpreadImage.height;
const JOURNAL_COVER_WIDTH = JOURNAL_OPEN_WIDTH / 2;
const JOURNAL_COVER_HEIGHT = JOURNAL_OPEN_HEIGHT;
const JOURNAL_COVER_BACK_COLOR = "#1B5E44";
const BOOK_PERSPECTIVE = 2200;
const PAGE_DEPTH = 12;
const COVER_ROTATE_OPEN = -178;

const FLIP_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const FLIP_DURATION = 1.1;

const FLIP_TRANSITION = {
  duration: FLIP_DURATION,
  ease: FLIP_EASE,
};

function JournalTornTopEdge() {
  const { tornEdgeTop } = journalSectionFrame;

  return (
    <div className="w-full bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tornEdgeTop}
        alt=""
        aria-hidden
        width={2880}
        height={54}
        className="block w-full min-w-full max-w-none leading-[0]"
        style={{ aspectRatio: "2880 / 54" }}
      />
    </div>
  );
}

function JournalTornBottomEdge() {
  const { tornEdgeBottom } = journalSectionFrame;

  return (
    <div className="w-full bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tornEdgeBottom}
        alt=""
        aria-hidden
        width={2880}
        height={54}
        className="block w-full min-w-full max-w-none scale-y-[-1] leading-[0]"
        style={{ aspectRatio: "2880 / 54" }}
      />
    </div>
  );
}

function JournalSectionFrame({ children }: { children: ReactNode }) {
  const { background } = journalSectionFrame;

  return (
    <div className="relative w-full">
      <div
        className="relative flex w-full items-center justify-center overflow-visible px-6 md:px-[88px]"
        style={{ backgroundColor: background, height: JOURNAL_SECTION_HEIGHT }}
      >
        {children}
      </div>
      <JournalTornBottomEdge />
    </div>
  );
}

function useJournalAssetPreload() {
  useEffect(() => {
    for (const src of [journalOpenSpreadImage.src, JOURNAL_COVER_SRC]) {
      const img = new window.Image();
      img.src = src;
    }
  }, []);
}

function JournalOpenSpread({
  className = "",
  responsive = false,
  withShadow = true,
}: {
  className?: string;
  responsive?: boolean;
  withShadow?: boolean;
}) {
  const spread = journalOpenSpreadImage;

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{
        ...(responsive
          ? {
              width: "100%",
              maxWidth: JOURNAL_OPEN_WIDTH,
              aspectRatio: `${JOURNAL_OPEN_WIDTH} / ${JOURNAL_OPEN_HEIGHT}`,
            }
          : { width: JOURNAL_OPEN_WIDTH, height: JOURNAL_OPEN_HEIGHT }),
        ...(withShadow ? { filter: journalSpreadDropShadow } : {}),
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={spread.src}
        alt="Open journal spread with notes, sketches, and portfolio details"
        width={JOURNAL_OPEN_WIDTH}
        height={JOURNAL_OPEN_HEIGHT}
        className="size-full object-cover"
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </div>
  );
}

function JournalClosedCover() {
  return (
    <div
      className="relative size-full"
      style={{ width: JOURNAL_COVER_WIDTH, height: JOURNAL_COVER_HEIGHT }}
    >
      <Image
        src={JOURNAL_COVER_SRC}
        alt="Closed journal with collage cover art"
        width={JOURNAL_COVER_WIDTH}
        height={JOURNAL_COVER_HEIGHT}
        className="size-full object-cover"
        priority
        draggable={false}
      />
    </div>
  );
}

function JournalClosedView({
  className = "",
  responsive = false,
}: {
  className?: string;
  responsive?: boolean;
}) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{
        ...(responsive
          ? {
              width: "100%",
              maxWidth: JOURNAL_COVER_WIDTH,
              aspectRatio: `${JOURNAL_COVER_WIDTH} / ${JOURNAL_COVER_HEIGHT}`,
            }
          : { width: JOURNAL_COVER_WIDTH, height: JOURNAL_COVER_HEIGHT }),
        filter: journalSpreadDropShadow,
      }}
    >
      <JournalClosedCover />
    </div>
  );
}

function BookPageEdge({ height, depth }: { height: number; depth: number }) {
  return (
    <div
      aria-hidden
      className="absolute left-full top-0"
      style={{
        width: depth,
        height,
        transformOrigin: "left center",
        transform: "rotateY(90deg)",
        transformStyle: "preserve-3d",
        background:
          "linear-gradient(90deg, #e3e0d8 0%, #f7f5f0 42%, #d5d0c7 78%, #c8c2b8 100%)",
      }}
    />
  );
}

function BookPageBottomEdge({ width, depth }: { width: number; depth: number }) {
  return (
    <div
      aria-hidden
      className="absolute left-0 top-full"
      style={{
        width,
        height: depth,
        transformOrigin: "top center",
        transform: "rotateX(-90deg)",
        transformStyle: "preserve-3d",
        background:
          "linear-gradient(180deg, #ebe8e1 0%, #d8d3ca 52%, #c4beb4 100%)",
      }}
    />
  );
}

function BookCoverEdge({
  height,
  depth,
  color,
}: {
  height: number;
  depth: number;
  color: string;
}) {
  return (
    <div
      aria-hidden
      className="absolute left-0 top-0"
      style={{
        width: depth,
        height,
        transformOrigin: "left center",
        transform: "rotateY(-90deg)",
        transformStyle: "preserve-3d",
        background: `linear-gradient(180deg, ${color} 0%, #123d2d 100%)`,
      }}
    />
  );
}

/**
 * Physical journal — fixed viewport, hinge at left spine, no clipping.
 */
function JournalBook({ isOpen }: { isOpen: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const coverRotateY = useMotionValue(0);

  const coverLift = useTransform(
    coverRotateY,
    (rotate) => Math.sin((Math.abs(rotate) * Math.PI) / 180) * 14,
  );

  const coverShadow = useTransform(coverRotateY, (rotate) => {
    const progress = Math.min(Math.abs(rotate) / 180, 1);
    const lift = Math.sin((Math.abs(rotate) * Math.PI) / 180);
    const y = 6 + lift * 26;
    const blur = 14 + progress * 52;
    const spread = -6 + progress * 10;
    const alpha = 0.1 + progress * 0.16;
    return `0px ${y}px ${blur}px ${spread}px rgba(32, 44, 61, ${alpha})`;
  });

  const bookDropShadow = useTransform(coverRotateY, (rotate) => {
    const progress = Math.min(Math.abs(rotate) / 180, 1);
    const lift = Math.sin((Math.abs(rotate) * Math.PI) / 180);
    const y1 = 2 + lift * 5;
    const blur1 = 6 + progress * 10;
    const y2 = 12 + lift * 18;
    const blur2 = 28 + progress * 32;
    const y3 = 28 + lift * 32;
    const blur3 = 56 + progress * 44;
    const alpha1 = 0.04 + progress * 0.03;
    const alpha2 = 0.07 + progress * 0.05;
    const alpha3 = 0.09 + progress * 0.04;
    return `drop-shadow(0 ${y1}px ${blur1}px rgba(32, 44, 61, ${alpha1})) drop-shadow(0 ${y2}px ${blur2}px rgba(32, 44, 61, ${alpha2})) drop-shadow(0 ${y3}px ${blur3}px rgba(32, 44, 61, ${alpha3}))`;
  });

  const coverCastOpacity = useTransform(coverRotateY, (rotate) => {
    const progress = Math.min(Math.abs(rotate) / 180, 1);
    if (progress < 0.06 || progress > 0.94) return 0;
    return Math.sin(progress * Math.PI) * 0.32;
  });

  const spreadOpacity = useTransform(coverRotateY, (rotate) => {
    if (rotate > -24) return 0;
    if (rotate < -108) return 1;
    return (Math.abs(rotate) - 24) / 84;
  });

  const bookOffsetX = useTransform(
    coverRotateY,
    [0, COVER_ROTATE_OPEN],
    [JOURNAL_COVER_WIDTH / 2, 0],
  );

  useEffect(() => {
    const transition = prefersReducedMotion ? { duration: 0 } : FLIP_TRANSITION;
    const controls = animate(
      coverRotateY,
      isOpen ? COVER_ROTATE_OPEN : 0,
      transition,
    );

    return () => {
      controls.stop();
    };
  }, [isOpen, coverRotateY, prefersReducedMotion]);

  const halfDepth = PAGE_DEPTH / 2;

  return (
    <motion.div
      className="relative shrink-0 overflow-visible"
      style={{
        width: JOURNAL_OPEN_WIDTH,
        height: JOURNAL_OPEN_HEIGHT,
        filter: bookDropShadow,
      }}
    >
      <div
        style={{
          width: JOURNAL_OPEN_WIDTH,
          height: JOURNAL_OPEN_HEIGHT,
          perspective: BOOK_PERSPECTIVE,
          perspectiveOrigin: "left center",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="relative overflow-visible"
          style={{
            width: JOURNAL_OPEN_WIDTH,
            height: JOURNAL_OPEN_HEIGHT,
            transformStyle: "preserve-3d",
            x: bookOffsetX,
          }}
        >
          <div
            className="relative overflow-visible"
            style={{
              width: JOURNAL_OPEN_WIDTH,
              height: JOURNAL_OPEN_HEIGHT,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              className="pointer-events-none absolute left-0 top-0 overflow-visible"
              style={{
                opacity: spreadOpacity,
                transformStyle: "preserve-3d",
              }}
              aria-hidden={!isOpen}
            >
              <div
                className="relative overflow-visible"
                style={{
                  width: JOURNAL_OPEN_WIDTH,
                  height: JOURNAL_OPEN_HEIGHT,
                  transformStyle: "preserve-3d",
                  transform: `translateZ(-${halfDepth}px)`,
                }}
              >
                <JournalOpenSpread withShadow={false} />
                <BookPageEdge height={JOURNAL_OPEN_HEIGHT} depth={PAGE_DEPTH} />
                <BookPageBottomEdge width={JOURNAL_OPEN_WIDTH} depth={PAGE_DEPTH} />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    opacity: coverCastOpacity,
                    background:
                      "linear-gradient(90deg, rgba(18, 44, 34, 0.42) 0%, rgba(18, 44, 34, 0.18) 28%, transparent 58%)",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="absolute left-0 top-0 z-10 overflow-visible"
              style={{
                width: JOURNAL_COVER_WIDTH,
                height: JOURNAL_COVER_HEIGHT,
                rotateY: coverRotateY,
                translateZ: coverLift,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                boxShadow: coverShadow,
                willChange: "transform",
              }}
            >
              <BookCoverEdge
                height={JOURNAL_COVER_HEIGHT}
                depth={PAGE_DEPTH}
                color={JOURNAL_COVER_BACK_COLOR}
              />

              <div
                className="absolute inset-0 overflow-hidden rounded-r-[3px]"
                style={{
                  transform: `translateZ(${halfDepth}px)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
              >
                <JournalClosedCover />
              </div>

              <div
                className="absolute inset-0 overflow-hidden rounded-l-[2px]"
                style={{
                  transform: `rotateY(180deg) translateZ(${halfDepth}px)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  backgroundColor: JOURNAL_COVER_BACK_COLOR,
                }}
                aria-hidden
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Journal() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isStatic = prefersReducedMotion || isMobile;
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });
  const playAnimation = isInView && !isStatic;
  const hasAutoOpened = useRef(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isStatic) {
      setIsOpen(true);
      return;
    }
    if (playAnimation && !hasAutoOpened.current) {
      hasAutoOpened.current = true;
      setIsOpen(true);
    }
  }, [isStatic, playAnimation]);

  useJournalAssetPreload();

  const toggleJournal = () => setIsOpen((open) => !open);

  return (
    <section
      ref={sectionRef}
      id="journal"
      aria-label="Journal"
      className="relative w-full"
    >
      <div
        className="w-full bg-white"
        style={{ height: WORK_JOURNAL_GAP }}
        aria-hidden
      />
      <JournalTornTopEdge />
      <JournalSectionFrame>
        <div className="flex w-full justify-center">
          <button
            type="button"
            aria-label={isOpen ? "Close journal" : "Open journal"}
            aria-expanded={isOpen}
            onClick={toggleJournal}
            className="cursor-pointer overflow-visible border-0 bg-transparent p-0 select-none"
          >
            {isStatic ? (
              isOpen ? (
                <JournalOpenSpread responsive className="mx-auto w-full" />
              ) : (
                <JournalClosedView responsive className="mx-auto w-full" />
              )
            ) : (
              <JournalBook isOpen={isOpen} />
            )}
          </button>
        </div>
      </JournalSectionFrame>
    </section>
  );
}
