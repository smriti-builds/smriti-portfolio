"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { journalBookmark, journalSpreadDropShadow } from "@/lib/content/journal";
import { BackCover } from "@/sections/journal/BackCover";
import {
  BOOK_PERSPECTIVE,
  CLOSED_JOURNAL_WIDTH,
  COVER_OPEN_DEG,
  JOURNAL_HINGE_X,
  OPEN_DELAY_MS,
  OPEN_TRANSITION,
  coverHeight,
  coverWidth,
  spreadHeight,
  spreadWidth,
} from "@/sections/journal/constants";
import { FrontCover } from "@/sections/journal/FrontCover";
import { OpenSpread } from "@/sections/journal/OpenSpread";
import { Spine } from "@/sections/journal/Spine";

export function JournalInteractive() {
  const prefersReducedMotion = useReducedMotion();
  const hasAutoOpened = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const openProgress = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsOpen(true);
      return;
    }
    if (hasAutoOpened.current) return;

    const timer = window.setTimeout(() => {
      hasAutoOpened.current = true;
      setIsOpen(true);
    }, OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const controls = animate(openProgress, isOpen ? 1 : 0, OPEN_TRANSITION);
    return () => controls.stop();
  }, [isOpen, openProgress]);

  const journalWidth = useTransform(
    openProgress,
    [0, 1],
    [CLOSED_JOURNAL_WIDTH, spreadWidth],
  );
  const cameraScale = useTransform(openProgress, [0, 1], [1, 1.03]);
  const spreadOpacity = useTransform(openProgress, [0, 0.3, 0.55], [0, 0, 1]);
  const backCoverOpacity = useTransform(openProgress, [0, 0.15, 0.35], [0, 0, 1]);

  const coverRotateY = useTransform(openProgress, [0, 1], [0, COVER_OPEN_DEG]);
  const coverLift = useTransform(openProgress, (v) =>
    Math.sin(v * Math.PI) * 10,
  );
  const coverShadow = useTransform(openProgress, (v) => {
    const lift = Math.sin(v * Math.PI);
    const y = 4 + lift * 24;
    const blur = 10 + v * 46;
    const alpha = 0.07 + v * 0.15;
    return `0px ${y}px ${blur}px -4px rgba(32, 44, 61, ${alpha})`;
  });

  const bookDropShadow = useTransform(openProgress, (v) => {
    const lift = Math.sin(v * Math.PI);
    const y1 = 2 + lift * 5;
    const blur1 = 6 + v * 10;
    const y2 = 12 + lift * 16;
    const blur2 = 28 + v * 30;
    const y3 = 28 + lift * 30;
    const blur3 = 56 + v * 40;
    const alpha1 = 0.04 + v * 0.03;
    const alpha2 = 0.07 + v * 0.05;
    const alpha3 = 0.09 + v * 0.04;
    return `drop-shadow(0 ${y1}px ${blur1}px rgba(32, 44, 61, ${alpha1})) drop-shadow(0 ${y2}px ${blur2}px rgba(32, 44, 61, ${alpha2})) drop-shadow(0 ${y3}px ${blur3}px rgba(32, 44, 61, ${alpha3}))`;
  });

  const toggleJournal = () => setIsOpen((open) => !open);

  return (
    <div
      className="relative mx-auto"
      style={{ width: spreadWidth, height: spreadHeight }}
    >
      <motion.button
        type="button"
        aria-label={isOpen ? "Close journal" : "Open journal"}
        aria-expanded={isOpen}
        onClick={toggleJournal}
        className="absolute left-0 top-0 block cursor-pointer overflow-visible border-0 bg-transparent p-0 select-none"
        style={{
          width: journalWidth,
          height: spreadHeight,
          scale: cameraScale,
          filter: bookDropShadow,
          transformOrigin: "left center",
        }}
      >
        {/* Bookmark — attached to the journal, not the cover */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: JOURNAL_HINGE_X / 2 - journalBookmark.width / 2 + 1,
            top: -26,
            width: journalBookmark.width,
            height: journalBookmark.height,
            zIndex: 3,
          }}
          aria-hidden
        >
          <Image
            src={journalBookmark.src}
            alt=""
            width={journalBookmark.intrinsicWidth}
            height={journalBookmark.intrinsicHeight}
            className="size-full object-cover object-top"
            draggable={false}
          />
        </div>

        <div
          className="relative overflow-visible"
          style={{
            width: spreadWidth,
            height: spreadHeight,
            perspective: BOOK_PERSPECTIVE,
            perspectiveOrigin: `${JOURNAL_HINGE_X}px center`,
          }}
        >
          {/* ── Stationary stack: back cover + spread (magazine sheet, never moves) ── */}
          <motion.div
            className="absolute left-0 top-0"
            style={{
              width: spreadWidth,
              height: spreadHeight,
              opacity: backCoverOpacity,
              zIndex: 1,
            }}
          >
            <BackCover />
          </motion.div>

          <motion.div
            className="absolute left-0 top-0"
            style={{
              width: spreadWidth,
              height: spreadHeight,
              opacity: spreadOpacity,
              zIndex: 2,
            }}
          >
            <OpenSpread />
          </motion.div>

          <Spine />

          {/* ── Sole hinged element: front cover lid ── */}
          <motion.div
            className="absolute top-0 overflow-visible"
            style={{
              left: JOURNAL_HINGE_X,
              width: coverWidth,
              height: coverHeight,
              rotateY: coverRotateY,
              translateZ: coverLift,
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              boxShadow: coverShadow,
              zIndex: 5,
              willChange: "transform",
            }}
          >
            <div
              className="size-full"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <FrontCover />
            </div>
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
}

/** Static fallback — open magazine spread. */
export function JournalStaticOpen() {
  return (
    <div
      className="relative mx-auto"
      style={{ width: spreadWidth, height: spreadHeight }}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: spreadWidth,
          height: spreadHeight,
          filter: journalSpreadDropShadow,
        }}
      >
      <BackCover />
      <div
        className="absolute left-0 top-0"
        style={{ width: spreadWidth, height: spreadHeight, zIndex: 2 }}
      >
        <OpenSpread />
      </div>
      <Spine />
      <div
        className="pointer-events-none absolute"
        style={{
          left: JOURNAL_HINGE_X / 2 - journalBookmark.width / 2 + 1,
          top: -26,
          width: journalBookmark.width,
          height: journalBookmark.height,
          zIndex: 3,
        }}
        aria-hidden
      >
        <Image
          src={journalBookmark.src}
          alt=""
          width={journalBookmark.intrinsicWidth}
          height={journalBookmark.intrinsicHeight}
          className="size-full object-cover object-top"
          draggable={false}
        />
      </div>
      </div>
    </div>
  );
}

/** Static fallback — closed cover. */
export function JournalStaticClosed() {
  return (
    <div
      className="relative mx-auto"
      style={{ width: spreadWidth, height: spreadHeight }}
    >
      <div
        className="absolute left-0 top-0 overflow-visible"
        style={{
          width: CLOSED_JOURNAL_WIDTH,
          height: spreadHeight,
          filter: journalSpreadDropShadow,
        }}
      >
      <Spine />
      <div
        className="absolute top-0"
        style={{ left: JOURNAL_HINGE_X, width: coverWidth, height: coverHeight }}
      >
        <FrontCover />
      </div>
      <div
        className="pointer-events-none absolute"
        style={{
          left: JOURNAL_HINGE_X / 2 - journalBookmark.width / 2 + 1,
          top: -26,
          width: journalBookmark.width,
          height: journalBookmark.height,
          zIndex: 3,
        }}
        aria-hidden
      >
        <Image
          src={journalBookmark.src}
          alt=""
          width={journalBookmark.intrinsicWidth}
          height={journalBookmark.intrinsicHeight}
          className="size-full object-cover object-top"
          draggable={false}
        />
      </div>
      </div>
    </div>
  );
}
