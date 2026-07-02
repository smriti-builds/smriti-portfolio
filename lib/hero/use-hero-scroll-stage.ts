import { useCallback, useEffect, useState, type RefObject } from "react";

/** 0 = chaos, 1 = clean (still in hero), 2 = scrolled past hero */
export type HeroScrollStage = 0 | 1 | 2;

const HERO_SCROLL_SNAPS = 2;

export function useHeroScrollStage(
  heroTrackRef: RefObject<HTMLElement | null>,
): HeroScrollStage {
  const [stage, setStage] = useState<HeroScrollStage>(0);

  const updateStage = useCallback(() => {
    const track = heroTrackRef.current;
    if (!track) return;

    const viewport = window.innerHeight;
    const scrolled = window.scrollY - track.offsetTop;
    const maxScroll = track.offsetHeight - viewport;

    if (maxScroll <= 8) {
      setStage(scrolled > 8 ? 2 : 0);
      return;
    }

    if (scrolled >= maxScroll - 8) {
      setStage(2);
      return;
    }

    if (scrolled >= Math.min(viewport * 0.2, maxScroll * 0.5)) {
      setStage(1);
      return;
    }

    setStage(0);
  }, [heroTrackRef]);

  useEffect(() => {
    updateStage();
    window.addEventListener("scroll", updateStage, { passive: true });
    window.addEventListener("resize", updateStage);
    return () => {
      window.removeEventListener("scroll", updateStage);
      window.removeEventListener("resize", updateStage);
    };
  }, [updateStage]);

  return stage;
}

export function scrollToHeroStage(stage: HeroScrollStage, heroTrack: HTMLElement | null) {
  if (!heroTrack) return;

  const viewport = window.innerHeight;
  const maxScroll = Math.max(0, heroTrack.offsetHeight - viewport);

  const targets: Record<HeroScrollStage, number> = {
    0: heroTrack.offsetTop,
    1: heroTrack.offsetTop + Math.min(viewport, maxScroll * 0.5),
    2: heroTrack.offsetTop + maxScroll,
  };

  window.scrollTo({ top: targets[stage], behavior: "smooth" });
}

export { HERO_SCROLL_SNAPS };
