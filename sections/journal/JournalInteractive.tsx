"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { journalSpreadDropShadow } from "@/lib/content/journal";
import { Bookmark } from "@/sections/journal/Bookmark";
import {
  BOOK_PERSPECTIVE,
  CLOSED_JOURNAL_WIDTH,
  COVER_OPEN_DEG,
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
      className="relative mx-auto overflow-visible"
      style={{ width: spreadWidth, height: spreadHeight }}
    >
      <motion.div
        className="absolute left-0 top-0"
        style={{
          width: journalWidth,
          height: spreadHeight,
          scale: cameraScale,
          filter: bookDropShadow,
          transformOrigin: "left center",
        }}
      >
        <motion.button
          type="button"
          aria-label={isOpen ? "Close journal" : "Open journal"}
          aria-expanded={isOpen}
          onClick={toggleJournal}
          className="block size-full cursor-pointer overflow-hidden border-0 bg-transparent p-0 select-none"
        >
        {/*
          Scene is always full spread width. The spread is stationary from frame 0.
          The cover sits on top of the left page and is the only moving element.
        */}
        <div
          className="relative overflow-visible"
          style={{
            width: spreadWidth,
            height: spreadHeight,
            perspective: BOOK_PERSPECTIVE,
            perspectiveOrigin: "left center",
          }}
        >
          {/* Stationary two-page spread — resume left, workspace right */}
          <div
            className="absolute left-0 top-0"
            style={{ width: spreadWidth, height: spreadHeight, zIndex: 1 }}
          >
            <OpenSpread />
          </div>

          <Spine />

          {/* Sole hinged element: green front cover reveals the spread beneath */}
          <motion.div
            className="absolute top-0 overflow-visible"
            style={{
              left: 0,
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

        <Bookmark />
      </motion.div>
    </div>
  );
}

/** Static fallback — open magazine spread. */
export function JournalStaticOpen() {
  return (
    <div
      className="relative mx-auto overflow-visible"
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
        <div
          className="absolute left-0 top-0"
          style={{ width: spreadWidth, height: spreadHeight, zIndex: 1 }}
        >
          <OpenSpread />
        </div>
        <Spine />
        <Bookmark />
      </div>
    </div>
  );
}

/** Static fallback — closed cover. */
export function JournalStaticClosed() {
  return (
    <div
      className="relative mx-auto overflow-visible"
      style={{ width: spreadWidth, height: spreadHeight }}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: CLOSED_JOURNAL_WIDTH,
          height: spreadHeight,
          filter: journalSpreadDropShadow,
        }}
      >
        <div className="size-full overflow-hidden">
          <Spine />
          <div
            className="absolute top-0 left-0"
            style={{ width: coverWidth, height: coverHeight, zIndex: 5 }}
          >
            <FrontCover />
          </div>
        </div>
        <Bookmark />
      </div>
    </div>
  );
}
