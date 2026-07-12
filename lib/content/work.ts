import type { WorkContent, WorkProject } from "@/types/work";

/** Figma 1060:14651 + 1060:14723 — explicit 2×2 rows */
export const workProjectRows: WorkProject[][] = [
  [
    {
      id: "ai-commentary",
      title: "Real time AI commentary",
      description: [
        { text: "Designing a real-time AI experience that increased " },
        { text: "free trial starts by 162%", emphasis: true },
      ],
      tags: ["AI Prediction", "monetisation"],
      preview: "ai-commentary",
      descriptionMaxWidth: 495,
      tagTracking: ["1px", "0.16px"],
      tagWeight: "semibold",
      previewRounded: false,
      backgroundColor: "#f4f0e5",
      href: "/work/ai-commentary",
    },
    {
      id: "padel-platform",
      title: "AI-powered padel intelligence platform",
      description: [
        { text: "Scaling the new design to " },
        { text: "3 international markets", emphasis: true },
        { text: " (Dubai, London, Spain), achieving " },
        { text: "88% first-time user activation", emphasis: true },
        { text: "." },
      ],
      tags: ["Video analytics", "Sports Intelligence"],
      preview: "padel-platform",
      descriptionMaxWidth: 616,
      previewRounded: true,
      backgroundColor: "#ececff",
      hoverOverlayLabel: "Under NDA",
      hoverOverlaySubtitle: "I can present the project during an interview.",
    },
  ],
  [
    {
      id: "checkout",
      title: "Reducing drop off at checkout",
      description: [
        { text: "How we reduced " },
        { text: "cart abandonment by 18%", emphasis: true },
        { text: " & " },
        { text: "increased AOV by ₹24", emphasis: true },
      ],
      tags: ["Personalisation", "Q Commerce"],
      preview: "checkout",
      descriptionMaxWidth: 452,
      previewRounded: true,
      backgroundColor: "#e5f2ff",
      href: "https://www.figma.com/proto/xTrjOAaZSd9i9r9YD2WSWE/Portfolio-Case-study-CP-Revamp?node-id=1-2666&t=kI5oTbJv2SHqlAcc-1&scaling=contain&content-scaling=fixed&page-id=0%3A1",
    },
    {
      id: "interview-scheduler",
      title: "The interview scheduler",
      description: [
        { text: "Documenting how we made hiring " },
        { text: "easier and 2X faster", emphasis: true },
        { text: " for our customers" },
      ],
      tags: ["Application Tracking", "Chat"],
      preview: "interview-scheduler",
      descriptionMaxWidth: 528,
      previewRounded: true,
      backgroundColor: "#d4efdd",
      href: "https://medium.com/ux-planet/designing-for-a-seamless-hiring-experience-the-interview-scheduler-5b9fcb31e41e",
    },
  ],
];

/** Figma node 1060:14638 — Case study section */
export const workContent: WorkContent = {
  eyebrow: "Case  studies",
  headline: {
    primary: "Think. Design. Develop. Launch. ",
    secondary: "Repeat",
  },
  projects: workProjectRows.flat(),
};
