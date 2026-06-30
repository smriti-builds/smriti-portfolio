"use client";

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect } from "react";
import { journalCoverInsideColor } from "@/lib/content/journal";
import { BackCover } from "@/sections/journal/BackCover";
import { Bookmark } from "@/sections/journal/Bookmark";
import {
  BOOK_PERSPECTIVE,
  CAMERA_PUSH_SCALE,
  CAMERA_PUSH_Y,
  CLOSED_ROTATE_X,
  CLOSED_ROTATE_Z,
  COVER_OPEN_DEG,
  COVER_OPEN_EASE,
  coverHeight,
  coverWidth,
  EASE_OUT_QUART,
  PAGES_CLOSED,
  PAGES_OPEN,
  PAGES_SETTLE_EASE,
  SETTLE_COVER_OVERSHOOT,
  SETTLE_SCALE_PEAK,
  SHADOW_BLEED,
  SHADOW_CLOSED,
  SHADOW_OPEN,
  spreadHeight,
  spreadWidth,
  TIMING,
} from "@/sections/journal/constants";
import { FrontCover } from "@/sections/journal/FrontCover";
import { OpenSpread } from "@/sections/journal/OpenSpread";
import { Spine } from "@/sections/journal/Spine";

type JournalBookProps = {
  play: boolean;
};

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
    const peak = 0.35;
    return peak * Math.sin(progress * Math.PI);
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
 * Premium layered journal opening animation.
 *
 * Layer order (bottom → top): Shadow → Back Cover → Inside Spread → Spine → Front Cover.
 * GPU-friendly transforms only; clip-path reveals the spread in sync with cover rotation.
 */
export function JournalBook({ play }: JournalBookProps) {
  const journalScale = useMotionValue(CAMERA_PUSH_SCALE);
  const journalY = useMotionValue(CAMERA_PUSH_Y);
  const journalOpacity = useMotionValue(0);
  const settleScale = useMotionValue(1);
  const coverRotateY = useMotionValue(0);
  const pageScaleX = useMotionValue(PAGES_CLOSED.scaleX);
  const pageX = useMotionValue(PAGES_CLOSED.x);
  const pageOpacity = useMotionValue(PAGES_CLOSED.opacity);

  const combinedScale = useTransform(
    [journalScale, settleScale],
    ([base, settle]) => (base as number) * (settle as number),
  );

  const spreadClipPath = useSpreadClipPath(coverRotateY);
  const hingeShadowOpacity = useHingeShadowOpacity(coverRotateY);
  const { blur: shadowBlur, opacity: shadowOpacity } =
    useGroundShadow(coverRotateY);

  const groundShadowFilter = useTransform(shadowBlur, (b) => `blur(${b}px)`);

  useEffect(() => {
    const reset = () => {
      journalScale.stop();
      journalY.stop();
      journalOpacity.stop();
      settleScale.stop();
      coverRotateY.stop();
      pageScaleX.stop();
      pageX.stop();
      pageOpacity.stop();

      journalScale.set(CAMERA_PUSH_SCALE);
      journalY.set(CAMERA_PUSH_Y);
      journalOpacity.set(0);
      settleScale.set(1);
      coverRotateY.set(0);
      pageScaleX.set(PAGES_CLOSED.scaleX);
      pageX.set(PAGES_CLOSED.x);
      pageOpacity.set(PAGES_CLOSED.opacity);
    };

    if (!play) {
      reset();
      return;
    }

    reset();

    const controls: ReturnType<typeof animate>[] = [];
    const cameraDelay = TIMING.cameraPushDelay / 1000;
    const cameraDuration = TIMING.cameraPushDuration / 1000;
    const coverDelay = TIMING.coverOpenDelay / 1000;
    const coverDuration = TIMING.coverOpenDuration / 1000;
    const pagesDelay = TIMING.pagesExpandDelay / 1000;
    const pagesDuration = TIMING.pagesExpandDuration / 1000;
    const settleDelay = TIMING.settleDelay / 1000;
    const settleDuration = TIMING.settleDuration / 1000;

    // Phase 2 — Camera push (scale, translateY, opacity)
    controls.push(
      animate(journalScale, 1, {
        delay: cameraDelay,
        duration: cameraDuration,
        ease: EASE_OUT_QUART,
      }),
    );
    controls.push(
      animate(journalY, 0, {
        delay: cameraDelay,
        duration: cameraDuration,
        ease: EASE_OUT_QUART,
      }),
    );
    controls.push(
      animate(journalOpacity, 1, {
        delay: cameraDelay,
        duration: cameraDuration,
        ease: EASE_OUT_QUART,
      }),
    );

    // Phase 3 — Front cover rotates around the left spine
    controls.push(
      animate(coverRotateY, COVER_OPEN_DEG, {
        delay: coverDelay,
        duration: coverDuration,
        ease: COVER_OPEN_EASE,
      }),
    );

    // Phase 5 — Pages micro-expansion (spread clip-path follows cover via useTransform)
    controls.push(
      animate(pageScaleX, PAGES_OPEN.scaleX, {
        delay: pagesDelay,
        duration: pagesDuration,
        ease: PAGES_SETTLE_EASE,
      }),
    );
    controls.push(
      animate(pageX, PAGES_OPEN.x, {
        delay: pagesDelay,
        duration: pagesDuration,
        ease: PAGES_SETTLE_EASE,
      }),
    );
    controls.push(
      animate(pageOpacity, PAGES_OPEN.opacity, {
        delay: pagesDelay,
        duration: pagesDuration,
        ease: PAGES_SETTLE_EASE,
      }),
    );

    // Phase 8 — Final overshoot & settle
    controls.push(
      animate(settleScale, [1, SETTLE_SCALE_PEAK, 1], {
        delay: settleDelay,
        duration: settleDuration,
        times: [0, 0.45, 1],
        ease: PAGES_SETTLE_EASE,
      }),
    );
    controls.push(
      animate(coverRotateY, [COVER_OPEN_DEG, SETTLE_COVER_OVERSHOOT, COVER_OPEN_DEG], {
        delay: settleDelay,
        duration: settleDuration,
        times: [0, 0.45, 1],
        ease: PAGES_SETTLE_EASE,
      }),
    );

    return () => {
      controls.forEach((c) => c.stop());
    };
  }, [
    play,
    journalScale,
    journalY,
    journalOpacity,
    settleScale,
    coverRotateY,
    pageScaleX,
    pageX,
    pageOpacity,
  ]);

  return (
    <div
      className="relative overflow-visible"
      style={{
        width: spreadWidth,
        height: spreadHeight,
        padding: SHADOW_BLEED,
        margin: -SHADOW_BLEED,
      }}
    >
      <motion.div
        className="relative"
        style={{
          width: spreadWidth,
          height: spreadHeight,
          scale: combinedScale,
          y: journalY,
          opacity: journalOpacity,
          rotateX: CLOSED_ROTATE_X,
          rotateZ: CLOSED_ROTATE_Z,
          transformStyle: "preserve-3d",
          transformPerspective: BOOK_PERSPECTIVE,
          willChange: play ? "transform, opacity" : "auto",
        }}
      >
        {/* Phase 6 — Ground shadow (blur + opacity evolve with cover rotation) */}
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
            willChange: play ? "filter, opacity" : "auto",
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
          {/* Back cover — hidden beneath the front cover when closed */}
          <BackCover />

          {/* Inside spread — revealed via horizontal clip-path synced to cover rotation */}
          <motion.div
            className="absolute left-0 top-0"
            style={{
              width: spreadWidth,
              height: spreadHeight,
              clipPath: spreadClipPath,
              scaleX: pageScaleX,
              x: pageX,
              opacity: pageOpacity,
              transformOrigin: "left center",
              zIndex: 2,
              willChange: play ? "clip-path, transform, opacity" : "auto",
            }}
          >
            <OpenSpread />
          </motion.div>

          {/* Spine — fixed hinge, never rotates */}
          <Spine />

          {/* Front cover — rotates around left edge */}
          <motion.div
            className="absolute left-0 top-0"
            style={{
              width: coverWidth,
              height: coverHeight,
              rotateY: coverRotateY,
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              zIndex: 4,
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
              <FrontCover />
            </div>

            {/* Phase 7 — Soft inner shadow along the rotating hinge */}
            <motion.div
              className="pointer-events-none absolute left-0 top-0 h-full w-[22px]"
              style={{
                opacity: hingeShadowOpacity,
                background:
                  "linear-gradient(to right, rgba(12, 28, 22, 0.55) 0%, rgba(12, 28, 22, 0.18) 42%, transparent 100%)",
                zIndex: 5,
                willChange: play ? "opacity" : "auto",
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
        </div>
      </motion.div>

      <Bookmark />
    </div>
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
