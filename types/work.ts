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
  /** Card image area background — Figma node fill */
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
