"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudyHypothesis, CaseStudySection as CaseStudySectionData } from "@/types/case-study";
import CaseStudyCalloutCard from "@/components/case-study/CaseStudyCalloutCard";
import CaseStudyComparisonTable from "@/components/case-study/CaseStudyComparisonTable";
import CaseStudyFlowChanges from "@/components/case-study/CaseStudyFlowChanges";
import CaseStudyFunnelStrip from "@/components/case-study/CaseStudyFunnelStrip";
import CaseStudyHypothesisCard from "@/components/case-study/CaseStudyHypothesisCard";
import CaseStudyMediaBlock from "@/components/case-study/CaseStudyMediaBlock";
import CaseStudyMediaGrid from "@/components/case-study/CaseStudyMediaGrid";
import CaseStudyResearchGallery from "@/components/case-study/CaseStudyResearchGallery";
import CaseStudyResearchInsights from "@/components/case-study/CaseStudyResearchInsightCard";
import CaseStudyResearchStats from "@/components/case-study/CaseStudyResearchStats";
import CaseStudyTimeline from "@/components/case-study/CaseStudyTimeline";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

const SECTION_TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

function formatParagraph(text: string) {
  return text.split("\n").map((line, index) => (
    <Fragment key={index}>
      {index > 0 ? <br /> : null}
      {line}
    </Fragment>
  ));
}

function renderInlineStrongText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

function renderParagraphs(paragraphs: string[]) {
  return paragraphs.map((paragraph) => {
    const trimmed = paragraph.trim();
    const isHighlight = trimmed.startsWith(">>");
    const isEmphasis = trimmed.startsWith("!!");
    const isSubheader = trimmed.startsWith("##");
    const content = isEmphasis
      ? trimmed.slice(2).trim()
      : isSubheader
        ? trimmed.slice(2).trim()
        : trimmed;

    if (isHighlight) {
      return (
        <blockquote
          key={trimmed.slice(0, 48)}
          className="border-l-2 border-text-primary py-1 pl-5 md:pl-6"
        >
          <p className="font-instrument-sans text-[14px] font-medium leading-[22px] text-text-primary md:text-[16px] md:leading-[24px]">
            {formatParagraph(trimmed.slice(2).trim())}
          </p>
        </blockquote>
      );
    }

    if (isSubheader) {
      return (
        <h3
          key={content.slice(0, 48)}
          className="mt-4 w-full font-instrument-sans text-[14px] font-semibold leading-[22px] text-text-primary md:mt-6 md:text-[16px] md:leading-[24px]"
        >
          {content}
        </h3>
      );
    }

    if (isEmphasis) {
      return (
        <p
          key={trimmed.slice(0, 48)}
          className="font-instrument-sans text-[14px] font-semibold leading-[22px] text-text-primary md:text-[16px] md:leading-[24px]"
        >
          {formatParagraph(content)}
        </p>
      );
    }

    return (
      <p
        key={trimmed.slice(0, 48)}
        className="font-instrument-sans text-[14px] leading-[22px] md:text-[16px] md:leading-[24px] text-text-secondary"
      >
        {renderInlineStrongText(trimmed)}
      </p>
    );
  });
}

function getSectionHypotheses(
  section: CaseStudySectionData,
): CaseStudyHypothesis[] {
  if (section.hypotheses?.length) return section.hypotheses;
  if (section.hypothesis) return [section.hypothesis];
  return [];
}

function renderHypotheses(hypotheses: CaseStudyHypothesis[]) {
  if (hypotheses.length === 1) {
    return (
      <CaseStudyHypothesisCard
        title={hypotheses[0].title}
        body={hypotheses[0].body}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-stretch md:gap-5">
      {hypotheses.map((hypothesis) => (
        <CaseStudyHypothesisCard
          key={hypothesis.title}
          title={hypothesis.title}
          body={hypothesis.body}
        />
      ))}
    </div>
  );
}

function renderCallouts(
  callouts: NonNullable<CaseStudySectionData["callouts"]>,
  layout: CaseStudySectionData["calloutLayout"] = "default",
) {
  const useThreeColumn = layout === "three-column";

  return (
    <div
      className={`mt-6 grid w-full gap-4 md:mt-8 ${
        useThreeColumn
          ? "md:grid-cols-3"
          : callouts.length === 3
            ? "lg:grid-cols-2 lg:grid-rows-2"
            : callouts.length > 1
              ? "md:grid-cols-2"
              : "grid-cols-1"
      }`}
    >
      {callouts.map((callout, calloutIndex) => (
        <CaseStudyCalloutCard
          key={callout.title}
          callout={callout}
          layout={
            !useThreeColumn && callouts.length === 3 && calloutIndex === 0
              ? "featured"
              : "default"
          }
        />
      ))}
    </div>
  );
}

export default function CaseStudySection({
  section,
  index,
}: {
  section: CaseStudySectionData;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isImmersive = section.variant === "immersive";
  const sectionHypotheses = getSectionHypotheses(section);
  const deferContentAfterFlow = Boolean(section.flowChanges?.length);
  const hasLeadingHeader = Boolean(
    section.eyebrow ||
      section.title ||
      section.researchStats?.length ||
      section.insightsTitle,
  );

  const content = (
    <>
      {section.eyebrow ? (
        <p className="font-instrument-sans text-xs font-medium uppercase tracking-[1.5px] text-[#525d6d]">
          {section.eyebrow}
        </p>
      ) : null}
      {section.title ? (
        <h2
          id={`${section.id}-title`}
          className={`type-case-study-section-title mt-3 w-full font-instrument-sans text-text-primary ${
            section.id === "research" ? "font-semibold" : "font-bold"
          }`}
        >
          {section.title}
        </h2>
      ) : null}

      {section.researchStats?.length ? (
        <CaseStudyResearchStats stats={section.researchStats} />
      ) : null}

      {section.insightsTitle ? (
        <h3 className="type-case-study-section-title mt-10 w-full font-instrument-sans font-bold text-text-primary md:mt-12">
          {section.insightsTitle}
        </h3>
      ) : null}

      {section.paragraphs?.length ? (
        <div
          className={`flex w-full flex-col gap-4 ${
            hasLeadingHeader ? "mt-6 md:mt-8" : ""
          }`}
        >
          {renderParagraphs(section.paragraphs)}
        </div>
      ) : null}

      {sectionHypotheses.length > 0 &&
      section.hypothesisPlacement !== "end" ? (
        <div className="mt-6 w-full md:mt-8">
          {renderHypotheses(sectionHypotheses)}
        </div>
      ) : null}

      {section.calloutPlacement === "afterParagraphs" && section.callouts?.length
        ? renderCallouts(section.callouts, section.calloutLayout)
        : null}

      {!deferContentAfterFlow && section.continuedParagraphs?.length ? (
        <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
          {renderParagraphs(section.continuedParagraphs)}
        </div>
      ) : null}

      {section.bullets?.length ? (
        <ul className="mt-6 flex w-full flex-col gap-3 md:mt-8">
          {section.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 font-instrument-sans text-[14px] leading-[22px] md:text-[16px] md:leading-[24px] text-text-secondary"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-text-primary" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {section.comparisonTable ? (
        <CaseStudyComparisonTable table={section.comparisonTable} />
      ) : null}

      {section.researchGallery ? (
        <CaseStudyResearchGallery gallery={section.researchGallery} />
      ) : section.researchInsights?.length ? (
        <CaseStudyResearchInsights insights={section.researchInsights} />
      ) : null}

      {section.closingParagraphs?.length ? (
        <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
          {section.closingParagraphs.map((paragraph) => {
            const trimmed = paragraph.trim();
            const isHighlight = trimmed.startsWith(">>");
            const isEmphasis = trimmed.startsWith("!!");
            const content = isEmphasis ? trimmed.slice(2).trim() : trimmed;

            if (isHighlight) {
              return (
                <blockquote
                  key={trimmed.slice(0, 48)}
                  className="border-l-2 border-text-primary py-1 pl-5 md:pl-6"
                >
                  <p className="font-instrument-sans text-[14px] font-medium leading-[22px] text-text-primary md:text-[16px] md:leading-[24px]">
                    {formatParagraph(trimmed.slice(2).trim())}
                  </p>
                </blockquote>
              );
            }

            if (isEmphasis) {
              return (
                <p
                  key={trimmed.slice(0, 48)}
                  className="font-instrument-sans text-[14px] font-semibold leading-[22px] text-text-primary md:text-[16px] md:leading-[24px]"
                >
                  {formatParagraph(content)}
                </p>
              );
            }

            return (
              <p
                key={trimmed.slice(0, 48)}
                className="font-instrument-sans text-[14px] leading-[22px] md:text-[16px] md:leading-[24px] text-text-secondary"
              >
                {formatParagraph(trimmed)}
              </p>
            );
          })}
        </div>
      ) : null}

      {sectionHypotheses.length > 0 && section.hypothesisPlacement === "end" ? (
        <div className="mt-6 w-full md:mt-8">
          {renderHypotheses(sectionHypotheses)}
        </div>
      ) : null}

      {section.beforeAfter ? (
        <div className="mt-6 w-full md:mt-8">
          <BeforeAfterSlider
            beforeImage={section.beforeAfter.beforeImage}
            afterImage={section.beforeAfter.afterImage}
            beforeLabel={section.beforeAfter.beforeLabel}
            afterLabel={section.beforeAfter.afterLabel}
          />
        </div>
      ) : null}

      {!deferContentAfterFlow && section.media?.length ? (
        <div
          className={`flex w-full flex-col ${
            section.beforeAfter
              ? "mt-10 gap-10 md:mt-14 md:gap-14"
              : "mt-6 gap-6 md:mt-8 md:gap-8"
          }`}
        >
          {section.media.map((item) => (
            <CaseStudyMediaBlock key={item.src} media={item} />
          ))}
        </div>
      ) : null}

      {section.mediaGrid?.items.length ? (
        <div className="mt-6 w-full md:mt-8">
          <CaseStudyMediaGrid grid={section.mediaGrid} />
        </div>
      ) : null}

      {section.timeline?.length ? (
        <div className="mt-6 w-full">
          <CaseStudyTimeline items={section.timeline} />
        </div>
      ) : null}

      {section.calloutPlacement !== "afterParagraphs" && section.callouts?.length
        ? renderCallouts(section.callouts, section.calloutLayout)
        : null}

      {section.additionalCallouts?.length
        ? renderCallouts(section.additionalCallouts)
        : null}

      {section.postCalloutParagraphs?.length ? (
        <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
          {section.postCalloutParagraphs.map((paragraph) => {
            const trimmed = paragraph.trim();
            const isEmphasis = trimmed.startsWith("!!");
            const isLabel = trimmed.startsWith("**") && trimmed.endsWith("**");
            const content = isEmphasis
              ? trimmed.slice(2).trim()
              : isLabel
                ? trimmed.slice(2, -2)
                : trimmed;

            return (
              <p
                key={trimmed.slice(0, 48)}
                className={
                  isEmphasis
                    ? "type-case-study-emphasis font-instrument-sans font-semibold text-text-primary"
                    : isLabel
                      ? "font-instrument-sans text-[14px] font-semibold leading-[22px] text-text-primary md:text-[16px] md:leading-[24px]"
                      : "font-instrument-sans text-[14px] leading-[22px] text-text-secondary md:text-[16px] md:leading-[24px]"
                }
              >
                {renderInlineStrongText(content)}
              </p>
            );
          })}
        </div>
      ) : null}

      {section.funnelMetrics?.length ? (
        <CaseStudyFunnelStrip metrics={section.funnelMetrics} />
      ) : null}

      {section.flowChanges?.length ? (
        <CaseStudyFlowChanges rows={section.flowChanges} />
      ) : null}

      {deferContentAfterFlow && section.continuedParagraphs?.length ? (
        <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
          {renderParagraphs(section.continuedParagraphs)}
        </div>
      ) : null}

      {deferContentAfterFlow && section.media?.length ? (
        <div className="mt-4 flex w-full flex-col gap-6 md:mt-5 md:gap-8">
          {section.media.map((item) => (
            <CaseStudyMediaBlock key={item.src} media={item} />
          ))}
        </div>
      ) : null}

      {section.funnelFollowUp?.length ? (
        <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
          {section.funnelFollowUp.map((block, blockIndex) => {
            if (block.type === "spacer") {
              return <div key={`spacer-${blockIndex}`} className="h-2 md:h-3" />;
            }

            if (block.type === "bullets") {
              return (
                <ul
                  key={block.items.join("|").slice(0, 48)}
                  className="flex w-full flex-col gap-3"
                >
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 font-instrument-sans text-[14px] leading-[22px] text-text-secondary md:text-[16px] md:leading-[24px]"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            const trimmed = block.text.trim();
            const isEmphasis = trimmed.startsWith("!!");
            const content = isEmphasis ? trimmed.slice(2).trim() : trimmed;

            return (
              <p
                key={trimmed.slice(0, 48)}
                className={
                  isEmphasis
                    ? "font-instrument-sans text-[14px] font-semibold leading-[22px] text-text-primary md:text-[16px] md:leading-[24px]"
                    : "font-instrument-sans text-[14px] leading-[22px] text-text-secondary md:text-[16px] md:leading-[24px]"
                }
              >
                {renderInlineStrongText(content)}
              </p>
            );
          })}
        </div>
      ) : null}
    </>
  );

  return (
    <motion.section
      id={section.id}
      aria-labelledby={section.title ? `${section.id}-title` : undefined}
      className={
        isImmersive
          ? "scroll-mt-24 relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-gradient-to-b from-[#f4f0e5]/60 via-[#f4f0e5]/30 to-white px-5 py-12 md:px-12 md:py-16 lg:px-[120px] lg:py-20"
          : section.spacing === "compact"
            ? "scroll-mt-24 -mt-4 md:-mt-8 lg:-mt-10"
            : "scroll-mt-24"
      }
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...SECTION_TRANSITION, delay: index * 0.04 }}
    >
      {isImmersive ? (
        <div className="mx-auto w-full max-w-[1100px]">{content}</div>
      ) : (
        content
      )}
    </motion.section>
  );
}
