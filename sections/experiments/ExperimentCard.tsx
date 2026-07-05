"use client";

import Link from "next/link";
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

function CardContent({
  card,
  priority,
}: {
  card: ExperimentCardData;
  priority: boolean;
}) {
  const { image, label, headline } = card;

  return (
    <>
      <div className="relative aspect-[402/278] w-full overflow-hidden rounded-2xl bg-neutral-100">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) calc(100vw - 120px), 402px"
          priority={priority}
          draggable={false}
        />
        {card.href ? (
          <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 font-instrument-sans text-xs font-semibold text-text-primary shadow-sm">
            Case study
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 pt-6">
        <h3 className="type-card-title-md font-instrument-sans font-semibold text-text-primary">
          {label}
        </h3>
        <p className="type-card-body font-instrument-sans font-normal text-text-primary">
          {headline}
        </p>
        {card.href ? (
          <span className="inline-flex items-center gap-1 font-instrument-sans text-sm font-semibold text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
            Read more
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5"
            >
              →
            </span>
          </span>
        ) : null}
      </div>
    </>
  );
}

export default function ExperimentCard({ card, index }: ExperimentCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = {
    className:
      "group flex w-[min(402px,calc(100vw-120px))] shrink-0 flex-col rounded-[20px] bg-white p-6 shadow-[0_10px_20px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] md:w-[402px]",
    initial: prefersReducedMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { ...CARD_TRANSITION, delay: index * 0.1 },
  } as const;

  if (card.href) {
    return (
      <motion.article {...motionProps}>
        <Link
          href={card.href}
          className="flex flex-col outline-offset-4 focus-visible:outline-2 focus-visible:outline-text-primary"
          aria-label={`Read more: ${card.label}`}
          draggable={false}
        >
          <CardContent card={card} priority={index === 0} />
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article {...motionProps}>
      <CardContent card={card} priority={index === 0} />
    </motion.article>
  );
}
