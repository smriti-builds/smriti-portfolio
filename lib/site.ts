/** Canonical site origin for metadata and absolute asset URLs. */
const PRODUCTION_SITE_URL = "https://www.smritidesign.work";

export function getSiteUrl(): URL {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }

  // Prefer the custom domain over ephemeral *.vercel.app deployment URLs —
  // LinkedIn and other crawlers need a stable absolute og:image host.
  if (process.env.VERCEL_ENV === "production") {
    return new URL(PRODUCTION_SITE_URL);
  }

  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }

  if (process.env.NODE_ENV === "development") {
    return new URL("http://localhost:3000");
  }

  return new URL(PRODUCTION_SITE_URL);
}
