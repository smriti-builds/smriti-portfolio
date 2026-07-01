"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  journalClosedDropShadow,
  journalSpreadDropShadow,
} from "@/lib/content/journal";
import { BackCover } from "@/sections/journal/BackCover";
import {
  BOOK_PERSPECTIVE,
  CAMERA_PUSH_SCALE,
  COVER_LIFT_Z,
  COVER_OPEN_DEG,
  coverHeight,
  coverWidth,
  JOURNAL_BORDER_RADIUS,
  OPEN_ZOOM_SCALE,
  SHADOW_BLEED,
  spreadHeight,
  spreadWidth,
} from "@/sections/journal/constants";
import { FrontCover } from "@/sections/journal/FrontCover";
import { JournalViewport } from "@/sections/journal/JournalViewport";
import { OpenSpread } from "@/sections/journal/OpenSpread";
import { Spine } from "@/sections/journal/Spine";
import { useJournalInteraction } from "@/sections/journal/useJournalInteraction";

function coverProgressFromDeg(deg: number) {
  return Math.min(Math.abs(deg) / Math.abs(COVER_OPEN_DEG), 1);
}

/** Rounded inset clip — rounds the cut edge when closed; open state uses asset alpha. */
function buildHorizontalClip(progress: number) {
  const w = coverWidth + (spreadWidth - coverWidth) * progress;
  const clipRight = Math.max(0, spreadWidth - w);

  if (clipRight <= 0.5) {
    return "none";
  }

  const r = JOURNAL_BORDER_RADIUS;

  const closedCoverOnly = w <= coverWidth + 0.5;
  const spineRounded = progress < 0.1 || progress > 0.92;

  const roundTL = spineRounded ? r : 0;
  const roundBL = spineRounded ? r : 0;
  const roundTR = closedCoverOnly ? r : 0;
  const roundBR = closedCoverOnly ? r : 0;

  return `inset(0 ${clipRight}px 0 0 round ${roundTL}px ${roundTR}px ${roundBR}px ${roundBL}px)`;
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
    return `0px ${y}px ${blur}px -2px rgba(32, 44, 61, ${alpha})`;
  });
}

export function JournalBook() {
  const prefersReducedMotion = useReducedMotion();
  const openProgress = useMotionValue(0);
  const idlePeekDeg = useMotionValue(0);

  const { isOpen, handleClick, handlePointerEnter, handlePointerLeave } =
    useJournalInteraction({
      openProgress,
      idlePeekDeg,
      reduceMotion: prefersReducedMotion,
    });

  /** Closed push-in → neutral → subtle zoom when open. */
  const journalScale = useTransform(
    openProgress,
    [0, 0.14, 0.55, 1],
    [CAMERA_PUSH_SCALE, 1, 1.02, OPEN_ZOOM_SCALE],
  );

  const baseCoverRotateY = useTransform(
    openProgress,
    [0, 1],
    [0, COVER_OPEN_DEG],
  );

  const coverRotateY = useTransform(
    [baseCoverRotateY, idlePeekDeg],
    ([base, peek]) => (base as number) + (peek as number),
  );

  /** Shift scene right when closed so the left-anchored cover sits in the horizontal center. */
  const closedCenterOffset = (spreadWidth - coverWidth) / 2;
  const sceneOffsetX = useTransform(
    openProgress,
    [0, 1],
    [closedCenterOffset, 0],
  );

  /** Horizontal mask with per-corner rounding on the visible footprint. */
  const horizontalClip = useTransform(openProgress, buildHorizontalClip);

  const coverFaceBorderRadius = useTransform(openProgress, (p) =>
    p < 0.1
      ? `${JOURNAL_BORDER_RADIUS}px`
      : `0 ${JOURNAL_BORDER_RADIUS}px ${JOURNAL_BORDER_RADIUS}px 0`,
  );

  const bookDropShadow = useTransform(openProgress, (p) =>
    p > 0.82 ? journalSpreadDropShadow : journalClosedDropShadow,
  );

  const openGroundShadowOpacity = useTransform(openProgress, [0.7, 1], [0, 1]);

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

  const spineFoldOpacity = useTransform(openProgress, [0.6, 0.95], [0, 1]);

  return (
    <button
      type="button"
      aria-label={isOpen ? "Close journal" : "Open journal"}
      aria-expanded={isOpen}
      onClick={handleClick}
      className="flex cursor-pointer items-center justify-center overflow-visible border-0 bg-transparent p-0 select-none"
      style={{
        width: spreadWidth,
        height: spreadHeight + SHADOW_BLEED * 2,
      }}
    >
      <JournalViewport>
        <motion.div
          className="relative overflow-visible"
          style={{
            width: spreadWidth,
            height: spreadHeight,
            x: sceneOffsetX,
            scale: journalScale,
            transformOrigin: "center center",
            filter: bookDropShadow,
            transformStyle: "preserve-3d",
            transformPerspective: BOOK_PERSPECTIVE,
          }}
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-full"
            style={{
              width: spreadWidth * 0.92,
              height: 64,
              x: "-50%",
              y: -8,
              opacity: openGroundShadowOpacity,
              background:
                "radial-gradient(ellipse 100% 40% at 50% 0%, rgba(32, 44, 61, 0.09) 0%, rgba(32, 44, 61, 0.03) 50%, transparent 78%)",
              filter: "blur(20px)",
              zIndex: 0,
            }}
            aria-hidden
          />

          <motion.div
            className="relative"
            style={{
              width: spreadWidth,
              height: spreadHeight,
              clipPath: horizontalClip,
              zIndex: 1,
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
                  className="pointer-events-none absolute inset-y-0 left-1/2 w-[32px] -translate-x-1/2"
                  style={{
                    opacity: spineFoldOpacity,
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(32, 44, 61, 0.05) 36%, rgba(32, 44, 61, 0.1) 50%, rgba(32, 44, 61, 0.05) 64%, transparent 100%)",
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
                onPointerEnter={!isOpen ? handlePointerEnter : undefined}
                onPointerLeave={!isOpen ? handlePointerLeave : undefined}
              >
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    borderRadius: coverFaceBorderRadius,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <FrontCover />
                </motion.div>

                <motion.div
                  className="pointer-events-none absolute left-0 top-0 h-full w-[16px]"
                  style={{
                    opacity: hingeShadowOpacity,
                    background:
                      "linear-gradient(to right, rgba(32, 44, 61, 0.18) 0%, rgba(32, 44, 61, 0.06) 55%, transparent 100%)",
                    zIndex: 5,
                  }}
                  aria-hidden
                />

                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    opacity: coverInsideOpacity,
                    borderRadius: `0 ${JOURNAL_BORDER_RADIUS}px ${JOURNAL_BORDER_RADIUS}px 0`,
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
        filter: journalClosedDropShadow,
        borderRadius: JOURNAL_BORDER_RADIUS,
      }}
    >
      <FrontCover />
      <Spine opacity={spineOpacity} />
    </div>
  );
}
