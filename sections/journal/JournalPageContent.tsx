"use client";

import type { MotionValue } from "framer-motion";
import { motion } from "framer-motion";
import { journalPageContent } from "@/lib/content/journal";
import { JOURNAL_COVER_WIDTH } from "@/sections/journal/constants";

const DOT_GRID_STYLE = {
  backgroundColor: "#faf9f6",
  backgroundImage: `radial-gradient(circle, #d0cec8 1px, transparent 1px)`,
  backgroundSize: "18px 18px",
} as const;

export function JournalPageSurface() {
  return (
    <div
      className="absolute top-0 overflow-hidden rounded-r-[6px]"
      style={{
        left: JOURNAL_COVER_WIDTH,
        width: JOURNAL_COVER_WIDTH,
        height: "100%",
        ...DOT_GRID_STYLE,
        boxShadow: "inset 1px 0 0 rgba(0,0,0,0.04)",
      }}
    />
  );
}

export function JournalPageContent({
  opacity,
}: {
  opacity: MotionValue<number>;
}) {
  const { name, role, years, experience, contact, todayEntry, handwritten } =
    journalPageContent;

  return (
    <motion.div
      className="pointer-events-none absolute top-0 font-instrument-sans"
      style={{
        left: JOURNAL_COVER_WIDTH,
        width: JOURNAL_COVER_WIDTH,
        height: "100%",
        opacity,
      }}
    >
      <div className="relative h-full px-8 pb-8 pt-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[28px] font-bold leading-tight tracking-tight text-[#1a1a1a]">
              {name}
            </h3>
            <span className="mt-2 inline-block rounded-full bg-[#e8f1fc] px-3 py-1 text-[13px] font-semibold text-[#2b6cb0]">
              {role}
            </span>
          </div>

          <div className="relative shrink-0 pt-1">
            <svg
              aria-hidden
              width="88"
              height="44"
              viewBox="0 0 88 44"
              className="absolute -left-2 -top-1"
            >
              <ellipse
                cx="44"
                cy="22"
                rx="40"
                ry="18"
                fill="none"
                stroke="#4a8fd4"
                strokeWidth="2.2"
                strokeLinecap="round"
                transform="rotate(-4 44 22)"
              />
            </svg>
            <span className="relative text-[15px] font-semibold text-[#2b6cb0]">
              {years}
            </span>
          </div>
        </div>

        <ul className="mt-8 space-y-3.5">
          {experience.map((item) => (
            <li
              key={item.company}
              className="flex items-center justify-between gap-4 text-[14px] leading-none"
            >
              <span className="flex items-center gap-2.5 font-medium text-[#2a2a2a]">
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full bg-[#4a8fd4]"
                />
                {item.company}
              </span>
              <span className="shrink-0 text-[13px] text-[#6b7280]">
                {item.period}
              </span>
            </li>
          ))}
        </ul>

        <div
          className="absolute bottom-[108px] left-6 w-[168px] px-3.5 py-3"
          style={{
            background: "linear-gradient(160deg, #f8f0d8 0%, #efe4c4 100%)",
            clipPath:
              "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 12%, 4% 8%, 6% 4%, 8% 0%)",
            boxShadow: "2px 3px 10px rgba(32, 44, 61, 0.12)",
          }}
        >
          <div
            aria-hidden
            className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #f5d77a 0%, #c9a227 55%, #9a7b1a 100%)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
            }}
          />
          <p className="text-[11px] leading-[1.55] text-[#4a4438]">
            {contact.email}
            <br />
            {contact.phone}
            <br />
            {contact.locations}
          </p>
        </div>

        <div
          className="absolute bottom-6 right-6 w-[210px] rounded-xl bg-white p-4"
          style={{ boxShadow: "0 8px 24px rgba(32, 44, 61, 0.1)" }}
        >
          <div aria-hidden className="mb-3 flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <p className="text-[13px] font-semibold text-[#1a1a1a]">
            {todayEntry.title}
          </p>
          <p className="mt-1.5 text-[11px] leading-[1.55] text-[#5c6370]">
            {todayEntry.body}
          </p>
        </div>

        <p
          className="absolute bottom-2 right-8 font-yellowtail text-[22px] leading-none text-[#3b7ec8]"
          style={{ transform: "rotate(-3deg)" }}
        >
          {handwritten}
          <span aria-hidden className="ml-1 inline-block text-[18px]">
            ↗
          </span>
        </p>
      </div>
    </motion.div>
  );
}
