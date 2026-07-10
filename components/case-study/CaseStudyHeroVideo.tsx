"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useMediaQuery } from "@/lib/use-media-query";
import type {
  CaseStudyHeroVideoOverlay,
  CaseStudyHeroVideoViewport,
} from "@/types/case-study";

const DEFAULT_HERO_VIDEO_VIEWPORT = {
  desktop: {
    top: 8.6,
    left: 38.1,
    width: 23.8,
    height: 82.8,
    borderRadius: 9.5,
  },
  mobile: {
    top: 8.8,
    left: 38,
    width: 24,
    height: 82.4,
    borderRadius: 9,
  },
} as const;

function viewportStyle(viewport: CaseStudyHeroVideoViewport): CSSProperties {
  return {
    top: `${viewport.top}%`,
    left: `${viewport.left}%`,
    width: `${viewport.width}%`,
    height: `${viewport.height}%`,
    borderTopLeftRadius: `${viewport.borderRadius}%`,
    borderTopRightRadius: `${viewport.borderRadius}%`,
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
  };
}

type CaseStudyHeroVideoProps = {
  overlay: CaseStudyHeroVideoOverlay;
  cropStyle: CSSProperties;
};

export default function CaseStudyHeroVideo({
  overlay,
  cropStyle,
}: CaseStudyHeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const viewport = isDesktop
    ? (overlay.desktopViewport ?? DEFAULT_HERO_VIDEO_VIEWPORT.desktop)
    : (overlay.mobileViewport ??
      overlay.desktopViewport ??
      DEFAULT_HERO_VIDEO_VIEWPORT.mobile);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          videoRef.current?.play().catch(() => {});
          return;
        }

        videoRef.current?.pause();
      },
      { rootMargin: "160px 0px", threshold: 0.01 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    videoRef.current?.play().catch(() => {});
  }, [shouldLoad, isDesktop]);

  return (
    <div
      ref={containerRef}
      className="absolute overflow-hidden"
      style={viewportStyle(viewport)}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover object-top"
        src={shouldLoad ? overlay.videoSrc : undefined}
        aria-label={overlay.videoAlt}
        style={cropStyle}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        preload="none"
      />
    </div>
  );
}
