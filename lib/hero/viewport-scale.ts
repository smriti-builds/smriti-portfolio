import { heroContent } from "@/lib/content/hero";

/** Scale-to-fit factor shared by chaos and clean so both modes match at the same breakpoint. */
export function getHeroViewportScale(
  viewportWidth: number,
  viewportHeight: number,
): number {
  const { width, height } = heroContent.artboard;
  return Math.min(1, viewportWidth / width, viewportHeight / height);
}

export function getHeroFrameHeight(
  viewportWidth: number,
  viewportHeight: number,
): number {
  const scaledArtboardHeight =
    heroContent.artboard.height * getHeroViewportScale(viewportWidth, viewportHeight);
  return Math.max(scaledArtboardHeight, viewportHeight);
}
