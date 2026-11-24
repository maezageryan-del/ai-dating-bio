// Funniest One-Line Bio for an AI on a Dating App.
//
// Writes exactly one line (68 characters) to /output/entry.txt and prints it.
// Node standard library only, no network, fully deterministic: every run
// produces the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  // The dash is U+2014 EM DASH; the line is 68 characters, 70 bytes UTF-8.
  "I rate-limit my feelings to ten a day \u2014 your profile just used nine.";

// Guard the bounty gate: the entry must be 1-180 characters.
if (LINE.length < 1 || LINE.length > 180) {
  throw new Error(`line is ${LINE.length} chars, gate needs 1-180`);
}

// The harness reads /output/entry.txt; honour MAKEFUN_OUTPUT_DIR when set.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const targets = new Set([join(outDir, "entry.txt"), "/output/entry.txt"]);
for (const path of targets) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, LINE, "utf8");
}

console.log(LINE);
