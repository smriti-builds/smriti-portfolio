"use client";

import Link from "next/link";
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

function ProjectCardContent({
  project,
  index,
}: {
  project: WorkProject;
  index: number;
}) {
  const isLinked = Boolean(project.href);

  return (
    <>
      <WorkProjectPreviewView
        variant={project.preview}
        backgroundColor={project.backgroundColor}
        priority={index < 2}
        hoverOverlayLabel={project.hoverOverlayLabel}
        animateArrow={isLinked}
      />

      <div className="mt-[48px] flex flex-col">
        <div className="flex flex-col">
          <h3 className="type-work-card-title font-instrument-sans font-semibold text-text-primary">
            {project.title}
          </h3>
          <p
            className="type-work-card-body mt-[18px] font-instrument-sans text-text-secondary"
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
              className="type-work-card-tag shrink-0 rounded bg-[#f0f4fa] px-4 py-2 font-instrument-sans font-semibold uppercase text-[#525d6d]"
              style={{
                letterSpacing: project.tagTracking?.[tagIndex] ?? "0.16px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default function ProjectCard({
  project,
  index,
  className = "",
  motionStyle,
}: ProjectCardProps) {
  const isScrollDriven = !!motionStyle;
  const isExternalLink = Boolean(
    project.href?.startsWith("http://") || project.href?.startsWith("https://"),
  );

  return (
    <motion.article
      className={`flex w-full min-w-0 flex-col ${isScrollDriven ? "transform-gpu" : ""} ${className}`}
      style={motionStyle}
      {...(!isScrollDriven && {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { ...CARD_TRANSITION, delay: index * 0.08 },
      })}
    >
      {project.href ? (
        <Link
          href={project.href}
          {...(isExternalLink
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="group/card flex flex-col outline-offset-4 focus-visible:outline-2 focus-visible:outline-text-primary"
          aria-label={`Open case study: ${project.title}`}
          draggable={false}
        >
          <ProjectCardContent project={project} index={index} />
        </Link>
      ) : (
        <ProjectCardContent project={project} index={index} />
      )}
    </motion.article>
  );
}
