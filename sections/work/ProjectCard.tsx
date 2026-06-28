"use client";

import { motion, type MotionValue } from "framer-motion";
import type { WorkProject } from "@/types/work";
import WorkProjectPreviewView from "@/sections/work/WorkProjectPreview";

const CARD_TRANSITION = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export type CardMotionStyle = {
  y: MotionValue<number>;
  opacity: MotionValue<number>;
};

type ProjectCardProps = {
  project: WorkProject;
  index: number;
  className?: string;
  /** When provided, scroll-driven MotionValues take over — whileInView is disabled. */
  motionStyle?: CardMotionStyle;
};

export default function ProjectCard({
  project,
  index,
  className = "",
  motionStyle,
}: ProjectCardProps) {
  const isScrollDriven = !!motionStyle;

  return (
    <motion.article
      className={`flex w-full min-w-0 flex-col ${className}`}
      style={motionStyle}
      {...(!isScrollDriven && {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { ...CARD_TRANSITION, delay: index * 0.08 },
      })}
    >
      <WorkProjectPreviewView
        variant={project.preview}
        backgroundColor={project.backgroundColor}
        priority={index < 2}
        hoverOverlayLabel={project.hoverOverlayLabel}
      />

      <div className="mt-[48px] flex flex-col">
        <div className="flex flex-col">
          <h3 className="font-instrument-sans text-[28px] font-semibold leading-[1.2] text-text-primary">
            {project.title}
          </h3>
          <p
            className="mt-[18px] font-instrument-sans text-[18px] leading-[28px] text-text-secondary"
            style={
              project.descriptionMaxWidth
                ? { maxWidth: project.descriptionMaxWidth }
                : undefined
            }
          >
            {project.description.map((part, partIndex) =>
              part.emphasis ? (
                <span key={partIndex} className="font-semibold text-text-primary">
                  {part.text}
                </span>
              ) : (
                <span key={partIndex}>{part.text}</span>
              ),
            )}
          </p>
        </div>

        <div className="mt-[32px] flex flex-wrap gap-4">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tag}
              className="shrink-0 rounded bg-[#f0f4fa] px-4 py-2 font-instrument-sans text-base font-semibold uppercase text-[#525d6d]"
              style={{
                letterSpacing: project.tagTracking?.[tagIndex] ?? "0.16px",
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
