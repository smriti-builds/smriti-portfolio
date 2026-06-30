"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { journalCover, journalOpenSpread, journalSectionFrame } from "@/lib/content/journal";
import { useMediaQuery } from "@/lib/use-media-query";
import {
  JournalInteractive,
  JournalStaticClosed,
  JournalStaticOpen,
} from "@/sections/journal/JournalInteractive";

const JOURNAL_SECTION_HEIGHT = 918;
const WORK_JOURNAL_GAP = 100;

function JournalTornTopEdge() {
  const { tornEdgeTop } = journalSectionFrame;

  return (
    <div className="w-full bg-white">
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
    <div className="w-full bg-white">
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
    <div className="relative w-full">
      <div
        className="relative flex w-full items-center justify-center overflow-visible px-6 md:px-[88px]"
        style={{ backgroundColor: background, height: JOURNAL_SECTION_HEIGHT }}
      >
        {children}
      </div>
      <JournalTornBottomEdge />
    </div>
  );
}

function useJournalAssetPreload() {
  useEffect(() => {
    for (const src of [journalCover.src, journalOpenSpread.src]) {
      const img = new window.Image();
      img.src = src;
    }
  }, []);
}

export default function Journal() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isStatic = prefersReducedMotion || isMobile;
  const [showOpen, setShowOpen] = useState(isStatic);

  useEffect(() => {
    if (isStatic) setShowOpen(true);
  }, [isStatic]);

  useJournalAssetPreload();

  return (
    <section id="journal" aria-label="Journal" className="relative w-full">
      <div
        className="w-full bg-white"
        style={{ height: WORK_JOURNAL_GAP }}
        aria-hidden
      />
      <JournalTornTopEdge />
      <JournalSectionFrame>
        <div className="flex w-full justify-center">
          {isStatic ? (
            <button
              type="button"
              aria-label={showOpen ? "Close journal" : "Open journal"}
              aria-expanded={showOpen}
              onClick={() => setShowOpen((open) => !open)}
              className="cursor-pointer overflow-visible border-0 bg-transparent p-0 select-none"
            >
              {showOpen ? <JournalStaticOpen /> : <JournalStaticClosed />}
            </button>
          ) : (
            <JournalInteractive />
          )}
        </div>
      </JournalSectionFrame>
    </section>
  );
}
