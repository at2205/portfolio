"use client";
import { useState } from "react";
/** DatePicker — a month grid with keyboard navigation (arrows move by day/week, PageUp/Down by month), today marker and a slide between months. No date library. React only. */
const DOW = ["M", "T", "W", "T", "F", "S", "S"];
export default function DatePicker() {
  const now = new Date();
  const [view, setView] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [sel, setSel] = useState<Date | null>(null), [dir, setDir] = useState(1);
  const first = (view.getDay() + 6) % 7;
  const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const go = (n: number) => { setDir(n); setView(new Date(view.getFullYear(), view.getMonth() + n, 1)); };
  const same = (d: number, o: Date | null) => !!o && o.getFullYear() === view.getFullYear() && o.getMonth() === view.getMonth() && o.getDate() === d;
  const key = (e: React.KeyboardEvent, d: number) => {
    const m: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in m) { e.preventDefault(); const n = new Date(view.getFullYear(), view.getMonth(), d + m[e.key]); if (n.getMonth() !== view.getMonth()) { setDir(m[e.key] > 0 ? 1 : -1); setView(new Date(n.getFullYear(), n.getMonth(), 1)); } setSel(n); setTimeout(() => document.querySelector<HTMLElement>(`.dp [data-d="${n.getDate()}"]`)?.focus(), 0); }
    if (e.key === "PageDown") go(1); if (e.key === "PageUp") go(-1);
  };
  return (
    <div className="dp">
      <header><button aria-label="Previous month" onClick={() => go(-1)}>←</button><b aria-live="polite">{view.toLocaleString("en", { month: "long", year: "numeric" })}</b><button aria-label="Next month" onClick={() => go(1)}>→</button></header>
      <div className="dp-w">{DOW.map((d, i) => (<span key={i}>{d}</span>))}</div>
      <div className="dp-g" key={view.getTime()} style={{ animation: `dp-s${dir > 0 ? "r" : "l"} .4s cubic-bezier(.22,1,.36,1)` }} role="grid">
        {cells.map((d, i) => d === null ? <i key={i} /> : (<button key={i} data-d={d} role="gridcell" aria-selected={same(d, sel)} data-t={same(d, now)} tabIndex={same(d, sel) || (!sel && d === 1) ? 0 : -1} onClick={() => setSel(new Date(view.getFullYear(), view.getMonth(), d))} onKeyDown={(e) => key(e, d)}>{d}</button>))}
      </div>
      <small>{sel ? sel.toDateString() : "Pick a date"}</small>
      <style dangerouslySetInnerHTML={{ __html: `.dp{width:260px;padding:14px;border-radius:18px;background:#141414;border:1px solid rgba(255,255,255,.12);display:grid;gap:8px;overflow:hidden}.dp header{display:flex;justify-content:space-between;align-items:center}.dp header b{font:500 15px var(--f-display,system-ui)}.dp header button{width:30px;height:30px;border-radius:50%;transition:background .2s}.dp header button:hover{background:#262626}.dp-w,.dp-g{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center}.dp-w span{font:10px var(--f-mono,monospace);opacity:.45;padding:4px 0}.dp-g button{aspect-ratio:1;border-radius:50%;font-size:13px;transition:background .2s,transform .3s cubic-bezier(.34,1.56,.64,1)}.dp-g button:hover{background:#262626}.dp-g button[data-t="true"]{box-shadow:inset 0 0 0 1px #ff630f}.dp-g button[aria-selected="true"]{background:#ff630f;color:#000;transform:scale(1.1)}.dp small{font:10px var(--f-mono,monospace);text-transform:uppercase;letter-spacing:.06em;opacity:.6;text-align:center}@keyframes dp-sr{from{opacity:0;transform:translateX(24px)}}@keyframes dp-sl{from{opacity:0;transform:translateX(-24px)}}` }} />
    </div>
  );
}
