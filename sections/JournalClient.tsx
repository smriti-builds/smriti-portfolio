"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import {
  journalClosedImage,
  journalContent,
  journalOpenSpreadImage,
} from "@/lib/content/journal";
import { useMediaQuery } from "@/lib/use-media-query";

const SECTION_SCROLL_HEIGHT = "220vh";

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
              {/* Closed journal — pops in, then fades as user scrolls */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: closedOpacity, scale: closedScale }}
                aria-hidden={false}
              >
                <ClosedJournal />
              </motion.div>

              {/* Open spread + copy — revealed on scroll */}
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

function ClosedJournal() {
  return (
    <div
      className="relative w-full max-w-[494px]"
      style={{ aspectRatio: `${journalClosedImage.width} / ${journalClosedImage.height}` }}
    >
      <Image
        src={journalClosedImage.src}
        alt=""
        width={journalClosedImage.intrinsicWidth}
        height={journalClosedImage.intrinsicHeight}
        sizes="(max-width: 768px) 80vw, 494px"
        quality={100}
        className="size-full object-contain"
        draggable={false}
        priority
      />
    </div>
  );
}

function OpenJournalLayout() {
  const { headline, body } = journalContent;
  const spread = journalOpenSpreadImage;

  return (
    <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div className="flex flex-col gap-6 lg:max-w-[520px]">
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
      className="relative size-full overflow-hidden rounded-sm bg-white shadow-[0_28px_70px_-24px_rgba(32,44,61,0.22)]"
      role="img"
      aria-label="Open journal spread with notes and sketches"
    >
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#e8e4da]" />

      <div className="absolute inset-y-0 left-0 w-1/2 bg-[#fffdf8] p-5 md:p-6">
        <div className="mb-3 h-3 w-2/3 rounded bg-[#f4f0e5]" />
        <div className="space-y-2">
          <div className="h-2 w-full rounded bg-[#f0f4fa]" />
          <div className="h-2 w-5/6 rounded bg-[#f0f4fa]" />
          <div className="h-2 w-4/6 rounded bg-[#f0f4fa]" />
        </div>
        <div className="absolute bottom-5 left-5 right-3 h-[42%] rounded-md bg-[#ececff]/80 md:bottom-6 md:left-6" />
      </div>

      <div className="absolute inset-y-0 right-0 w-1/2 bg-[#fffdf8] p-5 md:p-6">
        <div className="grid h-full grid-cols-2 gap-2">
          <div className="rounded-md bg-[#f4f0e5]" />
          <div className="rounded-md bg-[#d4efdd]/70" />
          <div className="col-span-2 rounded-md bg-[#e5f2ff]/80" />
        </div>
      </div>
    </div>
  );
}
