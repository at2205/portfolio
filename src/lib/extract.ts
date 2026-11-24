// Reads a component's own source to document it — props with defaults, and the theme tokens it reads.
// Server-side only: it runs at build time on the same text the code viewer shows.

export type Prop = { name: string; def?: string };
export type Token = { name: string; fallback?: string; meaning: string };

/** Pull `{ a, b = 1 }` out of `export default function X({ a, b = 1 }: ...)`. */
export function extractProps(src: string): Prop[] {
  const m = src.match(/export default function \w+\s*\(\s*\{/);
  if (!m || m.index === undefined) return [];
  let i = m.index + m[0].length, depth = 1, buf = "";
  for (; i < src.length && depth > 0; i++) {
    const c = src[i];
    if (c === "{" || c === "[" || c === "(") depth++;
    if (c === "}" || c === "]" || c === ")") depth--;
    if (depth > 0) buf += c;
  }
  const parts: string[] = [];
  let d = 0, cur = "", q = "";
  for (const c of buf) {
    if (q) { cur += c; if (c === q) q = ""; continue; }
    if (c === '"' || c === "'" || c === "`") { q = c; cur += c; continue; }
    if ("{[(".includes(c)) d++;
    if ("}])".includes(c)) d--;
    if (c === "," && d === 0) { parts.push(cur); cur = ""; } else cur += c;
  }
  if (cur.trim()) parts.push(cur);
  return parts
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const eq = p.indexOf("=");
      return eq < 0 ? { name: p } : { name: p.slice(0, eq).trim(), def: p.slice(eq + 1).trim() };
    });
}

const MEANING: Record<string, string> = {
  "--accent": "The accent colour: highlights, active states, glows.",
  "--f-display": "Display face for big type (a condensed variable font reads best).",
  "--f-mono": "Monospace face for small labels and readouts.",
  "--f-text": "Body face.",
  "--e": "Easing curve for ordinary transitions.",
  "--e-out": "Easing curve for entrances (fast start, soft landing).",
  "--edge": "Page gutter, used to align with the rest of the layout.",
  "--sunset": "The brand gradient (black to orange to gold).",
  "--rule": "Hairline border colour.",
  "--muted": "Secondary text colour.",
  "--soft": "Body text colour on dark.",
};

/** Theme tokens read through var(--x, fallback) — the part you re-skin to match your own site. */
export function extractTokens(src: string): Token[] {
  const seen = new Map<string, Token>();
  for (const m of src.matchAll(/var\((--[a-z0-9-]+)\s*(?:,\s*([^)]*(?:\([^)]*\))?[^)]*))?\)/gi)) {
    const name = m[1];
    if (!MEANING[name] || seen.has(name)) continue;
    seen.set(name, { name, fallback: m[2]?.trim() || undefined, meaning: MEANING[name] });
  }
  return [...seen.values()];
}
