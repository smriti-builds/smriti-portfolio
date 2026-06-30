"use client";

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { journalBookmark } from "@/lib/content/journal";
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
  JOURNAL_SPINE_WIDTH,
  OPEN_ROTATE_X,
  OPEN_ROTATE_Z,
  PAGES_SETTLE_EASE,
  PAGES_SETTLE_SCALE_X,
  PREMIUM_EASE,
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
const BOOKMARK_CLOSED_LEFT = (JOURNAL_SPINE_WIDTH - journalBookmark.width) / 2;
const BOOKMARK_OPEN_LEFT = SPREAD_CENTER - journalBookmark.width / 2;

function openProgressFromCover(deg: number) {
  return Math.min(Math.abs(deg) / Math.abs(COVER_OPEN_DEG), 1);
}

function useSpreadClipPath(coverRotateY: MotionValue<number>) {
  return useTransform(coverRotateY, (deg) => {
    const progress = openProgressFromCover(deg);
    const insetRight = (1 - progress) * 100;
    return `inset(0 ${insetRight}% 0 0)`;
  });
}

/** Neutral hinge shadow — only visible mid-rotation, never green. */
function useHingeShadowOpacity(coverRotateY: MotionValue<number>) {
  return useTransform(coverRotateY, (deg) => {
    const progress = openProgressFromCover(deg);
    if (progress < 0.08 || progress > 0.72) return 0;
    return 0.22 * Math.sin(((progress - 0.08) / 0.64) * Math.PI);
  });
}

function useGroundShadow(coverRotateY: MotionValue<number>) {
  const blur = useTransform(coverRotateY, (deg) => {
    const progress = openProgressFromCover(deg);
    return SHADOW_CLOSED.blur + (SHADOW_OPEN.blur - SHADOW_CLOSED.blur) * progress;
  });

  const opacity = useTransform(coverRotateY, (deg) => {
    const progress = openProgressFromCover(deg);
    return (
      SHADOW_CLOSED.opacity +
      (SHADOW_OPEN.opacity - SHADOW_CLOSED.opacity) * progress
    );
  });

  return { blur, opacity };
}

/**
 * Premium layered journal with tap-to-toggle open/close.
 * Spine stays fixed on the left edge and simply fades out when opening.
 */
export function JournalBook() {
  const [isOpen, setIsOpen] = useState(false);
  const hasAutoOpened = useRef(false);

  const journalScale = useMotionValue(CAMERA_PUSH_SCALE);
  const coverRotateY = useMotionValue(0);
  const pageScaleX = useMotionValue(PAGES_SETTLE_SCALE_X);

  const openAmount = useTransform(coverRotateY, (deg) =>
    openProgressFromCover(deg),
  );

  const viewportWidth = useTransform(
    openAmount,
    [0, 1],
    [coverWidth, spreadWidth],
  ) as MotionValue<number>;

  const spreadClipPath = useSpreadClipPath(coverRotateY);
  const hingeShadowOpacity = useHingeShadowOpacity(coverRotateY);

  /** Back cover only peeks during mid-rotation — hidden when flat open. */
  const backCoverOpacity = useTransform(openAmount, (p) => {
    if (p < 0.12 || p > 0.7) return 0;
    return Math.sin(((p - 0.12) / 0.58) * Math.PI) * 0.45;
  });

  /** Spine: visible when closed, fades out immediately — no positional movement. */
  const spineOpacity = useTransform(coverRotateY, [0, -14], [1, 0]);

  /** Bookmark glides to the center gutter with a soft ease. */
  const bookmarkLeft = useTransform(openAmount, [0, 1], [
    BOOKMARK_CLOSED_LEFT,
    BOOKMARK_OPEN_LEFT,
  ]);

  /** Hide the rotating cover shell once it has cleared the spread. */
  const coverShellOpacity = useTransform(coverRotateY, [0, -155, COVER_OPEN_DEG], [1, 1, 0]);

  /** Inside face only visible during the flip arc — avoids green edges when open. */
  const coverInsideOpacity = useTransform(coverRotateY, (deg) => {
    const a = Math.abs(deg);
    if (a < 28 || a > 118) return 0;
    return 0.7;
  });

  const journalRotateX = useTransform(openAmount, [0, 1], [
    CLOSED_ROTATE_X,
    OPEN_ROTATE_X,
  ]);
  const journalRotateZ = useTransform(openAmount, [0, 1], [
    CLOSED_ROTATE_Z,
    OPEN_ROTATE_Z,
  ]);

  const { blur: shadowBlur, opacity: shadowOpacity } =
    useGroundShadow(coverRotateY);

  const groundShadowFilter = useTransform(shadowBlur, (b) => `blur(${b}px)`);

  useEffect(() => {
    if (hasAutoOpened.current) return;
    hasAutoOpened.current = true;
    const timer = window.setTimeout(() => setIsOpen(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const controls: ReturnType<typeof animate>[] = [];

    if (isOpen) {
      controls.push(
        animate(journalScale, 1, {
          duration: TIMING.scaleDuration,
          ease: PREMIUM_EASE,
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
          duration: 0.18,
          ease: PREMIUM_EASE,
        }),
      );
      controls.push(
        animate(coverRotateY, 0, {
          delay: 0.06,
          duration: TIMING.closeCoverDuration,
          ease: COVER_OPEN_EASE,
        }),
      );
      controls.push(
        animate(journalScale, CAMERA_PUSH_SCALE, {
          delay: 0.38,
          duration: TIMING.closeScaleDuration,
          ease: PREMIUM_EASE,
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
                rotateX: journalRotateX,
                rotateZ: journalRotateZ,
                transformStyle: "preserve-3d",
                transformPerspective: BOOK_PERSPECTIVE,
                willChange: "transform",
              }}
            >
              <motion.div
                className="pointer-events-none absolute left-1/2 rounded-[50%]"
                style={{
                  bottom: -24,
                  width: spreadWidth * 0.78,
                  height: 32,
                  x: "-50%",
                  translateZ: -1,
                  background:
                    "radial-gradient(ellipse at center, rgba(32, 44, 61, 0.45) 0%, transparent 74%)",
                  filter: groundShadowFilter,
                  opacity: shadowOpacity,
                  zIndex: 0,
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
                  }}
                >
                  <OpenSpread />
                </motion.div>

                <Spine opacity={spineOpacity} />

                <motion.div
                  className="absolute left-0 top-0"
                  style={{
                    width: coverWidth,
                    height: coverHeight,
                    rotateY: coverRotateY,
                    opacity: coverShellOpacity,
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    zIndex: 4,
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
                    className="pointer-events-none absolute left-0 top-0 h-full w-[18px]"
                    style={{
                      opacity: hingeShadowOpacity,
                      background:
                        "linear-gradient(to right, rgba(20, 24, 32, 0.28) 0%, rgba(20, 24, 32, 0.08) 55%, transparent 100%)",
                      zIndex: 5,
                    }}
                    aria-hidden
                  />

                  <motion.div
                    className="absolute inset-0"
                    style={{
                      opacity: coverInsideOpacity,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background:
                        "linear-gradient(90deg, #c8c4b8 0%, #e8e4d9 48%, #ddd8cc 100%)",
                      borderRadius: "0 4px 4px 0",
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
  const spineOpacity = useMotionValue(1);
  const bookmarkLeft = useMotionValue(BOOKMARK_CLOSED_LEFT);

  return (
    <div
      className={`relative shrink-0 overflow-hidden ${className}`}
      style={{ width: coverWidth, height: coverHeight }}
    >
      <FrontCover />
      <Spine opacity={spineOpacity} />
      <Bookmark left={bookmarkLeft} />
    </div>
  );
}
