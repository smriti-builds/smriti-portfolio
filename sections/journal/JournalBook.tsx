"use client";

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  journalClosedDropShadow,
  journalSpreadDropShadow,
} from "@/lib/content/journal";
import { BackCover } from "@/sections/journal/BackCover";
import {
  AUTO_OPEN_DELAY_MS,
  BOOK_PERSPECTIVE,
  CAMERA_PUSH_SCALE,
  COVER_FLIP_EASE,
  COVER_LIFT_Z,
  COVER_OPEN_DEG,
  coverHeight,
  coverWidth,
  JOURNAL_SHADOW_RGB,
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

function coverProgressFromDeg(deg: number) {
  return Math.min(Math.abs(deg) / Math.abs(COVER_OPEN_DEG), 1);
}

function useHingeShadowOpacity(coverRotateY: MotionValue<number>) {
  return useTransform(coverRotateY, (deg) => {
    const p = coverProgressFromDeg(deg);
    if (p < 0.08 || p > 0.75) return 0;
    return 0.16 * Math.sin(((p - 0.08) / 0.67) * Math.PI);
  });
}

function useCoverLiftZ(coverRotateY: MotionValue<number>) {
  return useTransform(coverRotateY, (deg) => {
    const p = coverProgressFromDeg(deg);
    return Math.sin(p * Math.PI) * COVER_LIFT_Z;
  });
}

function useCoverShadow(coverRotateY: MotionValue<number>) {
  return useTransform(coverRotateY, (deg) => {
    const p = coverProgressFromDeg(deg);
    const y = 2 + p * 10;
    const blur = 22 + p * 30;
    const alpha = 0.03 + p * 0.05;
    return `0px ${y}px ${blur}px -2px rgba(${JOURNAL_SHADOW_RGB}, ${alpha})`;
  });
}

function useGroundShadow(coverRotateY: MotionValue<number>) {
  const blur = useTransform(coverRotateY, (deg) => {
    const p = coverProgressFromDeg(deg);
    return SHADOW_CLOSED.blur + (SHADOW_OPEN.blur - SHADOW_CLOSED.blur) * p;
  });

  const peakAlpha = useTransform(coverRotateY, (deg) => {
    const p = coverProgressFromDeg(deg);
    return (
      SHADOW_CLOSED.peakAlpha +
      (SHADOW_OPEN.peakAlpha - SHADOW_CLOSED.peakAlpha) * p
    );
  });

  const widthRatio = useTransform(coverRotateY, (deg) => {
    const p = coverProgressFromDeg(deg);
    return (
      SHADOW_CLOSED.widthRatio +
      (SHADOW_OPEN.widthRatio - SHADOW_CLOSED.widthRatio) * p
    );
  });

  return { blur, peakAlpha, widthRatio };
}

export function JournalBook() {
  const [isOpen, setIsOpen] = useState(false);
  const hasAutoOpened = useRef(false);

  const openProgress = useMotionValue(0);

  const journalScale = useTransform(
    openProgress,
    [0, 0.14, 1],
    [CAMERA_PUSH_SCALE, 1, 1],
  );

  const coverRotateY = useTransform(
    openProgress,
    [0, 1],
    [0, COVER_OPEN_DEG],
  );

  const viewportWidth = useTransform(
    openProgress,
    [0, 1],
    [coverWidth, spreadWidth],
  ) as MotionValue<number>;

  /**
   * Horizontal mask with vertical bleed so shadows and rounded corners
   * are not cut off (replaces overflow:hidden which caused white clipping).
   */
  const horizontalClip = useTransform(viewportWidth, (w) => {
    const clipRight = Math.max(0, spreadWidth - w);
    return `inset(-${SHADOW_BLEED}px ${clipRight}px -${SHADOW_BLEED}px 0 round 0 4px 4px 0)`;
  });

  const bookBoxShadow = useTransform(openProgress, (p) => {
    const contact = 0.038 + p * 0.012;
    const ambient = 0.032 + p * 0.018;
    const y1 = 3 + p * 6;
    const blur1 = 16 + p * 20;
    const y2 = 8 + p * 18;
    const blur2 = 32 + p * 36;
    return `0px ${y1}px ${blur1}px -3px rgba(${JOURNAL_SHADOW_RGB}, ${contact}), 0px ${y2}px ${blur2}px -8px rgba(${JOURNAL_SHADOW_RGB}, ${ambient})`;
  });

  const hingeShadowOpacity = useHingeShadowOpacity(coverRotateY);
  const coverLiftZ = useCoverLiftZ(coverRotateY);
  const coverShadow = useCoverShadow(coverRotateY);

  const backCoverOpacity = useTransform(coverRotateY, (deg) => {
    const p = coverProgressFromDeg(deg);
    if (p < 0.1 || p > 0.72) return 0;
    return Math.sin(((p - 0.1) / 0.62) * Math.PI) * 0.5;
  });

  const spineOpacity = useTransform(coverRotateY, [0, -16], [1, 0]);

  const coverShellOpacity = useTransform(
    coverRotateY,
    [0, -158, COVER_OPEN_DEG],
    [1, 1, 0],
  );

  const coverInsideOpacity = useTransform(coverRotateY, (deg) => {
    const p = coverProgressFromDeg(deg);
    if (p < 0.15 || p > 0.65) return 0;
    return 0.75;
  });

  const spineFoldOpacity = useTransform(openProgress, [0.55, 0.95], [0, 0.85]);

  const { blur: shadowBlur, peakAlpha, widthRatio } =
    useGroundShadow(coverRotateY);

  const groundBlurFilter = useTransform(shadowBlur, (b) => `blur(${b}px)`);

  const groundWidth = useTransform(widthRatio, (r) => spreadWidth * r);

  const ambientGradient = useTransform(
    peakAlpha,
    (a) =>
      `radial-gradient(ellipse 100% 46% at 50% 0%, rgba(${JOURNAL_SHADOW_RGB}, ${a}) 0%, rgba(${JOURNAL_SHADOW_RGB}, ${a * 0.35}) 42%, transparent 76%)`,
  );

  const bottomBiasGradient = useTransform(
    peakAlpha,
    (a) =>
      `radial-gradient(ellipse 72% 55% at 58% 0%, rgba(${JOURNAL_SHADOW_RGB}, ${a * 0.55}) 0%, transparent 72%)`,
  );

  /** Auto-open once after 5 seconds; tap toggles open/close any time after. */
  useEffect(() => {
    if (hasAutoOpened.current) return;

    const timer = window.setTimeout(() => {
      hasAutoOpened.current = true;
      setIsOpen(true);
    }, AUTO_OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const controls = animate(openProgress, isOpen ? 1 : 0, {
      duration: isOpen ? TIMING.openDuration : TIMING.closeDuration,
      ease: COVER_FLIP_EASE,
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
          minHeight: spreadHeight + SHADOW_BLEED * 2,
          padding: SHADOW_BLEED,
          margin: -SHADOW_BLEED,
        }}
      >
        <div className="relative overflow-visible">
          {/* Ground shadows — outside any clip mask */}
          <motion.div
            className="pointer-events-none absolute left-1/2"
            style={{
              bottom: 0,
              width: groundWidth,
              height: 52,
              x: "-50%",
              background: ambientGradient,
              filter: groundBlurFilter,
              zIndex: 0,
            }}
            aria-hidden
          />

          <motion.div
            className="pointer-events-none absolute left-1/2"
            style={{
              bottom: 8,
              width: groundWidth,
              height: 36,
              x: "-40%",
              background: bottomBiasGradient,
              filter: groundBlurFilter,
              zIndex: 0,
            }}
            aria-hidden
          />

          <JournalViewport width={viewportWidth}>
            {/* Elevation shadow — matches visible footprint, outside content clip */}
            <motion.div
              className="pointer-events-none absolute left-0 top-0 rounded-r-[4px]"
              style={{
                width: viewportWidth,
                height: spreadHeight,
                boxShadow: bookBoxShadow,
                zIndex: 0,
              }}
              aria-hidden
            />

            <motion.div
              className="relative overflow-visible"
              style={{
                width: spreadWidth,
                height: spreadHeight,
                clipPath: horizontalClip,
                zIndex: 1,
              }}
            >
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

                <div
                  className="absolute left-0 top-0"
                  style={{ width: spreadWidth, height: spreadHeight, zIndex: 2 }}
                >
                  <OpenSpread />

                  <motion.div
                    className="pointer-events-none absolute inset-y-0 left-1/2 w-[24px] -translate-x-1/2"
                    style={{
                      opacity: spineFoldOpacity,
                      background: `linear-gradient(90deg, transparent 0%, rgba(${JOURNAL_SHADOW_RGB}, 0.04) 38%, rgba(${JOURNAL_SHADOW_RGB}, 0.07) 50%, rgba(${JOURNAL_SHADOW_RGB}, 0.04) 62%, transparent 100%)`,
                    }}
                    aria-hidden
                  />
                </div>

                <Spine opacity={spineOpacity} />

                <motion.div
                  className="absolute left-0 top-0 overflow-visible"
                  style={{
                    width: coverWidth,
                    height: coverHeight,
                    rotateY: coverRotateY,
                    z: coverLiftZ,
                    opacity: coverShellOpacity,
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    boxShadow: coverShadow,
                    zIndex: 4,
                  }}
                >
                  <div
                    className="absolute inset-0 overflow-hidden rounded-r-[4px]"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <FrontCover />
                  </div>

                  <motion.div
                    className="pointer-events-none absolute left-0 top-0 h-full w-[16px]"
                    style={{
                      opacity: hingeShadowOpacity,
                      background: `linear-gradient(to right, rgba(${JOURNAL_SHADOW_RGB}, 0.18) 0%, rgba(${JOURNAL_SHADOW_RGB}, 0.06) 55%, transparent 100%)`,
                      zIndex: 5,
                    }}
                    aria-hidden
                  />

                  <motion.div
                    className="absolute inset-0 overflow-hidden rounded-r-[4px]"
                    style={{
                      opacity: coverInsideOpacity,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background:
                        "linear-gradient(90deg, #b8b4a8 0%, #e4e0d4 45%, #d6d2c6 100%)",
                    }}
                    aria-hidden
                  />
                </motion.div>
              </div>
            </motion.div>
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
      style={{
        filter: journalSpreadDropShadow,
        ...(responsive
          ? {
              width: "100%",
              maxWidth: spreadWidth,
              aspectRatio: `${spreadWidth} / ${spreadHeight}`,
            }
          : { width: spreadWidth, height: spreadHeight }),
      }}
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

  return (
    <div
      className={`relative shrink-0 overflow-visible ${className}`}
      style={{
        width: coverWidth,
        height: coverHeight,
        filter: journalClosedDropShadow,
      }}
    >
      <FrontCover />
      <Spine opacity={spineOpacity} />
    </div>
  );
}
