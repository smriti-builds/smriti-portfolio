"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { journalSpreadDropShadow } from "@/lib/content/journal";
import {
  BOOK_PERSPECTIVE,
  BOOKMARK_RED,
  CONTENT_FADE_DELAY_MS,
  CONTENT_FADE_DURATION,
  CONTENT_FADE_OUT_DURATION,
  COVER_ROTATE_OPEN,
  JOURNAL_COVER_HEIGHT,
  JOURNAL_COVER_SRC,
  JOURNAL_COVER_WIDTH,
  JOURNAL_OPEN_HEIGHT,
  JOURNAL_OPEN_WIDTH,
  LEATHER_GREEN,
  LEATHER_GREEN_DARK,
  LEATHER_GREEN_LIGHT,
  OPEN_EASE,
  OPEN_TRANSITION,
  PAGE_DEPTH,
  SPINE_WIDTH,
} from "@/sections/journal/constants";
import {
  JournalPageContent,
  JournalPageSurface,
} from "@/sections/journal/JournalPageContent";

function PageStackEdge({
  width,
  height,
  depth,
}: {
  width: number;
  height: number;
  depth: number;
}) {
  return (
    <>
      <div
        aria-hidden
        className="absolute top-0"
        style={{
          left: width,
          width: depth,
          height,
          transformOrigin: "left center",
          transform: "rotateY(90deg)",
          transformStyle: "preserve-3d",
          background:
            "linear-gradient(90deg, #e8e5de 0%, #f7f5f0 45%, #d5d0c7 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-0"
        style={{
          top: height,
          width,
          height: depth,
          transformOrigin: "top center",
          transform: "rotateX(-90deg)",
          transformStyle: "preserve-3d",
          background:
            "linear-gradient(180deg, #ebe8e1 0%, #d0cbc2 55%, #bfb9af 100%)",
        }}
      />
    </>
  );
}

function JournalBackCover() {
  const halfDepth = PAGE_DEPTH / 2;

  return (
    <div
      className="absolute left-0 top-0 overflow-hidden rounded-l-[4px]"
      style={{
        width: JOURNAL_COVER_WIDTH,
        height: JOURNAL_COVER_HEIGHT,
        transformStyle: "preserve-3d",
        transform: `translateZ(-${halfDepth}px)`,
        background: `linear-gradient(145deg, ${LEATHER_GREEN} 0%, ${LEATHER_GREEN_DARK} 100%)`,
        boxShadow: "inset -8px 0 16px rgba(0,0,0,0.18)",
      }}
      aria-hidden
    />
  );
}

function JournalSpine({ spineShadow }: { spineShadow: MotionValue<string> }) {
  const halfDepth = PAGE_DEPTH / 2;

  return (
    <motion.div
      aria-hidden
      className="absolute left-0 top-0 z-20"
      style={{
        width: SPINE_WIDTH,
        height: JOURNAL_COVER_HEIGHT,
        transformStyle: "preserve-3d",
        transform: `translateZ(${halfDepth + 1}px)`,
        background: `linear-gradient(90deg, ${LEATHER_GREEN_DARK} 0%, ${LEATHER_GREEN} 38%, ${LEATHER_GREEN_LIGHT} 62%, ${LEATHER_GREEN} 100%)`,
        boxShadow: spineShadow,
      }}
    />
  );
}

function JournalPages({
  pagesX,
  pagesScale,
  pagesClip,
  contentOpacity,
}: {
  pagesX: MotionValue<number>;
  pagesScale: MotionValue<number>;
  pagesClip: MotionValue<string>;
  contentOpacity: MotionValue<number>;
}) {
  const halfDepth = PAGE_DEPTH / 2;

  return (
    <motion.div
      className="absolute left-0 top-0 overflow-hidden"
      style={{
        width: JOURNAL_OPEN_WIDTH,
        height: JOURNAL_OPEN_HEIGHT,
        x: pagesX,
        scale: pagesScale,
        clipPath: pagesClip,
        transformStyle: "preserve-3d",
        transform: `translateZ(-${halfDepth / 2}px)`,
      }}
    >
      <JournalPageSurface />
      <JournalPageContent opacity={contentOpacity} />
      <PageStackEdge
        width={JOURNAL_OPEN_WIDTH}
        height={JOURNAL_OPEN_HEIGHT}
        depth={PAGE_DEPTH}
      />
    </motion.div>
  );
}

function JournalFrontCover({
  coverRotateY,
  coverLift,
  coverShadow,
}: {
  coverRotateY: MotionValue<number>;
  coverLift: MotionValue<number>;
  coverShadow: MotionValue<string>;
}) {
  const halfDepth = PAGE_DEPTH / 2;

  return (
    <motion.div
      className="absolute left-0 top-0 z-30 overflow-visible"
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
      <div
        aria-hidden
        className="absolute left-0 top-0"
        style={{
          width: PAGE_DEPTH,
          height: JOURNAL_COVER_HEIGHT,
          transformOrigin: "left center",
          transform: "rotateY(-90deg)",
          transformStyle: "preserve-3d",
          background: `linear-gradient(180deg, ${LEATHER_GREEN} 0%, ${LEATHER_GREEN_DARK} 100%)`,
        }}
      />

      <div
        className="absolute inset-0 overflow-hidden rounded-r-[4px]"
        style={{
          transform: `translateZ(${halfDepth}px)`,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={JOURNAL_COVER_SRC}
          alt=""
          width={JOURNAL_COVER_WIDTH}
          height={JOURNAL_COVER_HEIGHT}
          className="size-full object-cover"
          priority
          draggable={false}
        />
      </div>

      <div
        className="absolute inset-0 overflow-hidden rounded-l-[3px]"
        style={{
          transform: `rotateY(180deg) translateZ(${halfDepth}px)`,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
          background: `linear-gradient(160deg, ${LEATHER_GREEN} 0%, ${LEATHER_GREEN_DARK} 100%)`,
          boxShadow: "inset 10px 0 18px rgba(0,0,0,0.22)",
        }}
        aria-hidden
      />
    </motion.div>
  );
}

function JournalBookmark({
  bookmarkSway,
  bookmarkDrop,
}: {
  bookmarkSway: MotionValue<number>;
  bookmarkDrop: MotionValue<number>;
}) {
  return (
    <motion.div
      aria-hidden
      className="absolute z-40"
      style={{
        left: JOURNAL_COVER_WIDTH - 36,
        top: -6,
        width: 22,
        height: 108,
        rotateZ: bookmarkSway,
        y: bookmarkDrop,
        transformOrigin: "top center",
        background: `linear-gradient(180deg, #d44f4f 0%, ${BOOKMARK_RED} 55%, #8f2a2a 100%)`,
        borderRadius: "0 0 3px 3px",
        boxShadow: "1px 3px 8px rgba(0,0,0,0.22)",
      }}
    />
  );
}

export function JournalBook({ isOpen }: { isOpen: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const openProgress = useMotionValue(0);
  const contentOpacity = useMotionValue(0);

  const coverRotateY = useTransform(
    openProgress,
    [0, 1],
    [0, COVER_ROTATE_OPEN],
  );
  const pagesX = useTransform(openProgress, [0, 1], [0, 8]);
  const pagesScale = useTransform(openProgress, [0, 1], [1, 1.008]);
  const pagesClip = useTransform(openProgress, (value) => {
    if (value <= 0.001) return "inset(0 100% 0 0 round 0 6px 6px 0)";
    const reveal = Math.min(value * 1.35, 1);
    const hiddenRight = (1 - reveal) * 100;
    return `inset(0 ${hiddenRight}% 0 0 round 0 6px 6px 0)`;
  });
  const cameraScale = useTransform(openProgress, [0, 1], [1, 1.03]);
  const bookOffsetX = useTransform(
    openProgress,
    [0, 1],
    [JOURNAL_COVER_WIDTH / 2, 0],
  );

  const coverLift = useTransform(openProgress, (value) =>
    Math.sin(value * Math.PI) * 10,
  );

  const coverShadow = useTransform(openProgress, (value) => {
    const lift = Math.sin(value * Math.PI);
    const y = 4 + lift * 22;
    const blur = 12 + value * 48;
    const alpha = 0.08 + value * 0.14;
    return `0px ${y}px ${blur}px -4px rgba(32, 44, 61, ${alpha})`;
  });

  const spineShadow = useTransform(openProgress, (value) => {
    const inset = 6 + value * 4;
    const alpha = 0.28 + value * 0.12;
    return `inset -${inset}px 0 ${inset + 6}px rgba(0,0,0,${alpha}), inset 3px 0 6px rgba(255,255,255,0.06)`;
  });

  const bookDropShadow = useTransform(openProgress, (value) => {
    const lift = Math.sin(value * Math.PI);
    const y1 = 2 + lift * 4;
    const blur1 = 6 + value * 8;
    const y2 = 12 + lift * 14;
    const blur2 = 28 + value * 26;
    const y3 = 28 + lift * 24;
    const blur3 = 56 + value * 36;
    const alpha1 = 0.04 + value * 0.03;
    const alpha2 = 0.07 + value * 0.04;
    const alpha3 = 0.09 + value * 0.03;
    return `drop-shadow(0 ${y1}px ${blur1}px rgba(32, 44, 61, ${alpha1})) drop-shadow(0 ${y2}px ${blur2}px rgba(32, 44, 61, ${alpha2})) drop-shadow(0 ${y3}px ${blur3}px rgba(32, 44, 61, ${alpha3}))`;
  });

  const coverCastOpacity = useTransform(openProgress, (value) => {
    if (value < 0.08 || value > 0.92) return 0;
    return Math.sin(value * Math.PI) * 0.28;
  });

  const bookmarkSway = useTransform(openProgress, [0, 1], [2, -6]);
  const bookmarkDrop = useTransform(openProgress, [0, 1], [0, 10]);

  useEffect(() => {
    if (prefersReducedMotion) {
      openProgress.set(isOpen ? 1 : 0);
      contentOpacity.set(isOpen ? 1 : 0);
      return;
    }

    const timers: number[] = [];
    const controls: Array<{ stop: () => void }> = [];

    if (isOpen) {
      controls.push(animate(openProgress, 1, OPEN_TRANSITION));
      timers.push(
        window.setTimeout(() => {
          controls.push(
            animate(contentOpacity, 1, {
              duration: CONTENT_FADE_DURATION,
              ease: OPEN_EASE,
            }),
          );
        }, OPEN_TRANSITION.duration * 1000 + CONTENT_FADE_DELAY_MS),
      );
    } else {
      controls.push(
        animate(contentOpacity, 0, {
          duration: CONTENT_FADE_OUT_DURATION,
          ease: OPEN_EASE,
        }),
      );
      timers.push(
        window.setTimeout(() => {
          controls.push(animate(openProgress, 0, OPEN_TRANSITION));
        }, CONTENT_FADE_OUT_DURATION * 1000),
      );
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      controls.forEach((control) => control.stop());
    };
  }, [isOpen, openProgress, contentOpacity, prefersReducedMotion]);

  return (
    <motion.div
      className="relative shrink-0 overflow-visible"
      style={{
        width: JOURNAL_OPEN_WIDTH,
        height: JOURNAL_OPEN_HEIGHT,
        scale: cameraScale,
        filter: bookDropShadow,
        transformOrigin: "left center",
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
            x: bookOffsetX,
            transformStyle: "preserve-3d",
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
            <JournalBackCover />

            <JournalPages
              pagesX={pagesX}
              pagesScale={pagesScale}
              pagesClip={pagesClip}
              contentOpacity={contentOpacity}
            />

            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                opacity: coverCastOpacity,
                background:
                  "linear-gradient(90deg, rgba(18, 44, 34, 0.38) 0%, rgba(18, 44, 34, 0.14) 30%, transparent 55%)",
              }}
            />

            <JournalSpine spineShadow={spineShadow} />

            <JournalFrontCover
              coverRotateY={coverRotateY}
              coverLift={coverLift}
              coverShadow={coverShadow}
            />

            <JournalBookmark
              bookmarkSway={bookmarkSway}
              bookmarkDrop={bookmarkDrop}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/** Static closed cover for mobile / reduced motion. */
export function JournalClosedView({
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

/** Static open spread for mobile / reduced motion. */
export function JournalOpenSpreadStatic({
  className = "",
  responsive = false,
}: {
  className?: string;
  responsive?: boolean;
}) {
  const fullOpacity = useMotionValue(1);

  return (
    <div
      className={`relative shrink-0 overflow-hidden ${className}`}
      style={{
        ...(responsive
          ? {
              width: "100%",
              maxWidth: JOURNAL_OPEN_WIDTH,
              aspectRatio: `${JOURNAL_OPEN_WIDTH} / ${JOURNAL_OPEN_HEIGHT}`,
            }
          : { width: JOURNAL_OPEN_WIDTH, height: JOURNAL_OPEN_HEIGHT }),
        filter: journalSpreadDropShadow,
      }}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: JOURNAL_COVER_WIDTH,
          height: JOURNAL_COVER_HEIGHT,
          background: `linear-gradient(145deg, ${LEATHER_GREEN} 0%, ${LEATHER_GREEN_DARK} 100%)`,
        }}
        aria-hidden
      />
      <JournalPageSurface />
      <JournalPageContent opacity={fullOpacity} />
    </div>
  );
}
