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
import { useEffect, useRef, type ReactNode } from "react";
import { journalOpenSpreadImage, journalSectionFrame } from "@/lib/content/journal";
import { useMediaQuery } from "@/lib/use-media-query";

const JOURNAL_SECTION_HEIGHT = 918;
const WORK_JOURNAL_GAP = 100;
const JOURNAL_COVER_SRC = "/Journal/journal-cover.png";
const JOURNAL_OPEN_WIDTH = journalOpenSpreadImage.width;
const JOURNAL_OPEN_HEIGHT = journalOpenSpreadImage.height;
const JOURNAL_COVER_WIDTH = JOURNAL_OPEN_WIDTH / 2;
const JOURNAL_COVER_HEIGHT = JOURNAL_OPEN_HEIGHT;
const JOURNAL_COVER_BACK_COLOR = "#1B5E44";
const BOOK_PERSPECTIVE = 1600;
const COVER_ROTATE_OPEN = -162;
const OPEN_DELAY_S = 1.1;
/** Figma open spread — soft perimeter shadow, not clipped by the flip mask. */
const BOOK_DROP_SHADOW = "drop-shadow(0px 28px 70px rgba(32, 44, 61, 0.22))";
const SHADOW_BLEED = 48;

/** Heavy passport-style spring — low bounce, continuous motion. */
const FLIP_SPRING = {
  type: "spring" as const,
  stiffness: 88,
  damping: 30,
  mass: 1.28,
  restDelta: 0.001,
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
}: {
  className?: string;
  responsive?: boolean;
}) {
  const spread = journalOpenSpreadImage;

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={
        responsive
          ? {
              width: "100%",
              maxWidth: JOURNAL_OPEN_WIDTH,
              aspectRatio: `${JOURNAL_OPEN_WIDTH} / ${JOURNAL_OPEN_HEIGHT}`,
            }
          : { width: JOURNAL_OPEN_WIDTH, height: JOURNAL_OPEN_HEIGHT }
      }
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

/**
 * Passport-style journal flip.
 * - Fixed 988px stage keeps the book centered while the reveal mask widens.
 * - Drop shadow sits outside the clip mask (Figma-style, no hard cut-off).
 * - Cover rotates from the left spine without shifting the diary sideways.
 */
function JournalBook({ play }: { play: boolean }) {
  const shellWidth = useMotionValue(JOURNAL_COVER_WIDTH);
  const coverRotateY = useMotionValue(0);
  const shellOffsetX = useTransform(
    shellWidth,
    (w) => (JOURNAL_OPEN_WIDTH - w) / 2,
  );

  useEffect(() => {
    if (!play) return;

    const delayTimer = window.setTimeout(() => {
      animate(shellWidth, JOURNAL_OPEN_WIDTH, FLIP_SPRING);
      animate(coverRotateY, COVER_ROTATE_OPEN, FLIP_SPRING);
    }, OPEN_DELAY_S * 1000);

    return () => {
      window.clearTimeout(delayTimer);
    };
  }, [play, shellWidth, coverRotateY]);

  return (
    <div
      className="relative shrink-0 overflow-visible"
      style={{
        width: JOURNAL_OPEN_WIDTH,
        height: JOURNAL_OPEN_HEIGHT,
        padding: SHADOW_BLEED,
        margin: -SHADOW_BLEED,
      }}
    >
      <div
        className="relative"
        style={{
          width: JOURNAL_OPEN_WIDTH,
          height: JOURNAL_OPEN_HEIGHT,
          filter: BOOK_DROP_SHADOW,
        }}
      >
        <motion.div
          className="absolute left-0 top-0 overflow-hidden"
          style={{
            width: shellWidth,
            x: shellOffsetX,
            height: JOURNAL_OPEN_HEIGHT,
            borderRadius: 4,
          }}
        >
          <div
            className="relative"
            style={{
              width: JOURNAL_OPEN_WIDTH,
              height: JOURNAL_OPEN_HEIGHT,
              perspective: BOOK_PERSPECTIVE,
              perspectiveOrigin: "left center",
              transformStyle: "preserve-3d",
            }}
          >
            <JournalOpenSpread className="absolute left-0 top-0" />

            <motion.div
              className="absolute left-0 top-0 z-10"
              style={{
                width: JOURNAL_COVER_WIDTH,
                height: JOURNAL_COVER_HEIGHT,
                rotateY: coverRotateY,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                willChange: play ? "transform" : "auto",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <JournalClosedCover />
              </div>

              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  backgroundColor: JOURNAL_COVER_BACK_COLOR,
                }}
                aria-hidden
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Journal() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isStatic = prefersReducedMotion || isMobile;
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });
  const playAnimation = isInView && !isStatic;

  useJournalAssetPreload();

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
        <div className="flex w-full justify-center overflow-visible">
          {isStatic ? (
            <JournalOpenSpread responsive className="mx-auto w-full" />
          ) : (
            <JournalBook play={playAnimation} />
          )}
        </div>
      </JournalSectionFrame>
    </section>
  );
}
