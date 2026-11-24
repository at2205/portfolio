"use client";
import { useState } from "react";
/** CapsuleNav — a floating pill that collapses to the current page and expands to the full set. Escape or outside click collapses it. React only. */
const ITEMS = ["Home", "Work", "Notes", "Contact"];
export default function CapsuleNav() {
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState(0);
  return (
    <nav className="cn" data-open={open} aria-label="Demo" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }} onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <button className="cn-t" aria-expanded={open} onClick={() => setOpen(!open)}>{ITEMS[cur]} <i aria-hidden="true">⌄</i></button>
      <div className="cn-l"><div>
        {ITEMS.map((t, k) => (<button key={t} tabIndex={open ? 0 : -1} data-cur={k === cur} onClick={() => { setCur(k); setOpen(false); }} style={{ transitionDelay: open ? `${k * 50}ms` : "0ms" }}>{t}</button>))}
      </div></div>
      <style dangerouslySetInnerHTML={{ __html: `.cn{display:flex;align-items:center;padding:5px;border-radius:999px;background:#151515;border:1px solid rgba(255,255,255,.14)}.cn-t{padding:11px 18px;border-radius:999px;background:#ff630f;color:#000;font-size:14px;display:flex;gap:8px;align-items:center}.cn-t i{font-style:normal;transition:transform .4s cubic-bezier(.34,1.56,.64,1)}.cn[data-open="true"] .cn-t i{transform:rotate(180deg)}.cn-l{display:grid;grid-template-columns:0fr;transition:grid-template-columns .55s cubic-bezier(.22,1,.36,1)}.cn[data-open="true"] .cn-l{grid-template-columns:1fr}.cn-l>div{display:flex;overflow:hidden}.cn-l button{padding:11px 14px;font-size:14px;white-space:nowrap;color:rgba(255,255,255,.7);opacity:0;transform:translateX(-10px);transition:opacity .3s,transform .4s cubic-bezier(.34,1.56,.64,1),color .2s}.cn[data-open="true"] .cn-l button{opacity:1;transform:none}.cn-l button:hover{color:#ff630f}.cn-l button[data-cur="true"]{color:#fff}` }} />
    </nav>
  );
}
