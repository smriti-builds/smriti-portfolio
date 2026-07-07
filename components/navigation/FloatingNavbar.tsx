"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { navItems, type NavItem } from "@/lib/navigation/nav-items";
import { useActiveHomeSection } from "@/lib/navigation/use-active-home-section";

function isItemActive(
  item: NavItem,
  pathname: string,
  activeHomeSection: string,
): boolean {
  if (item.pathPrefixes?.some((prefix) => pathname.startsWith(prefix))) {
    return true;
  }

  if (pathname !== "/" || !item.hash) {
    return false;
  }

  if (!activeHomeSection || activeHomeSection === "hero") {
    return false;
  }

  return activeHomeSection === item.hash;
}

function isHomeActive(pathname: string, activeHomeSection: string): boolean {
  return pathname === "/" && activeHomeSection === "hero";
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
        "group inline-flex w-full min-w-0 cursor-pointer items-center justify-center gap-1 rounded-full",
        "px-1.5 py-2 text-[13px] tracking-[-0.02em] transition-[transform,color,opacity] duration-[250ms] ease-out",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A3732]",
        "sm:gap-1.5 sm:px-2 sm:py-2.5 sm:text-[14px]",
        "md:w-auto md:min-w-0 md:gap-2.5 md:px-5 md:py-3 md:text-[17px]",
        "lg:gap-3 lg:px-6 lg:py-3.5 lg:text-[19px]",
        "md:max-[1439px]:gap-2 md:max-[1439px]:px-3.5 md:max-[1439px]:py-2 md:max-[1439px]:text-[15px]",
        active
          ? "font-semibold text-[#3A3732]"
          : "font-medium text-[#3A3732]/65 hover:-translate-y-0.5 hover:text-[#3A3732]",
      ].join(" ")}
    >
      <Icon
        aria-hidden
        strokeWidth={active ? 2 : 1.75}
        className={[
          "size-4 shrink-0 transition-colors duration-[250ms] ease-out sm:size-[18px]",
          "md:size-5 lg:size-[22px] md:max-[1439px]:size-[18px]",
          active
            ? "text-[#3A3732]"
            : "text-[#3A3732]/65 group-hover:text-[#3A3732]",
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
  const activeHomeSection = useActiveHomeSection();
  const homeActive = isHomeActive(pathname, activeHomeSection);

  if (pathname.startsWith("/work/") || pathname.startsWith("/experiments/")) {
    return null;
  }

  return (
    <motion.nav
      aria-label="Primary"
      initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={[
        "pointer-events-none fixed inset-x-0 top-6 z-[100] flex justify-center px-3",
        "md:top-6 md:px-4 md:max-[1439px]:top-4",
      ].join(" ")}
    >
      <div className="pointer-events-auto flex w-full max-w-[calc(100vw-24px)] items-center gap-2 md:w-auto md:max-w-none md:gap-3 md:max-[1439px]:gap-2.5">
        <Link
          href="/"
          aria-label="Smriti Rawat — Home"
          aria-current={homeActive ? "page" : undefined}
          className={[
            "flex shrink-0 items-center justify-center rounded-full border border-[#D8D0C2] bg-[#F7F3EB]",
            "shadow-[0_12px_40px_rgba(70,55,25,0.08)]",
            "size-14 tracking-[-0.02em] transition-[transform,color,opacity] duration-[250ms] ease-out",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A3732]",
            "md:size-[72px] md:text-base lg:size-[76px] lg:text-lg",
            "md:max-[1439px]:size-[52px] md:text-sm",
            homeActive
              ? "text-sm font-semibold text-[#3A3732]"
              : "text-sm font-medium text-[#3A3732]/65 hover:-translate-y-0.5 hover:text-[#3A3732]",
          ].join(" ")}
        >
          SR
        </Link>

        <div
          className={[
            "flex min-h-[56px] min-w-0 flex-1 items-center justify-center",
            "rounded-full border border-[#D8D0C2] bg-[#F7F3EB]",
            "shadow-[0_12px_40px_rgba(70,55,25,0.08)]",
            "px-1.5 py-1.5",
            "md:h-[72px] md:w-auto md:flex-none md:px-3 md:py-0",
            "lg:h-[76px] lg:px-4",
            "md:max-[1439px]:h-[52px] md:max-[1439px]:px-2.5",
          ].join(" ")}
        >
          <ul className="grid w-full grid-cols-4 items-center md:flex md:w-auto md:flex-nowrap md:justify-center md:gap-1">
            {navItems.map((item) => {
              const active = isItemActive(item, pathname, activeHomeSection);

              return (
                <li key={item.label} className="min-w-0 md:shrink-0">
                  <FloatingNavLink item={item} active={active} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}
