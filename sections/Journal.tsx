"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { journalOpenSpreadImage, journalSectionFrame } from "@/lib/content/journal";
import { useMediaQuery } from "@/lib/use-media-query";

const JOURNAL_SECTION_HEIGHT = 918;
const WORK_JOURNAL_GAP = 100;
const JOURNAL_COVER_SRC = "/Journal/journal-cover.png";
const JOURNAL_COVER_WIDTH = 494;
const JOURNAL_COVER_HEIGHT = 704;
const JOURNAL_OPEN_WIDTH = 988;
const JOURNAL_OPEN_HEIGHT = 704;
const JOURNAL_COVER_BACK_COLOR = "#1B5E44";
const BOOK_PERSPECTIVE = 1400;
const COVER_ROTATE_OPEN = -158;

const FLIP_TRANSITION = {
  type: "spring" as const,
  stiffness: 118,
  damping: 26,
  mass: 1.12,
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
        className="relative flex w-full items-center justify-center px-6 md:px-[88px]"
        style={{ backgroundColor: background, height: JOURNAL_SECTION_HEIGHT }}
      >
        {children}
      </div>
      <JournalTornBottomEdge />
    </div>
  );
}

function JournalOpenSpread({
  className = "",
  priority = false,
  responsive = false,
}: {
  className?: string;
  priority?: boolean;
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
      <Image
        src={spread.src}
        alt="Open journal spread with notes, sketches, and portfolio details"
        width={JOURNAL_OPEN_WIDTH}
        height={JOURNAL_OPEN_HEIGHT}
        className="size-full object-cover"
        priority={priority}
        draggable={false}
      />
    </div>
  );
}

/** Figma 1084:15781 — dark green collage journal cover */
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

/** Single book object: cover flips on the left spine to reveal the open spread behind it. */
function JournalBook({ play }: { play: boolean }) {
  return (
    <div
      className="relative shrink-0"
      style={{
        height: JOURNAL_OPEN_HEIGHT,
        perspective: BOOK_PERSPECTIVE,
      }}
    >
      <motion.div
        className="relative overflow-hidden"
        style={{
          height: JOURNAL_OPEN_HEIGHT,
          transformStyle: "preserve-3d",
        }}
        initial={{ width: JOURNAL_COVER_WIDTH }}
        animate={{ width: play ? JOURNAL_OPEN_WIDTH : JOURNAL_COVER_WIDTH }}
        transition={FLIP_TRANSITION}
      >
        <JournalOpenSpread
          className="absolute left-0 top-0"
          priority={play}
        />

        <motion.div
          className="absolute left-0 top-0 z-10"
          style={{
            width: JOURNAL_COVER_WIDTH,
            height: JOURNAL_COVER_HEIGHT,
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
            boxShadow: "0px 14px 40px -16px rgba(32, 44, 61, 0.22)",
          }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: play ? COVER_ROTATE_OPEN : 0 }}
          transition={FLIP_TRANSITION}
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
      </motion.div>
    </div>
  );
}

export default function Journal() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isStatic = prefersReducedMotion || isMobile;
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });
  const playAnimation = isInView && !isStatic;

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
