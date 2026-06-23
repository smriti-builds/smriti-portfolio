/**
 * Figma node 1006:24918 — Shape layer vector paths (viewBox 0 0 1210 714).
 * Exported from the Hero grid cutout shape layer; do not hand-edit coordinates.
 */
export const heroGridCutoutPaths = [
  "M220 385H550.5V495H220V385Z",
  "M661 0H826V164H660L661 0Z",
  "M826 0H1044.5L1045.5 109.495H826V0Z",
  "M824.497 494.5L1101 497V714H826L824.497 494.5Z",
  "M1101 606H1210V714H1101V606Z",
  "M0 661H166V714H0V661Z",
  "M0.35404 220H165.5V440H0.35404V220Z",
  "M1100 111L1210 110.5V219.5H1100V111Z",
  "M385.5 110H220.197V55H165V0H440V55H385.5V110Z",
  "M991 385H824.497L825.993 275.249H660V165L991 164.5V385Z",
  "M110.5 550.5H275V661H110.5V550.5Z",
] as const;

export type HeroGridCutoutSegment = [number, number, number, number];

const PATH_COMMANDS = new Set(["M", "H", "V", "L", "Z"]);

function isPathCommand(token: string): boolean {
  return PATH_COMMANDS.has(token);
}

function parsePath(d: string): HeroGridCutoutSegment[] {
  const segments: HeroGridCutoutSegment[] = [];
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;

  const tokens = d.match(/[MHVLZ]|[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi) ?? [];
  let i = 0;

  while (i < tokens.length) {
    const command = tokens[i];
    i += 1;

    if (command === "M") {
      x = Number(tokens[i]);
      y = Number(tokens[i + 1]);
      i += 2;
      startX = x;
      startY = y;
      continue;
    }

    if (command === "H") {
      while (i < tokens.length && !isPathCommand(tokens[i])) {
        const nextX = Number(tokens[i]);
        segments.push([x, y, nextX, y]);
        x = nextX;
        i += 1;
      }
      continue;
    }

    if (command === "V") {
      while (i < tokens.length && !isPathCommand(tokens[i])) {
        const nextY = Number(tokens[i]);
        segments.push([x, y, x, nextY]);
        y = nextY;
        i += 1;
      }
      continue;
    }

    if (command === "L") {
      while (i < tokens.length && !isPathCommand(tokens[i])) {
        const nextX = Number(tokens[i]);
        const nextY = Number(tokens[i + 1]);
        segments.push([x, y, nextX, nextY]);
        x = nextX;
        y = nextY;
        i += 2;
      }
      continue;
    }

    if (command === "Z") {
      if (x !== startX || y !== startY) {
        segments.push([x, y, startX, startY]);
      }
      x = startX;
      y = startY;
    }
  }

  return segments;
}

function normalizeSegment([x1, y1, x2, y2]: HeroGridCutoutSegment): HeroGridCutoutSegment {
  if (x1 < x2 || (x1 === x2 && y1 <= y2)) {
    return [x1, y1, x2, y2];
  }

  return [x2, y2, x1, y1];
}

function segmentKey(segment: HeroGridCutoutSegment): string {
  const [x1, y1, x2, y2] = normalizeSegment(segment);
  return `${x1.toFixed(3)},${y1.toFixed(3)}|${x2.toFixed(3)},${y2.toFixed(3)}`;
}

/** Exterior outline only — shared cutout edges are not stroked. */
export function heroGridCutoutOutlineSegments(): HeroGridCutoutSegment[] {
  const counts = new Map<string, { segment: HeroGridCutoutSegment; count: number }>();

  for (const path of heroGridCutoutPaths) {
    for (const segment of parsePath(path)) {
      const key = segmentKey(segment);
      const existing = counts.get(key);

      if (existing) {
        existing.count += 1;
        continue;
      }

      counts.set(key, { segment: normalizeSegment(segment), count: 1 });
    }
  }

  return [...counts.values()]
    .filter(({ count }) => count === 1)
    .map(({ segment }) => segment);
}
