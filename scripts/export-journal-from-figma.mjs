#!/usr/bin/env node
/**
 * Export journal assets from Figma.
 *
 * Requires FIGMA_TOKEN (Personal Access Token from Figma → Settings → Security).
 *
 * Usage:
 *   FIGMA_TOKEN=figd_... node scripts/export-journal-from-figma.mjs
 */

const FILE_KEY = "IThTX6X20ZgpnFnbnNuj2H";
const NODES = {
  closedSection: "1084:15781",
  openSection: "1084:16914",
};
const OUTPUT_DIR = new URL("../public/Journal/", import.meta.url);
const SCALE = 2;

const token = process.env.FIGMA_TOKEN;
if (!token) {
  console.error("Missing FIGMA_TOKEN. Create one at https://www.figma.com/developers/api#access-tokens");
  process.exit(1);
}

async function figmaExport(nodeId) {
  const params = new URLSearchParams({
    ids: nodeId,
    format: "png",
    scale: String(SCALE),
  });
  const res = await fetch(`https://api.figma.com/v1/images/${FILE_KEY}?${params}`, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) throw new Error(`Figma images API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const url = data.images?.[nodeId];
  if (!url) throw new Error(`No image URL for node ${nodeId}`);
  return url;
}

async function download(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const path = new URL(filename, OUTPUT_DIR);
  await import("node:fs/promises").then((fs) => fs.writeFile(path, buf));
  console.log(`Saved ${path.pathname} (${buf.length} bytes)`);
}

async function main() {
  const { mkdir } = await import("node:fs/promises");
  await mkdir(OUTPUT_DIR, { recursive: true });

  const [closedUrl, openUrl] = await Promise.all([
    figmaExport(NODES.closedSection),
    figmaExport(NODES.openSection),
  ]);

  await Promise.all([
    download(closedUrl, "journal-closed-section.png"),
    download(openUrl, "journal-open-spread.png"),
  ]);

  console.log("\nDone. Figma nodes exported:");
  console.log(`  ${NODES.closedSection} → public/Journal/journal-closed-section.png`);
  console.log(`  ${NODES.openSection} → public/Journal/journal-open-spread.png`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
