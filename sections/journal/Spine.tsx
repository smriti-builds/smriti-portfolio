import { JOURNAL_SPINE_WIDTH, spreadHeight } from "@/sections/journal/constants";

/** Stationary spine — never rotates; hinge anchor for the front cover only. */
export function Spine() {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0"
      style={{
        width: JOURNAL_SPINE_WIDTH,
        height: spreadHeight,
        zIndex: 4,
        borderRadius: "4px 0 0 4px",
        background: `linear-gradient(
          90deg,
          #0f3024 0%,
          #1a4d38 22%,
          #2a6b50 50%,
          #1a4d38 78%,
          #0f3024 100%
        )`,
        boxShadow:
          "inset -4px 0 8px rgba(0,0,0,0.38), inset 3px 0 5px rgba(255,255,255,0.07), 2px 0 6px rgba(0,0,0,0.12)",
      }}
      aria-hidden
    />
  );
}
