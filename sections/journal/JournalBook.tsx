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
  COVER_OPEN_DEG,
  coverHeight,
  coverWidth,
  JOURNAL_SPINE_WIDTH,
  SHADOW_BLEED,
  SHADOW_CLOSED,
  SHADOW_OPEN,
  SMOOTH_EASE,
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

function useSpreadClipPath(openAmount: MotionValue<number>) {
  return useTransform(openAmount, (p) => {
    const insetRight = (1 - p) * 100;
    return `inset(0 ${insetRight}% 0 0)`;
  });
}

function useHingeShadowOpacity(openAmount: MotionValue<number>) {
  return useTransform(openAmount, (p) => {
    if (p < 0.08 || p > 0.72) return 0;
    return 0.22 * Math.sin(((p - 0.08) / 0.64) * Math.PI);
  });
}

function useGroundShadow(openAmount: MotionValue<number>) {
  const blur = useTransform(
    openAmount,
    [0, 1],
    [SHADOW_CLOSED.blur, SHADOW_OPEN.blur],
  );

  const opacity = useTransform(
    openAmount,
    [0, 1],
    [SHADOW_CLOSED.opacity, SHADOW_OPEN.opacity],
  );

  return { blur, opacity };
}

/**
 * Premium layered journal with tap-to-toggle open/close.
 * A single openProgress value drives every layer so open and close stay in sync.
 */
export function JournalBook() {
  const [isOpen, setIsOpen] = useState(false);
  const hasAutoOpened = useRef(false);

  const openProgress = useMotionValue(0);

  /** Scale finishes in the first ~16% of progress, then holds. */
  const journalScale = useTransform(
    openProgress,
    [0, 0.16, 1],
    [CAMERA_PUSH_SCALE, 1, 1],
  );

  /** Cover rotation spans ~10%–100% so scale leads slightly on open. */
  const coverRotateY = useTransform(
    openProgress,
    [0, 0.1, 1],
    [0, 0, COVER_OPEN_DEG],
  );

  /** Barely perceptible page settle in the last 8% — no bounce. */
  const pageScaleX = useTransform(openProgress, [0, 0.92, 1], [1, 1, 1]);

  const viewportWidth = useTransform(
    openProgress,
    [0, 1],
    [coverWidth, spreadWidth],
  ) as MotionValue<number>;

  const spreadClipPath = useSpreadClipPath(openProgress);
  const hingeShadowOpacity = useHingeShadowOpacity(openProgress);

  const backCoverOpacity = useTransform(openProgress, (p) => {
    if (p < 0.12 || p > 0.7) return 0;
    return Math.sin(((p - 0.12) / 0.58) * Math.PI) * 0.45;
  });

  const spineOpacity = useTransform(openProgress, [0, 0.05], [1, 0]);

  const bookmarkLeft = useTransform(openProgress, [0, 1], [
    BOOKMARK_CLOSED_LEFT,
    BOOKMARK_OPEN_LEFT,
  ]);

  const coverShellOpacity = useTransform(openProgress, [0, 0.9, 1], [1, 1, 0]);

  const coverInsideOpacity = useTransform(openProgress, (p) => {
    if (p < 0.18 || p > 0.62) return 0;
    return 0.7;
  });

  const { blur: shadowBlur, opacity: shadowOpacity } =
    useGroundShadow(openProgress);

  const groundShadowFilter = useTransform(shadowBlur, (b) => `blur(${b}px)`);

  useEffect(() => {
    if (hasAutoOpened.current) return;
    hasAutoOpened.current = true;
    const timer = window.setTimeout(() => setIsOpen(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const controls = animate(openProgress, isOpen ? 1 : 0, {
      duration: isOpen ? TIMING.openDuration : TIMING.closeDuration,
      ease: SMOOTH_EASE,
    });

    return () => controls.stop();
  }, [isOpen, openProgress]);

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
                transformStyle: "preserve-3d",
                transformPerspective: BOOK_PERSPECTIVE,
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
