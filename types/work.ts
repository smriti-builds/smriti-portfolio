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
  /** Figma tag label weight — card 1 uses Instrument Sans SemiBold */
  tagWeight?: "semibold" | "medium";
  /** Card 1 mask shape is not a uniform 24px radius */
  previewRounded?: boolean;
  /** Figma card image area fill — fallback while image loads */
  backgroundColor: string;
};

export type WorkContent = {
  eyebrow: string;
  headline: {
    primary: string;
    secondary: string;
  };
  projects: WorkProject[];
};
