"use client";

import { motion, type MotionStyle, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import {
  BOOK_PERSPECTIVE,
  coverHeight,
  coverWidth,
  spreadHeight,
  spreadWidth,
} from "@/sections/journal/constants";
import { FrontCover } from "@/sections/journal/FrontCover";
import { OpenSpread } from "@/sections/journal/OpenSpread";
import { Spine } from "@/sections/journal/Spine";

type JournalSceneProps = {
  showCover?: boolean;
  coverRotateY?: MotionValue<number>;
  coverLift?: MotionValue<number>;
  coverShadow?: MotionValue<string>;
};

/** Full-width journal content — spread, spine, and optional front cover. */
export function JournalScene({
  showCover = false,
  coverRotateY,
  coverLift,
  coverShadow,
}: JournalSceneProps) {
  return (
    <div
      className="relative overflow-visible"
      style={{
        width: spreadWidth,
        height: spreadHeight,
        perspective: BOOK_PERSPECTIVE,
        perspectiveOrigin: "left center",
      }}
    >
      <div
        className="absolute left-0 top-0"
        style={{ width: spreadWidth, height: spreadHeight, zIndex: 1 }}
      >
        <OpenSpread />
      </div>

      <Spine />

      {showCover ? (
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
            willChange: coverRotateY ? "transform" : undefined,
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
      ) : null}
    </div>
  );
}

type JournalWrapperProps = {
  children: ReactNode;
  motionStyle?: MotionStyle;
};

/** Always full spread width; clipped by JournalViewport during closed state. */
export function JournalWrapper({ children, motionStyle }: JournalWrapperProps) {
  if (motionStyle) {
    return (
      <motion.div
        className="relative left-0 top-0"
        style={{
          width: spreadWidth,
          height: spreadHeight,
          transformOrigin: "left center",
          ...motionStyle,
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className="relative left-0 top-0"
      style={{ width: spreadWidth, height: spreadHeight }}
    >
      {children}
    </div>
  );
}
