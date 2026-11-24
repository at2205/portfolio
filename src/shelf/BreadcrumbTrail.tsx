"use client";
import { useState } from "react";
/** BreadcrumbTrail — collapses the middle of a long path into an "…" button that expands it, with each crumb sliding in. Last crumb is the current page. React only. */
const P = ["Home", "Resources", "Components", "Navigation", "Breadcrumb trail"];
export default function BreadcrumbTrail() {
  const [open, setOpen] = useState(false);
  const mid = P.slice(1, -1);
  return (
    <nav aria-label="Breadcrumb" className="bt">
      <ol>
        <li><a href="#home">{P[0]}</a></li>
        {open ? mid.map((m, i) => (<li key={m} style={{ animationDelay: `${i * 70}ms` }} className="bt-in"><a href={`#${m}`}>{m}</a></li>)) : (<li><button aria-label="Show hidden pages" onClick={() => setOpen(true)}>…</button></li>)}
        <li aria-current="page">{P[P.length - 1]}</li>
      </ol>
      {open && <button className="chip" onClick={() => setOpen(false)} style={{ marginTop: 14 }}>Collapse</button>}
      <style dangerouslySetInnerHTML={{ __html: `.bt ol{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:14px}.bt li{display:flex;align-items:center;gap:6px;color:rgba(255,255,255,.55)}.bt li:not(:last-child)::after{content:"/";opacity:.4}.bt a{transition:color .2s}.bt a:hover{color:#ff630f}.bt li[aria-current]{color:#fff}.bt li button:not(.chip){width:28px;height:24px;border-radius:6px;background:#1c1c1c;color:#fff;transition:background .2s}.bt li button:hover{background:#ff630f;color:#000}.bt-in{animation:bt-i .45s cubic-bezier(.34,1.56,.64,1) both}@keyframes bt-i{from{opacity:0;transform:translateX(-10px)}}` }} />
    </nav>
  );
}
