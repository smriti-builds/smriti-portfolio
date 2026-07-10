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
  const isMobile = useMediaQuery("(max-width: 767px)");

  const { scrollYProgress: desktopScroll } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "start 15%"],
  });

  const { scrollYProgress: mobileScroll } = useScroll({
    target: sectionRef,
    offset: ["start 92%", "end 48%"],
  });

  const desktopCard1Y = useTransform(desktopScroll, [0, 0.45], [80, 0]);
  const desktopCard1Opacity = useTransform(desktopScroll, [0, 0.4], [0, 1]);
  const desktopCard2Y = useTransform(desktopScroll, [0.3, 0.75], [80, 0]);
  const desktopCard2Opacity = useTransform(desktopScroll, [0.3, 0.7], [0, 1]);

  const mobileCard1Y = useTransform(mobileScroll, [0, 0.34], [48, 0]);
  const mobileCard1Opacity = useTransform(mobileScroll, [0, 0.3], [0, 1]);
  const mobileCard2Y = useTransform(mobileScroll, [0.22, 0.58], [48, 0]);
  const mobileCard2Opacity = useTransform(mobileScroll, [0.22, 0.54], [0, 1]);
  const mobileCard3Y = useTransform(mobileScroll, [0.5, 0.8], [48, 0]);
  const mobileCard3Opacity = useTransform(mobileScroll, [0.5, 0.76], [0, 1]);
  const mobileCard4Y = useTransform(mobileScroll, [0.68, 0.94], [48, 0]);
  const mobileCard4Opacity = useTransform(mobileScroll, [0.68, 0.9], [0, 1]);

  const card1Y = isMobile ? mobileCard1Y : desktopCard1Y;
  const card1Opacity = isMobile ? mobileCard1Opacity : desktopCard1Opacity;
  const card2Y = isMobile ? mobileCard2Y : desktopCard2Y;
  const card2Opacity = isMobile ? mobileCard2Opacity : desktopCard2Opacity;
  const card3Y = mobileCard3Y;
  const card3Opacity = mobileCard3Opacity;
  const card4Y = mobileCard4Y;
  const card4Opacity = mobileCard4Opacity;

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
              <p className="type-work-eyebrow font-instrument-serif uppercase text-text-secondary">
                {eyebrow}
              </p>
            </motion.div>

            <motion.h2
              className="type-work-headline w-full max-w-[469px] font-instrument-sans font-bold text-text-primary"
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
            {/* Row 1 — scroll-driven reveal */}
            <div className="flex w-full flex-col gap-[82px] md:flex-row md:items-start md:gap-[33px]">
              {row1.map((project, columnIndex) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={columnIndex}
                  className="md:flex-1 md:min-w-0"
                  motionStyle={{
                    y: columnIndex === 0 ? card1Y : card2Y,
                    opacity: columnIndex === 0 ? card1Opacity : card2Opacity,
                  }}
                />
              ))}
            </div>

            {/* Row 2 — scroll-driven on mobile, whileInView on desktop */}
            <div className="flex w-full flex-col gap-[82px] md:flex-row md:items-start md:gap-[33px]">
              {row2.map((project, columnIndex) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={2 + columnIndex}
                  className="md:flex-1 md:min-w-0"
                  motionStyle={
                    isMobile
                      ? {
                          y: columnIndex === 0 ? card3Y : card4Y,
                          opacity: columnIndex === 0 ? card3Opacity : card4Opacity,
                        }
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
