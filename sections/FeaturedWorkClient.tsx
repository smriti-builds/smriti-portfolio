"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { workContent, workProjectRows } from "@/lib/content/work";
import { useMediaQuery } from "@/lib/use-media-query";
import ProjectCard from "@/sections/work/ProjectCard";

const HEADER_TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export default function FeaturedWorkClient() {
  const { eyebrow, headline } = workContent;
  const [row1, row2] = workProjectRows;

  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  /**
   * Track scroll progress of the section as it enters the viewport.
   * 0 → section top is 85% down the screen (just scrolling into view)
   * 1 → section top reaches 15% from top (section is well in view)
   *
   * This gives ~70% of viewport height worth of scroll travel to
   * stagger both row-1 cards in before row-2 comes into frame.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "start 15%"],
  });

  // Card 1 (left): enters during 0 → 45% of section scroll progress
  const card1Y = useTransform(scrollYProgress, [0, 0.45], [80, 0]);
  const card1Opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  // Card 2 (right): enters during 30 → 75%, clearly after card 1 starts
  const card2Y = useTransform(scrollYProgress, [0.3, 0.75], [80, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="featured-work"
      aria-label="Featured work"
      className="surface-bleed-x w-full min-w-0 overflow-x-clip bg-white"
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center px-6 py-24 md:px-[88px] md:py-[100px]">
        <div className="mx-auto flex w-full max-w-[1266px] flex-col gap-[82px]">
          {/* Section header */}
          <div className="flex flex-col gap-4">
            <motion.div
              className="flex items-center rounded py-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={HEADER_TRANSITION}
            >
              <p className="font-instrument-serif text-[32px] uppercase tracking-[2px] text-text-secondary">
                {eyebrow}
              </p>
            </motion.div>

            <motion.h2
              className="w-full max-w-[469px] font-instrument-sans text-[44px] font-bold leading-[62px] text-text-primary"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...HEADER_TRANSITION, delay: 0.06 }}
            >
              {headline.primary}
              <span className="text-[rgba(98,108,129,0.5)]">
                {headline.secondary}
              </span>
            </motion.h2>
          </div>

          {/* Card grid */}
          <div className="flex w-full flex-col gap-[82px]">
            {/* Row 1 — scroll-driven on desktop, whileInView on mobile */}
            <div className="flex w-full flex-col gap-[82px] md:flex-row md:items-start md:gap-[33px]">
              {row1.map((project, columnIndex) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={columnIndex}
                  className="md:flex-1 md:min-w-0"
                  motionStyle={
                    isDesktop
                      ? {
                          y: columnIndex === 0 ? card1Y : card2Y,
                          opacity: columnIndex === 0 ? card1Opacity : card2Opacity,
                        }
                      : undefined
                  }
                />
              ))}
            </div>

            {/* Row 2 — whileInView always (naturally appears after row 1) */}
            <div className="flex w-full flex-col gap-[82px] md:flex-row md:items-start md:gap-[33px]">
              {row2.map((project, columnIndex) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={2 + columnIndex}
                  className="md:flex-1 md:min-w-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
