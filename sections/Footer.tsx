import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { journalSectionFrame } from "@/lib/content/journal";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/smriti-rawat-947ba9b8/", external: true },
  { label: "Medium", href: "https://medium.com/@smriti.205", external: true },
  { label: "Email", href: "mailto:smriti.205@gmail.com", external: false },
  { label: "Resume", href: "#", external: true },
];

export default function Footer() {
  const { tornEdgeTop } = journalSectionFrame;

  return (
    <footer className="surface-bleed-x w-full min-w-0 bg-bg-cream">
      <div className="surface-bleed-x w-full bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tornEdgeTop}
          alt=""
          aria-hidden
          width={2880}
          height={54}
          className="block w-full min-w-full max-w-none leading-[0]"
          style={{ aspectRatio: "2880 / 54" }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-[88px]">
        <nav aria-label="Footer links">
          <ul className="flex flex-wrap gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-1 font-instrument-sans text-base font-medium"
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="text-text-primary transition-colors duration-300 group-hover:text-text-primary">
                    {link.label}
                  </span>
                  <HiOutlineArrowUpRight
                    aria-hidden
                    className="size-3 shrink-0 text-text-primary transition-all duration-300 ease-out group-hover:rotate-45 group-hover:text-text-primary"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="font-instrument-sans text-sm text-text-secondary">
          © 2026 Smriti Rawat. Powered by caffeine and curiosity.
        </p>
      </div>
    </footer>
  );
}
