"use client";
import { useMemo, useState } from "react";
/** SearchSuggest — as-you-type suggestions with the matched part highlighted, arrow-key navigation, Enter to pick and Escape to dismiss. React only. */
const W = ["Spring Boot", "Spring Security", "SQL tuning", "Playwright", "PostgreSQL", "React", "Next.js", "WebRTC", "Socket.io", "Node.js"];
export default function SearchSuggest() {
  const [q, setQ] = useState(""), [sel, setSel] = useState(0), [open, setOpen] = useState(false);
  const hits = useMemo(() => (q ? W.filter((w) => w.toLowerCase().includes(q.toLowerCase())).slice(0, 5) : []), [q]);
  const pick = (w: string) => { setQ(w); setOpen(false); };
  const hl = (w: string) => { const i = w.toLowerCase().indexOf(q.toLowerCase()); return i < 0 ? w : (<>{w.slice(0, i)}<mark>{w.slice(i, i + q.length)}</mark>{w.slice(i + q.length)}</>); };
  return (
    <div className="ss2">
      <input value={q} placeholder="Search skills…" role="combobox" aria-expanded={open && hits.length > 0} aria-controls="ss2-l" aria-autocomplete="list" onChange={(e) => { setQ(e.target.value); setSel(0); setOpen(true); }}
        onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(hits.length - 1, s + 1)); } if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); } if (e.key === "Enter" && hits[sel]) pick(hits[sel]); if (e.key === "Escape") setOpen(false); }} />
      <ul id="ss2-l" role="listbox" data-open={open && hits.length > 0}>{hits.map((w, i) => (<li key={w} role="option" aria-selected={i === sel} onPointerEnter={() => setSel(i)} onMouseDown={() => pick(w)}>{hl(w)}</li>))}</ul>
      <style dangerouslySetInnerHTML={{ __html: `.ss2{position:relative;width:min(340px,100%);height:210px}.ss2 input{width:100%;padding:14px 18px;border-radius:14px;background:#141414;border:1px solid rgba(255,255,255,.14);color:#fff;font:inherit;outline:none;transition:border-color .2s}.ss2 input:focus{border-color:#ff630f}.ss2 ul{list-style:none;margin:6px 0 0;padding:6px;border-radius:14px;background:#171717;border:1px solid rgba(255,255,255,.12);opacity:0;visibility:hidden;transform:translateY(-6px);transition:opacity .2s,transform .35s cubic-bezier(.34,1.4,.64,1),visibility 0s .2s}.ss2 ul[data-open="true"]{opacity:1;visibility:visible;transform:none;transition:opacity .2s,transform .35s cubic-bezier(.34,1.4,.64,1)}.ss2 li{padding:9px 12px;border-radius:9px;cursor:pointer;font-size:14px}.ss2 li[aria-selected="true"]{background:#242424}.ss2 mark{background:none;color:#ff630f;font-weight:600}` }} />
    </div>
  );
}
