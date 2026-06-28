export type WorkDescriptionPart = {
  text: string;
  /** Bold highlight — Figma Instrument Sans SemiBold #333 */
  emphasis?: boolean;
};

export type WorkProjectPreview =
  | "ai-commentary"
  | "padel-platform"
  | "checkout"
  | "interview-scheduler";

export type WorkProject = {
  id: string;
  title: string;
  description: WorkDescriptionPart[];
  tags: string[];
  preview: WorkProjectPreview;
  /** Max width for description copy in px — Figma per card */
  descriptionMaxWidth?: number;
  /** First tag uses wider letter-spacing in Figma */
  tagTracking?: [string, string];
};

export type WorkContent = {
  eyebrow: string;
  headline: {
    primary: string;
    secondary: string;
  };
  projects: WorkProject[];
};
