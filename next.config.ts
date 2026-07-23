import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.cursor.sh",
    "*.cursor.com",
    "cursor.com",
    "*.cursorapp.com",
    "*.cursor-agent.com",
  ],
  images: {
    // Next 16 ignores `quality` props not listed here (falls back to 75).
    // The work card previews request quality 100 for crisp mockups.
    qualities: [75, 100],
  },
  // Avoid picking a parent-directory lockfile as the Turbopack root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
