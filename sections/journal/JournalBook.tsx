"use client";

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { journalBookmark, journalCoverInsideColor } from "@/lib/content/journal";
import { BackCover } from "@/sections/journal/BackCover";
import { Bookmark } from "@/sections/journal/Bookmark";
import {
  BOOK_PERSPECTIVE,
  CAMERA_PUSH_SCALE,
  CLOSED_ROTATE_X,
  CLOSED_ROTATE_Z,
  COVER_OPEN_DEG,
  COVER_OPEN_EASE,
  coverHeight,
  coverWidth,
  EASE_OUT_QUART,
  JOURNAL_SPINE_WIDTH,
  PAGES_SETTLE_EASE,
  PAGES_SETTLE_SCALE_X,
  SHADOW_BLEED,
  SHADOW_CLOSED,
  SHADOW_OPEN,
  spreadHeight,
  spreadWidth,
  TIMING,
} from "@/sections/journal/constants";
import { FrontCover } from "@/sections/journal/FrontCover";
import { JournalViewport } from "@/sections/journal/JournalViewport";
import { OpenSpread } from "@/sections/journal/OpenSpread";
import { Spine } from "@/sections/journal/Spine";

const SPREAD_CENTER = spreadWidth / 2;
const SPINE_OPEN_LEFT = SPREAD_CENTER - JOURNAL_SPINE_WIDTH / 2;
const BOOKMARK_CLOSED_LEFT = (JOURNAL_SPINE_WIDTH - journalBookmark.width) / 2;
const BOOKMARK_OPEN_LEFT = SPREAD_CENTER - journalBookmark.width / 2;

function useSpreadClipPath(coverRotateY: MotionValue<number>) {
  return useTransform(coverRotateY, (deg) => {
    const progress = Math.min(Math.abs(deg) / Math.abs(COVER_OPEN_DEG), 1);
    const insetRight = (1 - progress) * 100;
    return `inset(0 ${insetRight}% 0 0)`;
  });
}

function useHingeShadowOpacity(coverRotateY: MotionValue<number>) {
  return useTransform(coverRotateY, (deg) => {
    const progress = Math.min(Math.abs(deg) / Math.abs(COVER_OPEN_DEG), 1);
    if (progress <= 0 || progress >= 1) return 0;
    return 0.35 * Math.sin(progress * Math.PI);
  });
}

function useGroundShadow(coverRotateY: MotionValue<number>) {
  const blur = useTransform(coverRotateY, (deg) => {
    const progress = Math.min(Math.abs(deg) / Math.abs(COVER_OPEN_DEG), 1);
    return SHADOW_CLOSED.blur + (SHADOW_OPEN.blur - SHADOW_CLOSED.blur) * progress;
  });

  const opacity = useTransform(coverRotateY, (deg) => {
    const progress = Math.min(Math.abs(deg) / Math.abs(COVER_OPEN_DEG), 1);
    return (
      SHADOW_CLOSED.opacity +
      (SHADOW_OPEN.opacity - SHADOW_CLOSED.opacity) * progress
    );
  });

  return { blur, opacity };
}

/**
 * Premium layered journal with tap-to-toggle open/close.
 *
 * Initial state: closed front cover only. Auto-opens once on mount, then
 * tapping toggles between closed and open states.
 */
export function JournalBook() {
  const [isOpen, setIsOpen] = useState(false);
  const hasAutoOpened = useRef(false);

  const journalScale = useMotionValue(CAMERA_PUSH_SCALE);
  const coverRotateY = useMotionValue(0);
  const pageScaleX = useMotionValue(PAGES_SETTLE_SCALE_X);

  const viewportWidth = useTransform(
    coverRotateY,
    [0, COVER_OPEN_DEG],
    [coverWidth, spreadWidth],
  ) as MotionValue<number>;

  const spreadClipPath = useSpreadClipPath(coverRotateY);
  const hingeShadowOpacity = useHingeShadowOpacity(coverRotateY);
  const backCoverOpacity = useTransform(coverRotateY, [0, -30], [0, 1]);
  const spineLeft = useTransform(coverRotateY, [0, COVER_OPEN_DEG], [0, SPINE_OPEN_LEFT]);
  const spineOpacity = useTransform(coverRotateY, [0, -50, COVER_OPEN_DEG], [1, 0.15, 0]);
  const bookmarkLeft = useTransform(
    coverRotateY,
    [0, COVER_OPEN_DEG],
    [BOOKMARK_CLOSED_LEFT, BOOKMARK_OPEN_LEFT],
  );

  const { blur: shadowBlur, opacity: shadowOpacity } =
    useGroundShadow(coverRotateY);

  const groundShadowFilter = useTransform(shadowBlur, (b) => `blur(${b}px)`);

  // Auto-open once on mount
  useEffect(() => {
    if (hasAutoOpened.current) return;
    hasAutoOpened.current = true;
    const timer = window.setTimeout(() => setIsOpen(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  // Animate open / close when toggled
  useEffect(() => {
    const controls: ReturnType<typeof animate>[] = [];

    if (isOpen) {
      controls.push(
        animate(journalScale, 1, {
          duration: TIMING.scaleDuration,
          ease: EASE_OUT_QUART,
        }),
      );
      controls.push(
        animate(coverRotateY, COVER_OPEN_DEG, {
          delay: TIMING.coverOpenDelay,
          duration: TIMING.coverOpenDuration,
          ease: COVER_OPEN_EASE,
        }),
      );
      controls.push(
        animate(pageScaleX, 1, {
          delay: TIMING.pagesSettleDelay,
          duration: TIMING.pagesSettleDuration,
          ease: PAGES_SETTLE_EASE,
        }),
      );
    } else {
      controls.push(
        animate(pageScaleX, PAGES_SETTLE_SCALE_X, {
          duration: 0.15,
          ease: PAGES_SETTLE_EASE,
        }),
      );
      controls.push(
        animate(coverRotateY, 0, {
          delay: 0.08,
          duration: TIMING.coverOpenDuration * 0.85,
          ease: COVER_OPEN_EASE,
        }),
      );
      controls.push(
        animate(journalScale, CAMERA_PUSH_SCALE, {
          delay: 0.45,
          duration: TIMING.scaleDuration,
          ease: EASE_OUT_QUART,
        }),
      );
    }

    return () => {
      controls.forEach((c) => c.stop());
    };
  }, [isOpen, journalScale, coverRotateY, pageScaleX]);

  const toggleJournal = () => setIsOpen((open) => !open);

  return (
    <button
      type="button"
      aria-label={isOpen ? "Close journal" : "Open journal"}
      aria-expanded={isOpen}
      onClick={toggleJournal}
      className="cursor-pointer overflow-visible border-0 bg-transparent p-0 select-none"
    >
      <div
        className="flex justify-center overflow-visible"
        style={{
          width: spreadWidth,
          height: spreadHeight,
          padding: SHADOW_BLEED,
          margin: -SHADOW_BLEED,
        }}
      >
        <div className="relative">
          <JournalViewport width={viewportWidth}>
            <motion.div
              className="relative"
              style={{
                width: spreadWidth,
                height: spreadHeight,
                scale: journalScale,
                rotateX: CLOSED_ROTATE_X,
                rotateZ: CLOSED_ROTATE_Z,
                transformStyle: "preserve-3d",
                transformPerspective: BOOK_PERSPECTIVE,
                willChange: "transform",
              }}
            >
              <motion.div
                className="pointer-events-none absolute left-1/2 rounded-[50%]"
                style={{
                  bottom: -28,
                  width: spreadWidth * 0.82,
                  height: 36,
                  x: "-50%",
                  translateZ: -1,
                  background:
                    "radial-gradient(ellipse at center, rgba(32, 44, 61, 0.55) 0%, transparent 72%)",
                  filter: groundShadowFilter,
                  opacity: shadowOpacity,
                  zIndex: 0,
                  willChange: "filter, opacity",
                }}
                aria-hidden
              />

              <div
                className="absolute left-0 top-0"
                style={{
                  width: spreadWidth,
                  height: spreadHeight,
                  perspective: BOOK_PERSPECTIVE,
                  perspectiveOrigin: "left center",
                  transformStyle: "preserve-3d",
                }}
              >
                <BackCover opacity={backCoverOpacity} />

                <motion.div
                  className="absolute left-0 top-0"
                  style={{
                    width: spreadWidth,
                    height: spreadHeight,
                    clipPath: spreadClipPath,
                    scaleX: pageScaleX,
                    transformOrigin: "left center",
                    zIndex: 2,
                    willChange: "clip-path, transform",
                  }}
                >
                  <OpenSpread />
                </motion.div>

                <Spine left={spineLeft} opacity={spineOpacity} />

                <motion.div
                  className="absolute left-0 top-0"
                  style={{
                    width: coverWidth,
                    height: coverHeight,
                    rotateY: coverRotateY,
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    zIndex: 4,
                    willChange: "transform",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <FrontCover />
                  </div>

                  <motion.div
                    className="pointer-events-none absolute left-0 top-0 h-full w-[22px]"
                    style={{
                      opacity: hingeShadowOpacity,
                      background:
                        "linear-gradient(to right, rgba(12, 28, 22, 0.55) 0%, rgba(12, 28, 22, 0.18) 42%, transparent 100%)",
                      zIndex: 5,
                    }}
                    aria-hidden
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backgroundColor: journalCoverInsideColor,
                      borderRadius: "0 6px 6px 0",
                    }}
                    aria-hidden
                  />
                </motion.div>

                <Bookmark left={bookmarkLeft} />
              </div>
            </motion.div>
          </JournalViewport>
        </div>
      </div>
    </button>
  );
}

/** Static open spread for reduced-motion / mobile fallback. */
export function JournalOpenSpreadStatic({
  className = "",
  responsive = false,
}: {
  className?: string;
  responsive?: boolean;
}) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={
        responsive
          ? {
              width: "100%",
              maxWidth: spreadWidth,
              aspectRatio: `${spreadWidth} / ${spreadHeight}`,
            }
          : { width: spreadWidth, height: spreadHeight }
      }
    >
      <OpenSpread />
    </div>
  );
}

/** Static closed cover for reduced-motion toggle. */
export function JournalClosedStatic({
  className = "",
}: {
  className?: string;
}) {
  const spineLeft = useMotionValue(0);
  const spineOpacity = useMotionValue(1);
  const bookmarkLeft = useMotionValue(BOOKMARK_CLOSED_LEFT);

  return (
    <div
      className={`relative shrink-0 overflow-hidden ${className}`}
      style={{ width: coverWidth, height: coverHeight }}
    >
      <FrontCover />
      <Spine left={spineLeft} opacity={spineOpacity} />
      <Bookmark left={bookmarkLeft} />
    </div>
  );
}
