"use client";

import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import {
  journalContent,
  journalOpenSpreadImage,
  journalSectionFrame,
} from "@/lib/content/journal";
import { useMediaQuery } from "@/lib/use-media-query";

const SECTION_SCROLL_HEIGHT = "220vh";
const JOURNAL_SECTION_HEIGHT = 918;
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
function JournalBookFlipStage({
  coverScale,
  coverRotateY,
}: {
  coverScale: MotionValue<number>;
  coverRotateY: MotionValue<number>;
}) {
  const spread = journalOpenSpreadImage;
  const coverShadow = useTransform(
    coverRotateY,
    [-158, -90, 0],
    [
      "0px 18px 48px -16px rgba(32, 44, 61, 0.28)",
      "0px 28px 64px -20px rgba(32, 44, 61, 0.34)",
      "0px 12px 36px -14px rgba(32, 44, 61, 0.18)",
    ],
  );

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
        style={{
          rotateY: coverRotateY,
          scale: coverScale,
          transformOrigin: "left center",
          transformStyle: "preserve-3d",
          boxShadow: coverShadow,
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "end 0.12"],
  });

  const popProgress = useSpring(
    useTransform(scrollYProgress, [0, 0.18], [0, 1]),
    { stiffness: 260, damping: 26, mass: 0.8 },
  );

  const flipProgress = useSpring(
    useTransform(scrollYProgress, [0.2, 0.55], [0, 1]),
    { stiffness: 200, damping: 28, mass: 0.9 },
  );

  const coverScale = useTransform(popProgress, [0, 1], [0.84, 1]);
  const coverRotateY = useTransform(flipProgress, [0, 1], [0, -158]);
  const bookStageOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.52, 0.62],
    [0, 1, 1, 0],
  );
  const openOpacity = useTransform(scrollYProgress, [0.48, 0.68], [0, 1]);
  const openY = useTransform(scrollYProgress, [0.48, 0.68], [24, 0]);

  return (
    <section
      ref={sectionRef}
      id="journal"
      aria-label="Journal"
      className="relative w-full"
      style={isStatic ? undefined : { height: SECTION_SCROLL_HEIGHT }}
    >
      <div
        className="w-full bg-white"
        style={{ height: WORK_JOURNAL_GAP }}
        aria-hidden
      />
      <JournalTornTopEdge />
      <div
        className={
          isStatic
            ? "w-full"
            : "sticky top-0 flex h-screen w-full items-center overflow-hidden"
        }
      >
        {isStatic ? (
          <JournalSectionFrame>
            <OpenJournalLayout />
          </JournalSectionFrame>
        ) : (
          <JournalSectionFrame>
            <div className="relative flex h-full w-full items-center justify-center">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: bookStageOpacity }}
              >
                <JournalBookFlipStage
                  coverScale={coverScale}
                  coverRotateY={coverRotateY}
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 flex items-center"
                style={{ opacity: openOpacity, y: openY }}
              >
                <OpenJournalLayout />
              </motion.div>
            </div>
          </JournalSectionFrame>
        )}
      </div>
    </section>
  );
}
