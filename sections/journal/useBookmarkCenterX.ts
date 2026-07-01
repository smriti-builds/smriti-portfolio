"use client";

import { useTransform, type MotionValue } from "framer-motion";
import {
  journalBookmark,
  journalBookmarkDisplay,
} from "@/lib/content/journal";

const { width, closedCenterX } = journalBookmark;
const { openCenterX } = journalBookmarkDisplay;

/** Horizontal left edge for an independent bookmark piece. */
export function useBookmarkLeft(
  openProgress: MotionValue<number>,
  sceneOffsetX: MotionValue<number>,
) {
  return useTransform(() => {
    const p = openProgress.get();
    const centerX = closedCenterX + (openCenterX - closedCenterX) * p;
    return sceneOffsetX.get() + centerX - width / 2;
  });
}

/** Static left edge without motion values. */
export function bookmarkLeftStatic(open: boolean, sceneOffsetX = 0) {
  const centerX = open ? openCenterX : closedCenterX;
  return sceneOffsetX + centerX - width / 2;
}
