import type { ExperimentCard } from "@/types/experiments";

export const experimentsContent = {
  title: "Gen AI experiments",
  subtitle: "Late-night explorations with AI",
} as const;

export const experimentsAssets = {
  basePattern: {
    src: "/GenAIExperiments/base_pattern.png",
    width: 2528,
    height: 1252,
    alt: "",
  },
} as const;

/** Display width for each carousel card (Figma artifact frame @1x). */
export const EXPERIMENT_CARD_WIDTH = 402;

/** Gap between carousel cards. */
export const EXPERIMENT_CARD_GAP = 32;

/** Tighter gap on mobile carousel. */
export const EXPERIMENT_CARD_GAP_MOBILE = 16;

/** Visible slice of the next card on mobile — signals horizontal scroll. */
export const EXPERIMENT_CAROUSEL_PEEK_MOBILE = 32;

/**
 * Mobile card width: one full card + gap + peek to the grid's right edge.
 * 48px section padding + 24px grid left inset + 16px gap + 32px peek.
 */
export const EXPERIMENT_CARD_WIDTH_MOBILE =
  "min(402px, calc(100vw - 120px))";

/** Right padding when the last card is fully scrolled into view. */
export const EXPERIMENT_CAROUSEL_END_PADDING = 52;

export const experimentCards: ExperimentCard[] = [
  {
    id: "claude-figma-mcp",
    label: "Claude design + Figma MCP",
    headline:
      "Translated a concept into a working landing page using Claude in 5 hours.",
    href: "/experiments/claude-figma-mcp",
    image: {
      src: "/GenAIExperiments/artifact_1.png",
      width: 804,
      height: 556,
      alt: "Claude design and Figma MCP experiment screenshot",
    },
  },
  {
    id: "cursor-github",
    label: "Cursor + Github",
    headline:
      "Built and shipped a pixel-perfect portfolio using Cursor AI agents.",
    href: "/experiments/cursor-github",
    image: {
      src: "/GenAIExperiments/artifact_2.png",
      width: 804,
      height: 556,
      alt: "Cursor and Github experiment screenshot",
    },
  },
  {
    id: "claude-gpt",
    label: "Claude + GPT",
    headline:
      "Eliminated manual color picking by automating HEX code extraction.",
    href: "/experiments/claude-gpt",
    image: {
      src: "/GenAIExperiments/artifact_3.png",
      width: 804,
      height: 556,
      alt: "Claude and GPT experiment screenshot",
    },
  },
];
