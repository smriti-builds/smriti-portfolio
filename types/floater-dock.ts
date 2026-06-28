export type FloaterDockIcon =
  | "notes"
  | "linkedin"
  | "email"
  | "phone"
  | "medium";

export type FloaterDockItem = {
  id: string;
  label: string;
  href: string;
  icon: FloaterDockIcon;
  external?: boolean;
};

export type FloaterDockContent = {
  items: FloaterDockItem[];
};
