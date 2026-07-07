import { aiCommentaryCaseStudy } from "@/lib/content/work-case-studies/ai-commentary";
import { workContent } from "@/lib/content/work";
import type { CaseStudy, CaseStudyPageContext } from "@/types/case-study";

export const workCaseStudies: CaseStudy[] = [aiCommentaryCaseStudy];

const workCaseStudyBySlug = new Map(
  workCaseStudies.map((study) => [study.slug, study]),
);

/** Work cards with internal `/work/*` routes — excludes external Figma/Medium links. */
const navigableWorkProjectIds = workContent.projects
  .filter((project) => project.href?.startsWith("/work/"))
  .map((project) => project.id);

export const workCaseStudyPageContext: CaseStudyPageContext = {
  backHref: "/#featured-work",
  backLabel: "Back to work",
  navBasePath: "/work",
  navAriaLabel: "Other case studies",
};

export function getWorkCaseStudy(slug: string): CaseStudy | undefined {
  return workCaseStudyBySlug.get(slug);
}

export function getAllWorkCaseStudySlugs(): string[] {
  return workCaseStudies.map((study) => study.slug);
}

export function getAdjacentWorkCaseStudies(slug: string): {
  prev?: CaseStudy;
  next?: CaseStudy;
} {
  const navigableSlugs = navigableWorkProjectIds
    .map((projectId) => getWorkCaseStudy(projectId))
    .filter((study): study is CaseStudy => study != null);

  const index = navigableSlugs.findIndex((study) => study.slug === slug);
  if (index === -1) return {};

  return {
    prev: index > 0 ? navigableSlugs[index - 1] : undefined,
    next:
      index < navigableSlugs.length - 1
        ? navigableSlugs[index + 1]
        : undefined,
  };
}
