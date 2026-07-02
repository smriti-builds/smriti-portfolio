import type { CaseStudy } from "@/types/case-study";

export const claudeFigmaMcpCaseStudy: CaseStudy = {
  slug: "claude-figma-mcp",
  experimentId: "claude-figma-mcp",
  title: "Concept to landing page with Claude + Figma MCP",
  subtitle: "Translating a design concept into code in five hours",
  lede:
    "I tested whether Claude connected to Figma via MCP could turn a concept frame into a working landing page fast enough to be useful in early exploration — not perfect, but shippable as a starting point.",
  categories: ["AI & Emerging Tech", "Design tooling"],
  heroImage: {
    src: "/GenAIExperiments/artifact_1.png",
    width: 804,
    height: 556,
    alt: "Claude design and Figma MCP experiment screenshot",
  },
  meta: {
    duration: "5 hours",
    status: "Shipped",
    role: ["Product design", "Prompt engineering", "AI direction"],
    tools: ["Figma", "Claude", "Figma MCP"],
    impact: "Working landing page from concept in one session",
  },
  relatedSlugs: ["cursor-github", "claude-gpt"],
  sections: [
    {
      id: "problem",
      eyebrow: "The problem",
      title: "Early concepts die in translation",
      paragraphs: [
        "Moving from a Figma concept to something clickable often takes longer than the ideation itself. I wanted to compress that gap for early validation — before investing in full implementation.",
      ],
    },
    {
      id: "approach",
      eyebrow: "Approach",
      title: "Figma as live context for Claude",
      paragraphs: [
        "Using Figma MCP, Claude could read frame structure, spacing, and component hierarchy directly instead of inferring from screenshots. I directed it section by section: hero, feature grid, CTA — with explicit constraints on typography and color tokens.",
      ],
      callouts: [
        {
          type: "learning",
          title: "Where MCP helped",
          body: "Structured frame data reduced layout guesswork. Claude got closer on spacing and hierarchy than screenshot-only prompts.",
        },
        {
          type: "hiccup",
          title: "Where it still needed me",
          body: "Micro-alignment, responsive behavior, and interaction states still required human review. MCP accelerates the first 70%, not the last 30%.",
        },
      ],
    },
    {
      id: "outcome",
      eyebrow: "Outcome",
      title: "A usable starting point, not a finish line",
      paragraphs: [
        "In roughly five hours I had a working landing page close enough to explore with stakeholders. The experiment validated MCP for concept-to-code speed — and clarified that design direction stays human-owned.",
      ],
    },
  ],
};
