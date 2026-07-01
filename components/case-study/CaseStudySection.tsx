"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudySection as CaseStudySectionData } from "@/types/case-study";
import CaseStudyCalloutCard from "@/components/case-study/CaseStudyCalloutCard";
import CaseStudyTimeline from "@/components/case-study/CaseStudyTimeline";

const SECTION_TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export default function CaseStudySection({
  section,
  index,
}: {
  section: CaseStudySectionData;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="scroll-mt-24"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...SECTION_TRANSITION, delay: index * 0.04 }}
    >
      <p className="font-instrument-sans text-xs font-medium uppercase tracking-[1.5px] text-[#525d6d]">
        {section.eyebrow}
      </p>
      {section.title ? (
        <h2
          id={`${section.id}-title`}
          className="mt-3 w-full font-instrument-sans text-2xl font-bold leading-snug text-text-primary md:text-3xl"
        >
          {section.title}
        </h2>
      ) : null}

      <div className="mt-8 flex w-full flex-col gap-4">
        {section.paragraphs?.map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            className="font-instrument-sans text-[16px] leading-[24px] text-text-secondary"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {section.bullets?.length ? (
        <ul className="mt-8 flex w-full flex-col gap-3">
          {section.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 font-instrument-sans text-[16px] leading-[24px] text-text-secondary"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-text-primary" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {section.timeline?.length ? (
        <div className="mt-6 w-full">
          <CaseStudyTimeline items={section.timeline} />
        </div>
      ) : null}

      {section.callouts?.length ? (
        <div
          className={`mt-6 grid w-full gap-4 ${
            section.callouts.length === 3
              ? "md:grid-cols-2 md:grid-rows-2"
              : "md:grid-cols-2"
          }`}
        >
          {section.callouts.map((callout, calloutIndex) => (
            <CaseStudyCalloutCard
              key={callout.title}
              callout={callout}
              layout={
                section.callouts!.length === 3 && calloutIndex === 0
                  ? "featured"
                  : "default"
              }
            />
          ))}
        </div>
      ) : null}
    </motion.section>
  );
}
