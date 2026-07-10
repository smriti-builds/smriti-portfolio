import type { LucideIcon } from "lucide-react";
import { FileText, Folder, Image, Smile } from "lucide-react";

export const resumeHref = "/Smriti_Rawat_Sr%20Product%20designer_Resume.pdf";

export type NavItem = {
  label: string;
  /** Shorter label for narrow mobile layouts. */
  mobileLabel?: string;
  href: string;
  icon: LucideIcon;
  /** Hash segment (without #) used for in-page active matching on `/`. */
  hash?: string;
  /** Pathname prefixes that mark this item active (e.g. `/experiments`). */
  pathPrefixes?: string[];
  /** Open in a new tab (e.g. resume PDF). */
  external?: boolean;
};

export const navItems: NavItem[] = [
  {
    label: "Work",
    href: "/#featured-work",
    icon: Folder,
    hash: "featured-work",
    pathPrefixes: ["/work"],
  },
  {
    label: "About",
    href: "/#journal",
    icon: Smile,
    hash: "journal",
  },
  {
    label: "Playground",
    mobileLabel: "Play",
    href: "/#experiments",
    icon: Image,
    hash: "experiments",
    pathPrefixes: ["/experiments"],
  },
  {
    label: "Resume",
    href: resumeHref,
    icon: FileText,
    external: true,
  },
];
