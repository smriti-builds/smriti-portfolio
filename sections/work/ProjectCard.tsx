"use client";

import { motion } from "framer-motion";
import type { WorkProject } from "@/types/work";
import WorkProjectPreviewView from "@/sections/work/WorkProjectPreview";

const CARD_TRANSITION = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

type ProjectCardProps = {
  project: WorkProject;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      className="flex flex-col gap-12"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...CARD_TRANSITION, delay: index * 0.08 }}
    >
      <WorkProjectPreviewView variant={project.preview} />

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-[18px]">
          <h3 className="font-instrument-sans text-[30px] font-semibold leading-[1.2] text-text-primary">
            {project.title}
          </h3>
          <p className="max-w-[616px] font-instrument-sans text-xl leading-9 text-text-secondary">
            {project.description.map((part, partIndex) =>
              part.emphasis ? (
                <span
                  key={partIndex}
                  className="font-semibold text-text-primary"
                >
                  {part.text}
                </span>
              ) : (
                <span key={partIndex}>{part.text}</span>
              ),
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-[#f0f4fa] px-4 py-2 font-instrument-sans text-base font-semibold uppercase tracking-[0.16px] text-[#525d6d]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
