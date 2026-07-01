import type { CaseStudy } from "@/types/case-study";

export const claudeGptCaseStudy: CaseStudy = {
  slug: "claude-gpt",
  experimentId: "claude-gpt",
  title: "Automating design token extraction with Claude + GPT",
  subtitle: "Eliminating manual color picking from the workflow",
  lede:
    "I paired Claude and GPT to automate HEX extraction from Figma variables into a project-ready design token document — removing a repetitive step that slows down AI-assisted implementation.",
  categories: ["AI & Emerging Tech", "Design systems"],
  heroImage: {
    src: "/GenAIExperiments/artifact_3.png",
    width: 804,
    height: 556,
    alt: "Claude and GPT color extraction experiment",
  },
  meta: {
    duration: "1 session",
    status: "Shipped",
    role: ["Design systems", "Prompt engineering"],
    tools: ["Figma", "Claude", "GPT"],
    impact: "Structured color palette doc used across the portfolio build",
  },
  relatedSlugs: ["cursor-github", "claude-figma-mcp"],
  sections: [
    {
      id: "problem",
      eyebrow: "The problem",
      title: "Manual token extraction does not scale",
      paragraphs: [
        "When matching Figma exactly, every color must be named, hex-coded, and mapped to CSS variables. Doing that by hand for each project is error-prone and breaks flow when directing AI agents.",
      ],
    },
    {
      id: "approach",
      eyebrow: "Approach",
      title: "Two models, one pipeline",
      paragraphs: [
        "I used GPT to parse and normalize color lists from Figma variable exports, then Claude to structure them into a design-system document with semantic names, hex values, and Figma variable cross-references.",
        "The output became docs/design-system.md — a stable reference agents and I could both cite during the portfolio build.",
      ],
      callouts: [
        {
          type: "decision",
          title: "Why not pick colors manually",
          body: "Agents drift when tokens are vague. A machine-readable palette with Figma variable names gives both humans and AI the same source of truth.",
        },
        {
          type: "learning",
          title: "Lesson",
          body: "Small automation wins compound: token extraction took minutes instead of an hour, and downstream prompts became more precise.",
        },
      ],
    },
    {
      id: "outcome",
      eyebrow: "Outcome",
      title: "Tokens that agents could actually use",
      paragraphs: [
        "The portfolio build referenced Primary dark (#333333), Page cream (#f4f0e5), and Text secondary (#626c81) consistently — because they were documented once and reused everywhere.",
      ],
    },
  ],
};
