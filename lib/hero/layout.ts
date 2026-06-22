import type { CSSProperties } from "react";

/**
 * Hero layout helpers — px-only coordinate pipeline (Figma → hero.ts → CSS).
 * Do not refactor callers to flex/grid or convert units; match Figma visually instead.
 */
export function px(value: number): string {
  return `${value}px`;
}

/** Map Figma x/y/width/height (px) to absolute positioning on the artboard canvas. */
export function artboardRect(
  x: number,
  y: number,
  width?: number,
  height?: number,
): CSSProperties {
  return {
    position: "absolute",
    left: px(x),
    top: px(y),
    ...(width !== undefined ? { width: px(width) } : {}),
    ...(height !== undefined ? { height: px(height) } : {}),
  };
}

/**
 * Fixed Figma artboard frame — top-left origin, no scaling.
 * All collage/headline coords in hero.ts are px offsets from this box.
 */
export function artboardCanvasStyle(
  width: number,
  height: number,
): CSSProperties {
  return {
    position: "relative",
    width: px(width),
    height: px(height),
  };
}
