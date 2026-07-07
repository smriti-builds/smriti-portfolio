"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudySummaryCard } from "@/types/case-study";
import type { IconType } from "react-icons";
import {
  MdOutlineAutoAwesome,
  MdOutlineEditNote,
  MdOutlineSentimentDissatisfied,
} from "react-icons/md";
import {
  CASE_STUDY_ICON_CLASS,
  CASE_STUDY_ICON_SIZE,
} from "@/components/case-study/case-study-icons";

const CARD_STYLES: Record<
  CaseStudySummaryCard["type"],
  { Icon: IconType }
> = {
  challenge: { Icon: MdOutlineSentimentDissatisfied },
  breakthrough: { Icon: MdOutlineEditNote },
  outcome: { Icon: MdOutlineAutoAwesome },
};

const CARD_TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

function renderBodyWithEmphasis(body: string) {
  const parts = body.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

type CaseStudySummaryCardsProps = {
  cards: CaseStudySummaryCard[];
};

export default function CaseStudySummaryCards({
  cards,
}: CaseStudySummaryCardsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
      {cards.map((card, index) => {
        const { Icon } = CARD_STYLES[card.type];

        return (
          <motion.article
            key={card.title}
            className="flex h-full flex-col rounded-2xl border border-[#F3F4F5] bg-[#FAFAFA] p-6 md:rounded-[24px] md:p-8"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...CARD_TRANSITION, delay: index * 0.06 }}
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#ececff]">
              <Icon
                size={CASE_STUDY_ICON_SIZE}
                aria-hidden
                className={CASE_STUDY_ICON_CLASS}
              />
            </div>

            <h3 className="mt-5 font-instrument-serif text-[32px] font-normal leading-10 text-text-primary md:mt-6">
              {card.title}
            </h3>

            <p className="mt-4 font-instrument-sans text-[14px] font-normal leading-[22px] text-text-secondary md:mt-5">
              {renderBodyWithEmphasis(card.body)}
            </p>
          </motion.article>
        );
      })}
    </div>
  );
}
