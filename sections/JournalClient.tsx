"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import {
  journalClosedImage,
  journalClosedLabels,
  journalContent,
  journalOpenSpreadImage,
} from "@/lib/content/journal";
import { useMediaQuery } from "@/lib/use-media-query";

const SECTION_SCROLL_HEIGHT = "220vh";

function JournalLabelIcon({ type }: { type: "grid" | "user" | "calendar" }) {
  if (type === "grid") {
    return (
      <svg viewBox="0 0 20 20" className="size-5 shrink-0" aria-hidden>
        <rect x="2.5" y="2.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <rect x="11.5" y="2.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <rect x="2.5" y="11.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <rect x="11.5" y="11.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </svg>
    );
  }

  if (type === "user") {
    return (
      <svg viewBox="0 0 20 20" className="size-5 shrink-0" aria-hidden>
        <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M4.5 16.5c.8-2.8 2.8-4.5 5.5-4.5s4.7 1.7 5.5 4.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" className="size-5 shrink-0" aria-hidden>
      <rect x="3.5" y="4.5" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M3.5 8.5h13M7 3v3M13 3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** Figma 1084:15781 — white journal cover card */
export function JournalClosedCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-[280px] max-w-[78vw] bg-white px-7 py-8 shadow-[0_24px_60px_-20px_rgba(32,44,61,0.28)] ${className}`}
      style={{ aspectRatio: `${journalClosedImage.width} / ${journalClosedImage.height}` }}
    >
      <div className="flex h-full flex-col justify-center gap-7">
        {journalClosedLabels.map(({ label, icon }) => (
          <div key={label} className="flex items-center gap-4 text-text-primary">
            <JournalLabelIcon type={icon} />
            <span className="font-instrument-serif text-[22px] leading-none tracking-[0.02em]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function JournalClient() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isStatic = prefersReducedMotion || isMobile;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "end 0.12"],
  });

  const popProgress = useSpring(
    useTransform(scrollYProgress, [0, 0.18], [0, 1]),
    { stiffness: 260, damping: 26, mass: 0.8 },
  );

  const closedScale = useTransform(popProgress, [0, 1], [0.84, 1]);
  const closedOpacity = useTransform(scrollYProgress, [0, 0.08, 0.48, 0.62], [0, 1, 1, 0]);
  const openOpacity = useTransform(scrollYProgress, [0.42, 0.68], [0, 1]);
  const openY = useTransform(scrollYProgress, [0.42, 0.68], [32, 0]);

  return (
    <section
      ref={sectionRef}
      id="journal"
      aria-label="Journal"
      className="relative w-full bg-bg-cream"
      style={isStatic ? undefined : { height: SECTION_SCROLL_HEIGHT }}
    >
      <div
        className={
          isStatic
            ? "mx-auto w-full max-w-[1440px] px-6 py-24 md:px-[88px] md:py-[100px]"
            : "sticky top-0 flex h-screen w-full items-center overflow-hidden"
        }
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center px-6 md:px-[88px]">
          {isStatic ? (
            <OpenJournalLayout />
          ) : (
            <div className="relative flex h-full w-full max-w-[1266px] items-center justify-center">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: closedOpacity, scale: closedScale }}
              >
                <JournalClosedCard />
              </motion.div>

              <motion.div
                className="absolute inset-0 flex items-center"
                style={{ opacity: openOpacity, y: openY }}
              >
                <OpenJournalLayout />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function OpenJournalLayout() {
  const { kicker, kickerAccent, intro, headline, body } = journalContent;
  const spread = journalOpenSpreadImage;

  return (
    <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
      <div className="flex flex-col gap-6 lg:max-w-[520px]">
        <div className="flex flex-col gap-1">
          <p className="font-instrument-serif text-[32px] uppercase leading-none tracking-[0.08em] text-text-primary md:text-[40px]">
            {kicker}
          </p>
          <p className="font-instrument-serif text-[32px] italic leading-none tracking-[0.04em] text-text-primary md:text-[40px]">
            {kickerAccent}
          </p>
        </div>
        <p className="font-instrument-sans text-[18px] leading-[28px] text-text-secondary">
          {intro}
        </p>
        <h2 className="font-instrument-sans text-[36px] font-bold leading-[1.15] text-text-primary md:text-[44px] md:leading-[52px]">
          {headline}
        </h2>
        <p className="font-instrument-sans text-[18px] leading-[28px] text-text-secondary">
          {body}
        </p>
      </div>

      <div
        className="relative mx-auto w-full max-w-[493px] lg:mx-0 lg:justify-self-end"
        style={{ aspectRatio: `${spread.width} / ${spread.height}` }}
      >
        <JournalOpenSpread />
      </div>
    </div>
  );
}

function JournalOpenSpread() {
  return (
    <div
      className="relative size-full overflow-hidden rounded-sm bg-[#fffdf8] shadow-[0_28px_70px_-24px_rgba(32,44,61,0.22)]"
      role="img"
      aria-label="Open journal spread with notes and sketches"
    >
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#e8e4da]" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-[#fffdf8] p-6">
        <div className="h-[45%] rounded-md bg-[#ececff]/90" />
        <div className="mt-4 space-y-2">
          <div className="h-2 w-full rounded bg-[#f0f4fa]" />
          <div className="h-2 w-5/6 rounded bg-[#f0f4fa]" />
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[#fffdf8] p-6">
        <div className="grid h-full grid-cols-2 gap-2">
          <div className="rounded-md bg-[#f4f0e5]" />
          <div className="rounded-md bg-[#d4efdd]/80" />
          <div className="col-span-2 rounded-md bg-[#e5f2ff]/80" />
        </div>
      </div>
    </div>
  );
}
