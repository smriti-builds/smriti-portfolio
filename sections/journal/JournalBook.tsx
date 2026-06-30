"use client";

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { journalSpreadDropShadow } from "@/lib/content/journal";
import { BackCover } from "@/sections/journal/BackCover";
import {
  BOOK_PERSPECTIVE,
  CAMERA_PUSH_SCALE,
  COVER_FLIP_EASE,
  COVER_LIFT_Z,
  COVER_OPEN_DEG,
  coverHeight,
  coverWidth,
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
    if (p < 0.06 || p > 0.78) return 0;
    return 0.38 * Math.sin(((p - 0.06) / 0.72) * Math.PI);
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
    const y = 4 + p * 28;
    const blur = 12 + p * 40;
    const alpha = 0.08 + p * 0.18;
    return `0px ${y}px ${blur}px -8px rgba(20, 28, 42, ${alpha})`;
  });
}

function useGroundShadow(coverRotateY: MotionValue<number>) {
  const blur = useTransform(coverRotateY, (deg) => {
    const p = coverProgressFromDeg(deg);
    return SHADOW_CLOSED.blur + (SHADOW_OPEN.blur - SHADOW_CLOSED.blur) * p;
  });

  const opacity = useTransform(coverRotateY, (deg) => {
    const p = coverProgressFromDeg(deg);
    return (
      SHADOW_CLOSED.opacity +
      (SHADOW_OPEN.opacity - SHADOW_CLOSED.opacity) * p
    );
  });

  const spreadY = useTransform(coverRotateY, (deg) => {
    const p = coverProgressFromDeg(deg);
    return (
      SHADOW_CLOSED.spreadY +
      (SHADOW_OPEN.spreadY - SHADOW_CLOSED.spreadY) * p
    );
  });

  return { blur, opacity, spreadY };
}

/**
 * Layered journal — spread sits fully underneath; the cover rotation and
 * widening viewport reveal pages (no clip-path wipe). Depth via Z-lift,
 * cover cast shadow, and layered drop shadows.
 */
export function JournalBook() {
  const [isOpen, setIsOpen] = useState(false);
  const hasAutoOpened = useRef(false);

  const openProgress = useMotionValue(0);

  const journalScale = useTransform(
    openProgress,
    [0, 0.14, 1],
    [CAMERA_PUSH_SCALE, 1, 1],
  );

  /** Cover rotation and viewport width share the same progress — stays in sync. */
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

  const { blur: shadowBlur, opacity: shadowOpacity, spreadY } =
    useGroundShadow(coverRotateY);

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
      ease: isOpen ? COVER_FLIP_EASE : COVER_FLIP_EASE,
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
          {/* Ground shadow — outside viewport so it is never clipped */}
          <motion.div
            className="pointer-events-none absolute left-1/2 rounded-[50%]"
            style={{
              bottom: -32,
              width: spreadWidth * 0.84,
              height: 40,
              x: "-50%",
              y: spreadY,
              background:
                "radial-gradient(ellipse at center, rgba(22, 32, 48, 0.65) 0%, rgba(22, 32, 48, 0.2) 42%, transparent 72%)",
              filter: groundShadowFilter,
              opacity: shadowOpacity,
              zIndex: 0,
            }}
            aria-hidden
          />

          <JournalViewport width={viewportWidth}>
            <motion.div
              className="relative"
              style={{
                width: spreadWidth,
                height: spreadHeight,
                scale: journalScale,
                filter: journalSpreadDropShadow,
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

                {/* Full spread always rendered — revealed by cover rotation + viewport */}
                <div
                  className="absolute left-0 top-0"
                  style={{ width: spreadWidth, height: spreadHeight, zIndex: 2 }}
                >
                  <OpenSpread />
                </div>

                <Spine opacity={spineOpacity} />

                <motion.div
                  className="absolute left-0 top-0"
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
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <FrontCover />
                  </div>

                  <motion.div
                    className="pointer-events-none absolute left-0 top-0 h-full w-[20px]"
                    style={{
                      opacity: hingeShadowOpacity,
                      background:
                        "linear-gradient(to right, rgba(14, 18, 26, 0.42) 0%, rgba(14, 18, 26, 0.14) 50%, transparent 100%)",
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
                        "linear-gradient(90deg, #b8b4a8 0%, #e4e0d4 45%, #d6d2c6 100%)",
                      borderRadius: "0 4px 4px 0",
                    }}
                    aria-hidden
                  />
                </motion.div>
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
      className={`relative shrink-0 overflow-hidden ${className}`}
      style={{
        width: coverWidth,
        height: coverHeight,
        filter: journalSpreadDropShadow,
      }}
    >
      <FrontCover />
      <Spine opacity={spineOpacity} />
    </div>
  );
}
