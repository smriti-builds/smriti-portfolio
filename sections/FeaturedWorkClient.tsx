"use client";

import { motion } from "framer-motion";
import { workContent } from "@/lib/content/work";
import ProjectCard from "@/sections/work/ProjectCard";

const HEADER_TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export default function FeaturedWorkClient() {
  const { eyebrow, headline, projects } = workContent;

  return (
    <section
      id="featured-work"
      aria-label="Featured work"
      className="mx-auto w-full max-w-[1440px] snap-start bg-white"
    >
      <div className="flex w-full items-center px-6 py-24 md:px-[88px] md:py-[100px]">
        <div className="flex w-full max-w-[1266px] flex-col gap-[82px]">
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
              className="w-full max-w-[469px] font-instrument-sans text-[48px] font-bold leading-[64px] text-text-primary"
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

          <div className="grid grid-cols-1 gap-x-[33px] gap-y-[82px] md:grid-cols-2 md:items-start">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
