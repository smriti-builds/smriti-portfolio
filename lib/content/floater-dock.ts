import type { FloaterDockContent } from "@/types/floater-dock";

/** Figma node 1064:14811 — contact floater dock */
export const floaterDockContent: FloaterDockContent = {
  items: [
    {
      id: "notes",
      label: "Open journal",
      href: "#journal",
      icon: "notes",
    },
    {
      id: "linkedin",
      label: "LinkedIn profile",
      href: "#",
      icon: "linkedin",
      external: true,
    },
    {
      id: "email",
      label: "Send email",
      href: "mailto:smriti.205@gmail.com",
      icon: "email",
    },
    {
      id: "phone",
      label: "Call",
      href: "#",
      icon: "phone",
    },
    {
      id: "medium",
      label: "Medium articles",
      href: "#",
      icon: "medium",
      external: true,
    },
  ],
};
