#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const spreadPath = fileURLToPath(
  new URL("../public/Journal/journal-open-spread.png", import.meta.url),
);

const buffer = readFileSync(spreadPath);
const width = buffer.readUInt32BE(16);
const height = buffer.readUInt32BE(20);

const expected = { width: 988, height: 704, minBytes: 80_000 };

console.log(`journal-open-spread.png: ${width}×${height} (${buffer.length} bytes)`);

const landscape = width > height;
const closeToExpected =
  Math.abs(width / height - expected.width / expected.height) < 0.05;

if (!landscape || !closeToExpected || buffer.length < expected.minBytes) {
  console.error(
    "\nUnexpected journal open spread asset.",
    `Expected a landscape image near ${expected.width}×${expected.height}`,
    "exported from Figma node 1084:16914.",
    "\nReplace public/Journal/journal-open-spread.png, then commit and push.",
  );
  process.exit(1);
}

console.log("Journal open spread asset looks valid.");
