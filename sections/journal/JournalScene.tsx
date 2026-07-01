"use client";

import { useMotionValue, useTransform } from "framer-motion";
import { BottomBookmark } from "@/sections/journal/BottomBookmark";
import { JournalBook } from "@/sections/journal/JournalBook";
import { JournalStage } from "@/sections/journal/JournalStage";
import { TopBookmark } from "@/sections/journal/TopBookmark";
import { coverWidth, spreadWidth } from "@/sections/journal/constants";

/** Interactive journal with independent top/bottom bookmarks on the stage. */
export function JournalScene() {
  const openProgress = useMotionValue(0);

  const closedCenterOffset = (spreadWidth - coverWidth) / 2;
  const sceneOffsetX = useTransform(
    openProgress,
    [0, 1],
    [closedCenterOffset, 0],
  );

  return (
    <JournalStage>
      <TopBookmark openProgress={openProgress} sceneOffsetX={sceneOffsetX} />
      <JournalBook openProgress={openProgress} className="relative z-[2]" />
      <BottomBookmark openProgress={openProgress} sceneOffsetX={sceneOffsetX} />
    </JournalStage>
  );
}
