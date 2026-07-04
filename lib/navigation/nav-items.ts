import type { LucideIcon } from "lucide-react";
import { FileText, Folder, Image, Smile } from "lucide-react";

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
  /** When true, active on `/` with no hash (home default). */
  isHomeDefault?: boolean;
};

export const navItems: NavItem[] = [
  {
    label: "Work",
    href: "/#featured-work",
    icon: Folder,
    hash: "featured-work",
    isHomeDefault: true,
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
    label: "About",
    href: "/#journal",
    icon: Smile,
    hash: "journal",
  },
  {
    label: "CV",
    href: "/#",
    icon: FileText,
    pathPrefixes: ["/cv"],
  },
];
