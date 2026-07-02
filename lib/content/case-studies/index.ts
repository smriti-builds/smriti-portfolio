import { claudeFigmaMcpCaseStudy } from "@/lib/content/case-studies/claude-figma-mcp";
import { claudeGptCaseStudy } from "@/lib/content/case-studies/claude-gpt";
import { cursorGithubCaseStudy } from "@/lib/content/case-studies/cursor-github";
import type { CaseStudy } from "@/types/case-study";

export const caseStudies: CaseStudy[] = [
  cursorGithubCaseStudy,
  claudeFigmaMcpCaseStudy,
  claudeGptCaseStudy,
];

const caseStudyBySlug = new Map(caseStudies.map((study) => [study.slug, study]));

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudyBySlug.get(slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.slug);
}

export function getAdjacentCaseStudies(slug: string): {
  prev?: CaseStudy;
  next?: CaseStudy;
} {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  if (index === -1) return {};

  return {
    prev: index > 0 ? caseStudies[index - 1] : undefined,
    next: index < caseStudies.length - 1 ? caseStudies[index + 1] : undefined,
  };
}
