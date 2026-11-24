"use client";
import { useState } from "react";
import { shelfKinds, slugOf, type ShelfItem, type ShelfKind } from "@/lib/shelf";
import { ShelfDemo } from "@/components/ShelfDemo";
import { Reveal } from "@/components/ui";

type Item = ShelfItem & { source: string };

export function ShelfLibrary({ items }: { items: Item[] }) {
  const [kind, setKind] = useState<ShelfKind | "All">("All");
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const shown = items.filter((i) => (kind === "All" || i.kind === kind) && (i.title + i.blurb).toLowerCase().includes(q.toLowerCase()));

  const copy = async (it: Item) => {
    try { await navigator.clipboard.writeText(it.source); }
    catch { const t = document.createElement("textarea"); t.value = it.source; document.body.append(t); t.select(); document.execCommand("copy"); t.remove(); }
    setCopied(it.file);
    setTimeout(() => setCopied((c) => (c === it.file ? null : c)), 1600);
  };

  return (
    <div className="wrap">
      <div className="sl-bar">
        <div className="sl-chips">
          <button className={`chip ${kind === "All" ? "on" : ""}`} onClick={() => setKind("All")}>All {items.length}</button>
          {shelfKinds.map((k) => (
            <button key={k} className={`chip ${kind === k ? "on" : ""}`} onClick={() => setKind(k)}>
              {k} {items.filter((i) => i.kind === k).length}
            </button>
          ))}
        </div>
        <input className="sl-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" aria-label="Search components" />
      </div>

      <div className="sl-grid">
        {shown.map((it) => (
          <Reveal key={it.file}>
            <article className="sl-card" id={it.file.toLowerCase()}>
              <div className="sl-stage"><ShelfDemo file={it.file} /></div>
              <div className="sl-meta">
                <p className="label">{it.kind}</p>
                <h2 className="display sl-t"><a href={`/components/${slugOf(it.file)}`} data-cursor="View code">{it.title}</a></h2>
                <p className="body">{it.blurb}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><button className="pill ghost" onClick={() => copy(it)}>{copied === it.file ? "Copied ✓" : "Copy the component ⧉"}</button><a className="pill ghost" href={`/components/${slugOf(it.file)}`}>View code ↗</a></div>
              </div>
            </article>
          </Reveal>
        ))}
        {!shown.length && <p className="body">Nothing matches.</p>}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sl-bar{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;align-items:center;padding:18px 0;border-block:1px solid var(--rule)}
        .sl-chips{display:flex;gap:8px;flex-wrap:wrap}
        .sl-q{padding:10px 16px;border-radius:999px;background:transparent;border:1px solid var(--rule);color:#fff;font:inherit;font-size:14px;min-width:200px;outline:none}
        .sl-q:focus{border-color:var(--accent)}
        .sl-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(16px,2vw,28px);padding-block:clamp(32px,5vw,72px)}
        .sl-card{border:1px solid var(--rule);border-radius:22px;overflow:hidden;background:#0c0c0c;height:100%;display:flex;flex-direction:column}
        .sl-stage{min-height:300px;display:grid;place-items:center;padding:28px 16px;overflow:hidden;background:radial-gradient(120% 90% at 50% 130%,rgba(255,99,15,.16),transparent 60%),#050505;border-bottom:1px solid var(--rule)}
        .sl-meta{padding:22px;display:grid;gap:10px;align-content:start;justify-items:start}
        .sl-t{font-size:clamp(28px,3vw,44px)}
        .sl-meta .body{font-size:14px}
        @media (max-width:900px){.sl-grid{grid-template-columns:1fr}}
      ` }} />
    </div>
  );
}
