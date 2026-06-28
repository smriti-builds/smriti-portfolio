"use client";

import { AnimatePresence, motion } from "framer-motion";
import { floaterDockContent } from "@/lib/content/floater-dock";
import { useFloaterDockVisible } from "@/lib/use-floater-dock-visibility";
import { FloaterDockIconView } from "@/sections/FloaterDockIcons";
import type { FloaterDockItem } from "@/types/floater-dock";

const DOCK_ICON_SIZE = 56;
const DOCK_TRANSITION = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

function FloaterDockLink({ item }: { item: FloaterDockItem }) {
  return (
    <motion.a
      href={item.href}
      aria-label={item.label}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className="relative block shrink-0 overflow-hidden rounded-[12px]"
      style={{ width: DOCK_ICON_SIZE, height: DOCK_ICON_SIZE }}
      whileHover={{ scale: 1.12, y: -6 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      <FloaterDockIconView icon={item.icon} />
      {item.icon === "linkedin" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            boxShadow: "inset 0.45px 0.45px 0.45px rgba(255,255,255,0.2)",
          }}
        />
      ) : null}
    </motion.a>
  );
}

export default function FloaterDock() {
  const visible = useFloaterDockVisible();

  return (
    <AnimatePresence>
      {visible ? (
        <motion.nav
          key="floater-dock"
          aria-label="Contact shortcuts"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={DOCK_TRANSITION}
          className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
        >
          <div
            className="pointer-events-auto flex items-center justify-center gap-[18px] rounded-[21px] border-[0.5px] border-white/40 p-[18px] shadow-[0_8px_32px_rgba(32,44,61,0.12)] backdrop-blur-[18px]"
            style={{
              backgroundImage:
                "linear-gradient(167deg, rgba(255,255,255,0.08) 1.91%, rgba(255,255,255,0.43) 68.31%)",
            }}
          >
            {floaterDockContent.items.map((item) => (
              <FloaterDockLink key={item.id} item={item} />
            ))}
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
