"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  EXPERIMENT_CARD_GAP,
  EXPERIMENT_CARD_WIDTH,
  EXPERIMENTS_GRID_CELL_SIZE,
  experimentCards,
  experimentsContent,
} from "@/lib/content/experiments";
import ExperimentCard from "@/sections/experiments/ExperimentCard";

const HEADER_TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

const GRID_LINE_COLOR = "rgba(200, 201, 196, 0.35)";

function ExperimentsGridContainer({ children }: { children: ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-[24px] px-6 py-10 md:px-10 md:py-12"
      style={{
        backgroundColor: "var(--bg-cream)",
        backgroundImage: `
          linear-gradient(to right, ${GRID_LINE_COLOR} 1px, transparent 1px),
          linear-gradient(to bottom, ${GRID_LINE_COLOR} 1px, transparent 1px)
        `,
        backgroundSize: `${EXPERIMENTS_GRID_CELL_SIZE}px ${EXPERIMENTS_GRID_CELL_SIZE}px`,
      }}
    >
      {children}
    </div>
  );
}

export default function ExperimentsClient() {
  const { title, subtitle } = experimentsContent;
  const prefersReducedMotion = useReducedMotion();

  const trackPaddingRight =
    "calc(100% - " + (EXPERIMENT_CARD_WIDTH + EXPERIMENT_CARD_GAP) + "px)";

  return (
    <section
      id="experiments"
      aria-label="Gen AI experiments"
      className="w-full bg-bg-cream"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-[88px] md:py-[100px]">
        <header className="mb-16 max-w-2xl">
          <motion.h2
            className="font-inter text-4xl font-semibold text-text-primary md:text-5xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={HEADER_TRANSITION}
          >
            {title}
          </motion.h2>
          <motion.p
            className="mt-4 font-instrument-serif text-2xl italic text-text-secondary"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...HEADER_TRANSITION, delay: 0.06 }}
          >
            {subtitle}
          </motion.p>
        </header>

        <ExperimentsGridContainer>
          <div
            role="list"
            aria-label="Gen AI experiment artifacts"
            className="experiments-carousel flex gap-8 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              scrollSnapType: "x mandatory",
              paddingRight: trackPaddingRight,
            }}
            tabIndex={0}
          >
            {experimentCards.map((card, index) => (
              <div key={card.id} role="listitem">
                <ExperimentCard card={card} index={index} />
              </div>
            ))}
          </div>
        </ExperimentsGridContainer>
      </div>
    </section>
  );
}
