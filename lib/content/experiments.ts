import type { ExperimentCard } from "@/types/experiments";

export const experimentsContent = {
  title: "Gen AI experiments",
  subtitle: "Late-night explorations with AI",
} as const;

/** Display width for each carousel card (Figma artifact frame). */
export const EXPERIMENT_CARD_WIDTH = 402;

/** Gap between carousel cards. */
export const EXPERIMENT_CARD_GAP = 32;

/** Graph-paper cell size inside the experiments container. */
export const EXPERIMENTS_GRID_CELL_SIZE = 44;

export const experimentCards: ExperimentCard[] = [
  {
    id: "claude-figma-mcp",
    label: "Claude design + Figma MCP",
    headline:
      "Translated a concept into a working landing page using Claude in 5 hours.",
    image: {
      src: "/Experiments/claude-figma-mcp.png",
      width: 402,
      height: 278,
      alt: "Screenshot of a landing page built with Claude and Figma MCP",
    },
  },
  {
    id: "cursor-github",
    label: "Cursor + Github",
    headline: "Fixed front end UI issues directly in production code.",
    image: {
      src: "/Experiments/cursor-github.png",
      width: 402,
      height: 278,
      alt: "Screenshot of Cursor fixing production UI issues",
    },
  },
  {
    id: "claude-gpt",
    label: "Claude + GPT",
    headline:
      "Eliminated manual color picking by automating HEX code extraction.",
    image: {
      src: "/Experiments/claude-gpt.png",
      width: 402,
      height: 278,
      alt: "Screenshot of automated HEX code extraction workflow",
    },
  },
];
