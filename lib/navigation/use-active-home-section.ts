"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocationHash } from "@/lib/navigation/use-location-hash";

const HOME_SECTION_IDS = [
  "hero",
  "featured-work",
  "journal",
  "experiments",
  "writing",
] as const;

/**
 * Returns the active homepage section from the URL hash, or from scroll position
 * when no hash is set. Returns an empty string off the homepage.
 */
export function useActiveHomeSection(): string {
  const pathname = usePathname();
  const hash = useLocationHash();
  const [scrollSection, setScrollSection] = useState("hero");

  useEffect(() => {
    if (pathname !== "/") return;

    const elements = HOME_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el != null,
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (intersecting[0]) {
          setScrollSection(intersecting[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.75],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname !== "/") return "";

  if (hash) return hash;

  return scrollSection;
}
