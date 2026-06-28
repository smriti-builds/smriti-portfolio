"use client";

import { motion } from "framer-motion";
import { workContent, workProjectRows } from "@/lib/content/work";
import ProjectCard from "@/sections/work/ProjectCard";

const HEADER_TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

function WorkCreamPanel() {
  return (
    <div
      aria-hidden
      className="aspect-[1440/720] w-full shrink-0 border-[32px] border-solid border-white bg-bg-cream"
    />
  );
}

export default function FeaturedWorkClient() {
  const { eyebrow, headline, projects } = workContent;
  const projectById = new Map(projects.map((project) => [project.id, project]));

  return (
    <section
      id="featured-work"
      aria-label="Featured work"
      className="mx-auto w-full max-w-[1440px] snap-start"
    >
      <WorkCreamPanel />

      <div className="flex w-full flex-col gap-[3px]">
        <WorkCreamPanel />
        <WorkCreamPanel />

        <div className="flex w-full items-center bg-white px-6 py-24 md:px-[88px] md:py-[100px]">
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

            {workProjectRows.map((row, rowIndex) => (
              <div
                key={row.join("-")}
                className="flex w-full flex-col gap-[33px] md:flex-row md:items-center"
              >
                {row.map((projectId, columnIndex) => {
                  const project = projectById.get(projectId);
                  if (!project) return null;

                  const index = rowIndex * 2 + columnIndex;
                  return (
                    <div
                      key={project.id}
                      className="min-w-0 flex-1 basis-0"
                    >
                      <ProjectCard
                        project={project}
                        index={index}
                        priorityPreview={index === 0}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
