"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import {
  journalContent,
  journalOpenSpreadImage,
  journalSectionFrame,
} from "@/lib/content/journal";
import { useMediaQuery } from "@/lib/use-media-query";

const JOURNAL_SECTION_HEIGHT = 918;
const FLIP_EASE = [0.32, 0.72, 0, 1] as const;
const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const WORK_JOURNAL_GAP = 100;
const JOURNAL_COVER_SRC = "/Journal/journal-cover.png";
const JOURNAL_COVER_WIDTH = 494;
const JOURNAL_COVER_HEIGHT = 704;
const JOURNAL_COVER_BACK_COLOR = "#1B5E44";
const BOOK_PERSPECTIVE = 1400;

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

/** Passport-style 3D flip: cover rotates from the left spine to reveal the spread. */
function JournalBookFlipStage({ play }: { play: boolean }) {
  const spread = journalOpenSpreadImage;

  return (
    <div
      className="relative shrink-0"
      style={{
        width: JOURNAL_COVER_WIDTH,
        height: JOURNAL_COVER_HEIGHT,
        perspective: BOOK_PERSPECTIVE,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ transform: "translateZ(-1px)" }}
      >
        <div
          className="relative"
          style={{ width: spread.width, height: spread.height }}
        >
          <Image
            src={spread.src}
            alt=""
            aria-hidden
            fill
            sizes={`${spread.width}px`}
            className="object-contain drop-shadow-[0_28px_70px_-24px_rgba(32,44,61,0.22)]"
            draggable={false}
          />
        </div>
      </div>

      <motion.div
        className="absolute inset-0"
        initial={{ rotateY: 0, scale: 1 }}
        animate={
          play
            ? {
                rotateY: -158,
                scale: [0.84, 1, 1],
                boxShadow: [
                  "0px 12px 36px -14px rgba(32, 44, 61, 0.18)",
                  "0px 28px 64px -20px rgba(32, 44, 61, 0.34)",
                  "0px 18px 48px -16px rgba(32, 44, 61, 0.28)",
                ],
              }
            : { rotateY: 0, scale: 1 }
        }
        transition={{
          scale: { duration: 0.55, times: [0, 0.45, 1], ease: REVEAL_EASE },
          rotateY: { delay: 0.45, duration: 1.15, ease: FLIP_EASE },
          boxShadow: { delay: 0.45, duration: 1.15, ease: "easeInOut" },
        }}
        style={{
          transformOrigin: "left center",
          transformStyle: "preserve-3d",
          boxShadow: "0px 12px 36px -14px rgba(32, 44, 61, 0.18)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <JournalClosedSection className="size-full" />
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
  );
}

/** Figma 1084:15781 — dark green collage journal cover */
function JournalClosedSection({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: JOURNAL_COVER_WIDTH, height: JOURNAL_COVER_HEIGHT }}
    >
      <Image
        src={JOURNAL_COVER_SRC}
        alt="Closed journal with collage cover art"
        width={JOURNAL_COVER_WIDTH}
        height={JOURNAL_COVER_HEIGHT}
        className="size-full object-contain"
        priority
        draggable={false}
      />
    </div>
  );
}

function OpenJournalLayout() {
  const { kicker, kickerAccent, intro, headline, body } = journalContent;
  const spread = journalOpenSpreadImage;

  return (
    <div className="mx-auto grid w-full max-w-[1266px] gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
      <div className="flex flex-col gap-6 lg:max-w-[520px]">
        <div className="flex flex-col gap-1">
          <p className="font-instrument-serif text-[32px] uppercase leading-none tracking-[0.08em] text-text-primary md:text-[40px]">
            {kicker}
          </p>
          <p className="font-instrument-serif text-[32px] italic leading-none tracking-[0.04em] text-text-primary md:text-[40px]">
            {kickerAccent}
          </p>
        </div>
        <p className="font-instrument-sans text-[18px] leading-[28px] text-text-secondary">
          {intro}
        </p>
        <h2 className="font-instrument-sans text-[36px] font-bold leading-[1.15] text-text-primary md:text-[44px] md:leading-[52px]">
          {headline}
        </h2>
        <p className="font-instrument-sans text-[18px] leading-[28px] text-text-secondary">
          {body}
        </p>
      </div>

      <div
        className="relative mx-auto w-full max-w-[493px] lg:mx-0 lg:justify-self-end"
        style={{ aspectRatio: `${spread.width} / ${spread.height}` }}
      >
        <Image
          src={spread.src}
          alt="Open journal spread with notes and sketches"
          fill
          sizes="(max-width: 1024px) 100vw, 493px"
          className="object-contain drop-shadow-[0_28px_70px_-24px_rgba(32,44,61,0.22)]"
        />
      </div>
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
      {isStatic ? (
        <JournalSectionFrame>
          <OpenJournalLayout />
        </JournalSectionFrame>
      ) : (
        <JournalSectionFrame>
          <div className="relative flex h-full w-full items-center justify-center">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={
                playAnimation ? { opacity: [1, 1, 0] } : { opacity: 1 }
              }
              transition={{
                duration: 2.1,
                times: [0, 0.72, 1],
                ease: "easeInOut",
              }}
            >
              <JournalBookFlipStage play={playAnimation} />
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center"
              initial={{ opacity: 0, y: 24 }}
              animate={
                playAnimation
                  ? { opacity: [0, 0, 1], y: [24, 24, 0] }
                  : { opacity: 0, y: 24 }
              }
              transition={{
                duration: 2.1,
                times: [0, 0.68, 1],
                ease: REVEAL_EASE,
              }}
            >
              <OpenJournalLayout />
            </motion.div>
          </div>
        </JournalSectionFrame>
      )}
    </section>
  );
}
