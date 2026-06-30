import Image from "next/image";
import { journalCoverInsideColor, journalDimensions } from "@/lib/content/journal";
import { JOURNAL_SPINE_WIDTH } from "@/sections/journal/constants";

const { spreadWidth, spreadHeight } = journalDimensions;

/** Full-footprint board hidden beneath the spread. */
export function BackCover() {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[6px]"
      style={{
        background: `linear-gradient(145deg, ${journalCoverInsideColor} 0%, #144a36 55%, #123d2d 100%)`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      aria-hidden
    />
  );
}

export const journalFootprint = {
  width: spreadWidth,
  height: spreadHeight,
};
