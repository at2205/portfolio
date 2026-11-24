"use client";
import { useEffect, useMemo, useRef, useState } from "react";
/** CommandPalette — ⌘K / Ctrl-K palette with fuzzy matching, grouped results, keyboard navigation and a scrim. Rendered inside its frame here; use position:fixed in an app. React only. */
const ITEMS = [
  ["Go to", "Projects"], ["Go to", "Resources"], ["Go to", "About"],
  ["Actions", "Copy email"], ["Actions", "Download resume"], ["Actions", "Start a project"],
];
const fuzzy = (q: string, s: string) => { let i = 0; for (const c of s.toLowerCase()) if (c === q[i]) i++; return i === q.length; };
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const hits = useMemo(() => ITEMS.filter(([, l]) => fuzzy(q.toLowerCase(), l)), [q]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, []);
  useEffect(() => { if (open) { setQ(""); setSel(0); setTimeout(() => input.current?.focus(), 30); } }, [open]);
  const key = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(hits.length - 1, s + 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
    if (e.key === "Enter" && hits[sel]) setOpen(false);
  };
  return (
    <div style={{ position: "relative", width: "100%", minHeight: 300, display: "grid", placeItems: "center" }}>
      <button className="pill" onClick={() => setOpen(true)}>Open <kbd style={{ fontFamily: "var(--f-mono,monospace)", opacity: 0.6 }}>⌘K</kbd></button>
      <div className="cp2" data-open={open} onClick={() => setOpen(false)}>
        <div className="cp2-box" role="dialog" aria-label="Command palette" onClick={(e) => e.stopPropagation()} onKeyDown={key}>
          <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} placeholder="Type a command…" aria-label="Search commands" />
          <ul>
            {hits.map(([g, l], i) => (
              <li key={l} data-sel={i === sel} onMouseEnter={() => setSel(i)} onClick={() => setOpen(false)}>
                <span>{l}</span><small>{g}</small>
              </li>
            ))}
            {!hits.length && <li className="cp2-none">No results</li>}
          </ul>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.cp2{position:absolute;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(3px);display:grid;place-items:start center;padding-top:36px;opacity:0;visibility:hidden;transition:opacity .25s,visibility 0s .25s}.cp2[data-open="true"]{opacity:1;visibility:visible;transition:opacity .25s}.cp2-box{width:min(420px,92%);border:1px solid rgba(255,255,255,.16);border-radius:16px;background:#111;overflow:hidden;transform:translateY(-10px) scale(.97);transition:transform .35s cubic-bezier(.34,1.56,.64,1)}.cp2[data-open="true"] .cp2-box{transform:none}.cp2-box input{width:100%;padding:16px 18px;background:none;border:0;border-bottom:1px solid rgba(255,255,255,.12);color:#fff;font:inherit;outline:none}.cp2-box ul{list-style:none;margin:0;padding:6px}.cp2-box li{display:flex;justify-content:space-between;padding:10px 12px;border-radius:10px;cursor:pointer}.cp2-box li[data-sel="true"]{background:#ff630f;color:#000}.cp2-box small{font-family:var(--f-mono,monospace);font-size:10px;text-transform:uppercase;opacity:.6}.cp2-none{opacity:.5}` }} />
    </div>
  );
}
