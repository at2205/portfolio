import type { ReactNode } from "react";

// A small single-pass highlighter for TS/TSX: comments, strings, keywords, numbers and JSX tags. No library.
const RE = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\[\s\S])*`)|\b(import|export|default|from|const|let|var|function|return|if|else|for|while|new|as|type|typeof|void|null|undefined|true|false|await|async|of|in|break|continue|switch|case|throw|try|catch|interface)\b|(\b\d[\d._]*\b)|(<\/?[A-Z][A-Za-z0-9.]*)/g;
const CLS = ["", "tk-c", "tk-s", "tk-k", "tk-n", "tk-t"];

export function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of code.matchAll(RE)) {
    const at = m.index ?? 0;
    if (at > last) out.push(code.slice(last, at));
    const g = m.slice(1).findIndex((x) => x !== undefined) + 1;
    out.push(<span key={k++} className={CLS[g]}>{m[0]}</span>);
    last = at + m[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}
