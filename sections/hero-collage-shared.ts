import type { HeroCollageItem } from "@/types/hero";

/** Collage items flagged for LCP preloading (keep this list small). */
export const HERO_PRIORITY_COLLAGE_IDS = new Set([
  "desk-lamp",
  "starry-night",
  "stamps",
]);

/** Artboard y threshold — items below this defer image loading. */
export const HERO_BELOW_FOLD_Y = 520;

export function collageTransformOrigin(item: HeroCollageItem): string {
  return item.transformOrigin ?? "center center";
}

export function collageImageLoading(
  item: HeroCollageItem,
): { priority?: true; loading?: "lazy" } {
  if (HERO_PRIORITY_COLLAGE_IDS.has(item.id)) {
    return { priority: true };
  }

  if (item.y > HERO_BELOW_FOLD_Y) {
    return { loading: "lazy" };
  }

  return {};
}
