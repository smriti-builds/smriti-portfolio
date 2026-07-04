"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { journalBookmark, journalCover, journalOpenSpread, journalSectionFrame } from "@/lib/content/journal";
import { useMediaQuery } from "@/lib/use-media-query";
import { JournalBook, JournalOpenSpreadStatic } from "@/sections/journal/JournalBook";
import { JournalStage } from "@/sections/journal/JournalStage";

const WORK_JOURNAL_GAP = 100;

function JournalTornTopEdge() {
  const { tornEdgeTop } = journalSectionFrame;

  return (
    <div className="surface-bleed-x w-full bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tornEdgeTop}
        alt=""
        aria-hidden
        width={2880}
        height={54}
        className="block w-full min-w-full max-w-none leading-[0]"
        style={{ aspectRatio: "2880 / 54" }}
      />
    </div>
  );
}

function JournalTornBottomEdge() {
  const { tornEdgeBottom } = journalSectionFrame;

  return (
    <div className="surface-bleed-x w-full bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tornEdgeBottom}
        alt=""
        aria-hidden
        width={2880}
        height={54}
        className="block w-full min-w-full max-w-none scale-y-[-1] leading-[0]"
        style={{ aspectRatio: "2880 / 54" }}
      />
    </div>
  );
}

function JournalSectionFrame({ children }: { children: ReactNode }) {
  const { background } = journalSectionFrame;

  return (
    <div className="surface-bleed-x relative w-full">
      <div
        className="relative flex w-full items-center justify-center overflow-x-clip px-6 py-10 md:h-[918px] md:px-[88px] md:py-0"
        style={{ backgroundColor: background }}
      >
        {children}
      </div>
      <JournalTornBottomEdge />
    </div>
  );
}

function useJournalAssetPreload() {
  useEffect(() => {
    for (const src of [
      journalCover.src,
      journalOpenSpread.src,
      journalBookmark.top.src,
      journalBookmark.bottom.src,
      "/Journal/Back cover.png",
      "/Journal/spine.png",
    ]) {
      const img = new window.Image();
      img.src = src;
    }
  }, []);
}

export default function Journal() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isStatic = prefersReducedMotion || isMobile;

  useJournalAssetPreload();

  return (
    <section id="journal" aria-label="Journal" className="relative w-full min-w-0 max-w-[100vw] overflow-x-clip">
      <div
        className="surface-bleed-x w-full bg-white"
        style={{ height: WORK_JOURNAL_GAP }}
        aria-hidden
      />
      <JournalTornTopEdge />
      <JournalSectionFrame>
        <div className="flex w-full items-center justify-center overflow-visible md:h-full">
          {isStatic ? (
            <JournalOpenSpreadStatic responsive className="mx-auto w-full" />
          ) : (
            <JournalStage>
              <JournalBook />
            </JournalStage>
          )}
        </div>
      </JournalSectionFrame>
    </section>
  );
}
