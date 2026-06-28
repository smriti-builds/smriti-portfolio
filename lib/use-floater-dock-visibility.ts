"use client";

import { useEffect, useState } from "react";

/** Shows the floater dock once the user scrolls past the 2nd fold (featured work). */
export function useFloaterDockVisible(triggerId = "floater-dock-trigger") {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -20% 0px",
      },
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [triggerId]);

  return visible;
}
