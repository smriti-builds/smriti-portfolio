/** Mobile-only clean hero — below Tailwind `md` (768px). Tablet and desktop use the full hero. */
export const HERO_MOBILE_BREAKPOINT = 768;

export function isHeroMobileViewport(viewportWidth: number): boolean {
  return viewportWidth < HERO_MOBILE_BREAKPOINT;
}
