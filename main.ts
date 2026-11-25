// The Long Roast: Lawmakers and the File They Cannot Convert
// Writes one satirical sentence to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22, standard library only. No trailing newline in the output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Congress is ready to regulate artificial intelligence, cryptocurrency and the entire internet, yet it still cannot turn a Word document into a PDF without summoning an intern named Kevin.";

// Gate: the entry must be 1-320 characters, a single line, not whitespace-only.
// Returns null when the text passes, otherwise a short reason it failed.
const MIN_CHARS = 1;
const MAX_CHARS = 320;

function gateFailure(text) {
  const length = Array.from(text).length;
  if (length < MIN_CHARS) return "entry is empty";
  if (length > MAX_CHARS) return `entry is ${length} characters, over the ${MAX_CHARS} limit`;
  if (/[\r\n]/.test(text)) return "entry spans more than one line";
  if (text.trim() === "") return "entry is only whitespace";
  return null;
}

const failure = gateFailure(ENTRY);
if (failure !== null) {
  throw new Error(`Entry fails the gate: ${failure}.`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
