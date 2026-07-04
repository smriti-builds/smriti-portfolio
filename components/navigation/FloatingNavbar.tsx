"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { navItems, type NavItem } from "@/lib/navigation/nav-items";

function getHashFromLocation(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.hash.replace(/^#/, "");
}

function subscribeToHash(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  return () => window.removeEventListener("hashchange", onStoreChange);
}

function getHashSnapshot() {
  return getHashFromLocation();
}

function getServerHashSnapshot() {
  return "";
}

function useLocationHash() {
  return useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerHashSnapshot);
}

function isItemActive(item: NavItem, pathname: string, hash: string): boolean {
  if (item.pathPrefixes?.some((prefix) => pathname.startsWith(prefix))) {
    return true;
  }

  if (pathname !== "/") {
    return false;
  }

  if (item.hash && hash === item.hash) {
    return true;
  }

  if (item.isHomeDefault && hash === "") {
    return true;
  }

  return false;
}

type FloatingNavLinkProps = {
  item: NavItem;
  active: boolean;
};

function FloatingNavLink({ item, active }: FloatingNavLinkProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      className={[
        "group inline-flex w-full min-w-0 cursor-pointer items-center justify-center gap-1 rounded-full border border-transparent",
        "px-1.5 py-2 text-[13px] tracking-[-0.02em] transition-[transform,background-color,color,border-color,box-shadow,opacity] duration-[250ms] ease-out",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F2937]",
        "sm:gap-1.5 sm:px-2 sm:py-2.5 sm:text-[14px]",
        "md:w-auto md:min-w-0 md:gap-2.5 md:px-5 md:py-3 md:text-[17px]",
        "lg:gap-3 lg:px-6 lg:py-3.5 lg:text-[19px]",
        active
          ? "font-semibold text-[#111827]"
          : "font-medium text-[#1F2937]/65 hover:-translate-y-0.5 hover:border-[#C4C9CF] hover:bg-white hover:text-[#111827] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]",
      ].join(" ")}
    >
      <Icon
        aria-hidden
        strokeWidth={active ? 2 : 1.75}
        className={[
          "size-4 shrink-0 transition-colors duration-[250ms] ease-out sm:size-[18px] md:size-5 lg:size-[22px]",
          active
            ? "text-[#111827]"
            : "text-[#1F2937]/65 group-hover:text-[#111827]",
        ].join(" ")}
      />
      <span className="truncate">
        {item.mobileLabel ? (
          <>
            <span className="md:hidden">{item.mobileLabel}</span>
            <span className="hidden md:inline">{item.label}</span>
          </>
        ) : (
          item.label
        )}
      </span>
    </Link>
  );
}

export default function FloatingNavbar() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const hash = useLocationHash();

  return (
    <motion.nav
      aria-label="Primary"
      initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={[
        "pointer-events-none fixed inset-x-0 top-6 z-[100] flex justify-center px-3",
        "md:top-6 md:px-4",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-auto flex min-h-[56px] w-full max-w-[calc(100vw-24px)] items-center justify-center",
          "rounded-full border border-[#D9DDE1] bg-[#F5F7F8]",
          "shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
          "px-1.5 py-1.5",
          "md:h-[72px] md:w-auto md:max-w-none md:px-3 md:py-0",
          "lg:h-[76px] lg:px-4",
        ].join(" ")}
      >
        <ul className="grid w-full grid-cols-4 items-center md:flex md:w-auto md:flex-nowrap md:justify-center md:gap-1">
          {navItems.map((item) => {
            const active = isItemActive(item, pathname, hash);

            return (
              <li key={item.label} className="min-w-0 md:shrink-0">
                <FloatingNavLink item={item} active={active} />
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}
