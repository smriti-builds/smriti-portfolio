const links = [
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Email", href: "mailto:smriti.205@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="surface-bleed-x w-full min-w-0 border-t border-neutral-200 bg-bg-cream">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-[88px]">
        <div>
          <p className="font-instrument-sans text-2xl font-semibold text-text-primary">
            Smriti Rawat
          </p>
          <p className="mt-2 font-instrument-sans text-base text-text-secondary">
            Product Designer
          </p>
        </div>

        <nav aria-label="Footer links">
          <ul className="flex flex-wrap gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-instrument-sans text-sm font-medium text-text-secondary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="font-instrument-sans text-sm text-text-secondary">
          © {new Date().getFullYear()} Smriti Rawat. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
