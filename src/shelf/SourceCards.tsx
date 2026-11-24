"use client";
import { useState } from "react";
/** SourceCards — numbered citation cards under an answer; hovering a [n] marker in the text highlights its card and vice versa. React only. */
const S = [["Spring Boot docs", "spring.io"], ["PostgreSQL indexing", "postgresql.org"], ["Playwright guide", "playwright.dev"]];
export default function SourceCards() {
  const [h, setH] = useState<number | null>(null);
  const mark = (n: number) => (<sup className="sc3-m" data-h={h === n} onPointerEnter={() => setH(n)} onPointerLeave={() => setH(null)}>[{n + 1}]</sup>);
  return (
    <div className="sc3">
      <p>Composite indexes cut retrieval time{mark(1)}, and persistent browser sessions keep automation resumable{mark(2)} on top of a service-layered API{mark(0)}.</p>
      <div>{S.map(([t, d], i) => (<a key={t} href="#src" data-h={h === i} onPointerEnter={() => setH(i)} onPointerLeave={() => setH(null)}><b>{i + 1}</b><span>{t}</span><small>{d}</small></a>))}</div>
      <style dangerouslySetInnerHTML={{ __html: `.sc3{width:min(440px,100%);display:grid;gap:14px}.sc3 p{margin:0;font-size:15px;line-height:1.55}.sc3-m{font:11px var(--f-mono,monospace);color:#ff630f;cursor:pointer;padding:0 1px;border-radius:3px;transition:background .2s,color .2s}.sc3-m[data-h="true"]{background:#ff630f;color:#000}.sc3>div{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.sc3 a{display:grid;gap:3px;padding:10px;border-radius:12px;background:#141414;border:1px solid rgba(255,255,255,.1);font-size:12px;transition:transform .35s cubic-bezier(.34,1.56,.64,1),border-color .2s}.sc3 a[data-h="true"]{border-color:#ff630f;transform:translateY(-4px)}.sc3 a b{width:18px;height:18px;border-radius:50%;background:#2a2a2a;display:grid;place-items:center;font:500 10px var(--f-mono,monospace)}.sc3 a[data-h="true"] b{background:#ff630f;color:#000}.sc3 a small{opacity:.5;font-size:10px}@media(max-width:480px){.sc3>div{grid-template-columns:1fr}}` }} />
    </div>
  );
}
