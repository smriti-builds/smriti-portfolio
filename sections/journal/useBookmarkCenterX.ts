"use client";

import { useTransform, type MotionValue } from "framer-motion";
import { journalBookmark } from "@/lib/content/journal";
import {
  JOURNAL_SPINE_WIDTH,
  spreadWidth,
} from "@/sections/journal/constants";

const { width, spineInset } = journalBookmark;

const CLOSED_CENTER_X = JOURNAL_SPINE_WIDTH + spineInset;
const OPEN_CENTER_X = spreadWidth / 2 - spineInset;

/** Bookmark center — inset from spine on the left page in every state. */
export function bookmarkCenterXFromProgress(openProgress: number) {
  return CLOSED_CENTER_X + (OPEN_CENTER_X - CLOSED_CENTER_X) * openProgress;
}

export function bookmarkLeftFromProgress(openProgress: number) {
  return bookmarkCenterXFromProgress(openProgress) - width / 2;
}

export function useBookmarkLeft(openProgress: MotionValue<number>) {
  return useTransform(openProgress, (p) => bookmarkLeftFromProgress(p));
}
