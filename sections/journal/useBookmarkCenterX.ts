"use client";

import { useTransform, type MotionValue } from "framer-motion";
import { journalBookmark } from "@/lib/content/journal";
import {
  JOURNAL_SPINE_WIDTH,
  spreadWidth,
} from "@/sections/journal/constants";

const { width, spineInset } = journalBookmark;

/** Spine line travels from closed inner edge → open center fold. */
export function spineLineX(openProgress: number) {
  return (
    JOURNAL_SPINE_WIDTH +
    (spreadWidth / 2 - JOURNAL_SPINE_WIDTH) * openProgress
  );
}

/** Bookmark center — constant inset from the spine in every state. */
export function bookmarkCenterXFromProgress(openProgress: number) {
  return spineLineX(openProgress) + spineInset;
}

export function bookmarkLeftFromProgress(openProgress: number) {
  return bookmarkCenterXFromProgress(openProgress) - width / 2;
}

export function useBookmarkLeft(openProgress: MotionValue<number>) {
  return useTransform(openProgress, (p) => bookmarkLeftFromProgress(p));
}
