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
  priorityPreview?: boolean;
};

export default function ProjectCard({
  project,
  index,
  priorityPreview = false,
}: ProjectCardProps) {
  const tagWeightClass =
    project.tagWeight === "semibold" ? "font-semibold" : "font-medium";

  return (
    <motion.article
      className="flex w-full max-w-[616.5px] flex-col gap-[48px]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...CARD_TRANSITION, delay: index * 0.08 }}
    >
      <WorkProjectPreviewView
        variant={project.preview}
        priority={priorityPreview}
        rounded={project.previewRounded ?? true}
      />

      <div className="flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[18px]">
          <h3 className="font-instrument-sans text-[30px] font-semibold leading-[1.2] text-text-primary">
            {project.title}
          </h3>
          <p
            className="font-instrument-sans text-[20px] leading-9 text-text-secondary"
            style={
              project.descriptionMaxWidth
                ? { maxWidth: project.descriptionMaxWidth }
                : undefined
            }
          >
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
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tag}
              className={`rounded bg-[#f0f4fa] px-4 py-2 font-instrument-sans text-base uppercase text-[#525d6d] ${tagWeightClass}`}
              style={{
                letterSpacing:
                  project.tagTracking?.[tagIndex] ?? "0.16px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
