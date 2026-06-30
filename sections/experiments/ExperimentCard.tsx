"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ExperimentCard as ExperimentCardData } from "@/types/experiments";

const CARD_TRANSITION = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

type ExperimentCardProps = {
  card: ExperimentCardData;
  index: number;
};

/**
 * Renders a single experiment artifact card.
 * When `card.href` is set, swap the outer wrapper for Next.js `Link`.
 */
export default function ExperimentCard({ card, index }: ExperimentCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const { image, label, headline } = card;

  return (
    <motion.article
      className="flex w-[min(402px,85vw)] shrink-0 flex-col rounded-[20px] bg-white p-6 shadow-[0_10px_20px_rgba(0,0,0,0.05)] md:w-[402px]"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...CARD_TRANSITION, delay: index * 0.1 }}
    >
      <div className="relative aspect-[402/278] w-full overflow-hidden rounded-2xl bg-neutral-100">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 85vw, 402px"
          priority={index === 0}
        />
      </div>

      <div className="flex flex-col gap-3 pt-6">
        <h3 className="font-instrument-sans text-lg font-semibold leading-7 text-text-primary">
          {label}
        </h3>
        <p className="font-instrument-sans text-base font-normal leading-7 text-text-primary">
          {headline}
        </p>
      </div>
    </motion.article>
  );
}
