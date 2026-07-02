import type { CaseStudy } from "@/types/case-study";

export const cursorGithubCaseStudy: CaseStudy = {
  slug: "cursor-github",
  experimentId: "cursor-github",
  title: "Can AI help designers become builders?",
  subtitle: "From Figma to deployed site with AI",
  lede: `For years, designers have relied on engineering handoffs to bring ideas to life. With the rise of AI coding agents, that boundary is changing.

This project wasn't about seeing whether AI could generate code. It was about exploring a bigger question:

>>Can product designers use AI to own the journey from idea to shipped product without becoming full-time software engineers?

To answer that, I rebuilt my own portfolio from scratch by directing AI through design specifications, interaction models, structured prompts, and iterative reviews until it matched a premium Figma design and was deployed to production.

!!The website became both the experiment and the evidence.`,
  categories: ["AI & Emerging Tech", "Portfolio", "Front-end"],
  heroImage: {
    src: "/GenAIExperiments/artifact_2.png",
    width: 804,
    height: 556,
    alt: "Can AI Help Designers Become Builders?",
  },
  meta: {
    duration: "9 active days",
    status: "Shipped",
    role: [
      "Product design",
      "Interaction design",
      "Motion direction",
      "AI direction",
      "Front-end review",
    ],
    tools: [
      "Figma",
      "Cursor",
      "Next.js",
      "Framer Motion",
      "GitHub",
      "Vercel",
    ],
    impact: "124 commits, 9 PRs, live deployed portfolio",
  },
  liveUrl: undefined,
  relatedSlugs: ["claude-figma-mcp", "claude-gpt"],
  sections: [
    {
      id: "problem",
      eyebrow: "The problem",
      title: "Why this matters",
      paragraphs: [
        `Most AI discussions focus on productivity. I was more interested in capability. Rather than asking,

"Can AI make me faster?"

I asked,

"Can AI expand what I'm capable of building?"`,
        `The answer wasn't simply "yes." It fundamentally changed how I think about design.`,
        "Instead of ending my process at high-fidelity mockups, I found myself thinking about interaction architecture, implementation constraints, deployment, performance, and motion systems—areas traditionally owned by engineering.",
      ],
    },
    {
      id: "role",
      eyebrow: "My role",
      title: "Designer as director, not just author",
      paragraphs: [
        "I owned the Figma design, content architecture, interaction model, and motion timing. Cursor agents handled high-volume implementation; I directed through project rules, Figma node references and it scoped the entire project PRs.",
      ],
      bullets: [
        "Authored Figma design and extracted design tokens",
        "Scoped work into 9 feature branches with PR review",
        "Decomposed journal interaction into geometry, layers, and state machine",
        "Re-exported assets at 2× and 3× when agents delivered blurry mockups",
        "Shipped to Vercel after production build verification",
      ],
    },
    {
      id: "workflow-shift",
      eyebrow: "Workflow",
      title: "The shift in workflow",
      paragraphs: [
        "One of the biggest takeaways from this project was that AI changes the designer's role.",
        "Instead of writing every line of code, I spent my time:",
      ],
      bullets: [
        "Breaking complex problems into smaller systems",
        "Defining interaction behaviour before implementation",
        "Reviewing AI output for fidelity and interaction quality",
        "Recognizing when the implementation strategy, not just the code, needed to change",
        "Making product and UX trade-offs that balanced design quality, technical complexity, and performance",
        "Iterating until the experience felt right",
      ],
      closingParagraphs: [
        "The work shifted from creating artifacts to directing systems.",
      ],
    },
    {
      id: "ai-design-workflow",
      eyebrow: "Design lifecycle",
      title: "AI across the design workflow",
      paragraphs: [
        "This project also helped me understand where AI creates the most value across the design lifecycle.",
      ],
      comparisonTable: {
        headers: {
          stage: "Stage",
          traditional: "Traditional Workflow",
          aiAssisted: "AI-Assisted Workflow",
        },
        rows: [
          {
            stage: "Exploration",
            traditional: "Research, moodboards",
            aiAssisted: "Faster concept generation and exploration",
          },
          {
            stage: "Design",
            traditional: "Figma",
            aiAssisted: "Figma + implementation-aware thinking",
          },
          {
            stage: "Specification",
            traditional: "Static handoff",
            aiAssisted:
              "Structured prompts, node references, design constraints",
          },
          {
            stage: "Development",
            traditional: "Engineering handoff",
            aiAssisted: "Collaborative implementation with AI",
          },
          {
            stage: "QA",
            traditional: "Manual review",
            aiAssisted:
              "Rapid iteration with AI while maintaining design quality",
          },
          {
            stage: "Shipping",
            traditional: "Engineering-owned",
            aiAssisted: "Designer-led deployment and refinement",
          },
        ],
      },
      closingParagraphs: [
        "Instead of replacing any stage, AI became a collaborator throughout the process.",
      ],
    },
    {
      id: "ai-strengths",
      eyebrow: "Execution",
      title: "What AI was good at",
      paragraphs: [
        "AI consistently accelerated:",
      ],
      bullets: [
        "Repetitive implementation",
        "Component creation",
        "Framer Motion implementation",
        "Code refactoring",
        "Debugging well-defined issues",
        "Translating specifications into working interfaces",
      ],
      closingParagraphs: [
        "Once the problem was clearly defined, implementation became remarkably fast.",
      ],
    },
    {
      id: "human-judgment",
      eyebrow: "Decision-making",
      title: "Where human judgment was essential",
      paragraphs: [
        "The highest-value work remained deeply human.",
        "AI couldn't decide:",
      ],
      bullets: [
        "How the journal should behave",
        'What "premium" motion feels like',
        "Which interaction model best matched the experience",
        "When an architecture should be abandoned",
        "What trade-offs were worth making",
      ],
      closingParagraphs: [
        "Those decisions still depended on product thinking and design judgment.",
      ],
    },
    {
      id: "biggest-learning",
      eyebrow: "Biggest learning",
      title: "The biggest shift",
      paragraphs: [
        "The biggest shift wasn't learning React or Framer Motion. It was learning how to communicate with AI.",
        "Good prompts weren't clever. They were clear.",
        'The highest quality outcomes came from treating Figma as a specification system- using node IDs, constraints, geometry, acceptance criteria, and interaction models instead of asking AI to "match the design."',
        "In other words:",
      ],
      closingParagraphs: [
        ">>Better specifications consistently produced better products.",
      ],
    },
    {
      id: "challenge",
      eyebrow: "The challenge",
      title: "Where AI-assisted builds break down",
      paragraphs: [
        "The hardest problems were not scaffolding- they were fidelity, compositing, and interaction architecture under motion.",
      ],
      bullets: [
        "Hero: 20+ collage items at absolute Figma coordinates with chaos-to-clean scroll staging",
        "Work: 3× retina mockups, transparent floaters, hover states that scale only the mockup layer",
        "Journal: four architectural pivots before settling on cover-over-spread with idle, parallax, and auto-open",
        "AI drift: agents defaulting to flex layouts and wrong fonts without explicit constraints",
      ],
      media: [
        {
          type: "image",
          src: "/GenAIExperiments/challenge-iterations.webp",
          width: 1024,
          height: 704,
          alt: "Journal interaction iterations from scroll flip to final cover-over-spread approach",
        },
      ],
    },
    {
      id: "ai-collaboration",
      eyebrow: "AI collaboration",
      title: "How I directed agents instead of vibe-coding",
      paragraphs: [
        "Prompts evolved from broad asks to measurable specs. Early: “Implement Work section.” Later: “Align with Figma node 1060:14638.” Final: symptom-specific fixes like “Anchor bookmarks spine-relative, single layer behind cover.”",
        "I wrote CLAUDE.md rules — match Figma exactly, no redesign, Framer Motion for animation — and separated content from components so agents had stable targets. Validation scripts for journal assets became acceptance criteria.",
      ],
      callouts: [
        {
          type: "learning",
          title: "What worked",
          body: [
            "Figma node IDs",
            "One issue per commit",
            "Animation constants in dedicated files",
            "Branch-per-feature PRs kept velocity high without losing control",
            "Token optimisation - Instead of relying on long conversational context, I started using reusable artifacts- such as CLAUDE.md, structured content files, component-specific documentation, and stable project rules.",
          ],
        },
        {
          type: "hiccup",
          title: "What failed first",
          body: "Scroll-driven journal flips, single bookmark assets, and 1× image exports all looked close but broke on interaction or retina displays. Each needed a structural fix, not a polish pass.",
        },
        {
          type: "decision",
          title: "Key pivot",
          body: "I abandoned scroll-hijacking journal animations when they fought page scroll. Tap toggle + 5s auto-open + idle breath replaced a passport-style 3D flip.",
        },
      ],
    },
    {
      id: "outcome",
      eyebrow: "Outcome",
      title: "What this project says about me",
      paragraphs: [
        "This experiment fundamentally changed how I approach product design. AI didn't replace my workflow, it expanded it. By shifting repetitive implementation to AI, I could focus on the decisions that matter most: defining interactions, making trade-offs, and crafting the overall experience.",
        "A single-page portfolio with scroll-driven hero, featured work, interactive journal, Gen AI experiments carousel, writing, testimonials, and footer all statically generated and deployed.",
        "The site is both the artifact and the proof.",
      ],
      callouts: [
        {
          type: "impact",
          title: "We're moving beyond designing interfaces. We're becoming builders who can ship experiences.",
          body: `This project isn't meant to demonstrate that I can code. It's meant to demonstrate that I can build. I can take an idea from concept to production by combining product thinking, interaction design, structured AI collaboration, and rapid iteration. To me, that's one of the most important shifts AI is enabling for designers.`,
        },
      ],
      postCalloutParagraphs: [
        "!!Before this project, my workflow ended at Figma. Today, it ends in production.",
      ],
    },
  ],
};
