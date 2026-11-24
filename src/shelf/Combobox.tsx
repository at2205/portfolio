"use client";
import { useId, useState } from "react";
/** Combobox — the ARIA 1.2 editable combobox pattern: input + listbox, aria-activedescendant for the highlighted option, Home/End, and a chevron toggle. Selecting commits a value, unlike free-text search. React only. */
const O = ["Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata"];
export default function Combobox() {
  const id = useId();
  const [q, setQ] = useState(""), [val, setVal] = useState<string | null>(null), [open, setOpen] = useState(false), [a, setA] = useState(0);
  const list = O.filter((o) => o.toLowerCase().includes(q.toLowerCase()));
  const commit = (o: string) => { setVal(o); setQ(o); setOpen(false); };
  return (
    <div className="cb2">
      <label htmlFor={id} style={{ font: "11px var(--f-mono,monospace)", textTransform: "uppercase", letterSpacing: ".06em", opacity: 0.6 }}>City</label>
      <div className="cb2-f">
        <input id={id} role="combobox" aria-expanded={open} aria-controls={`${id}-l`} aria-activedescendant={open && list[a] ? `${id}-${a}` : undefined} aria-autocomplete="list" value={q} placeholder="Choose…"
          onChange={(e) => { setQ(e.target.value); setVal(null); setOpen(true); setA(0); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setA((x) => Math.min(list.length - 1, x + 1)); } if (e.key === "ArrowUp") { e.preventDefault(); setA((x) => Math.max(0, x - 1)); } if (e.key === "Home") setA(0); if (e.key === "End") setA(list.length - 1); if (e.key === "Enter" && open && list[a]) { e.preventDefault(); commit(list[a]); } if (e.key === "Escape") setOpen(false); }} />
        <button tabIndex={-1} aria-label="Toggle options" onClick={() => setOpen(!open)} data-o={open}>⌄</button>
      </div>
      <ul id={`${id}-l`} role="listbox" data-open={open}>{list.map((o, i) => (<li key={o} id={`${id}-${i}`} role="option" aria-selected={val === o} data-a={i === a} onMouseDown={(e) => e.preventDefault()} onClick={() => commit(o)} onPointerEnter={() => setA(i)}>{o}{val === o && <span>✓</span>}</li>))}{!list.length && <li className="cb2-n">No matches</li>}</ul>
      <style dangerouslySetInnerHTML={{ __html: `.cb2{position:relative;width:min(300px,100%);height:240px;display:grid;gap:8px;align-content:start}.cb2-f{display:flex;border-radius:12px;background:#141414;border:1px solid rgba(255,255,255,.14);transition:border-color .2s}.cb2-f:focus-within{border-color:#ff630f}.cb2-f input{flex:1;min-width:0;padding:13px 16px;background:none;border:0;color:#fff;font:inherit;outline:none}.cb2-f button{padding:0 14px;transition:transform .35s cubic-bezier(.34,1.56,.64,1)}.cb2-f button[data-o="true"]{transform:rotate(180deg)}.cb2 ul{list-style:none;margin:0;padding:6px;border-radius:12px;background:#171717;border:1px solid rgba(255,255,255,.12);max-height:160px;overflow:auto;opacity:0;visibility:hidden;transform:translateY(-6px) scale(.98);transform-origin:50% 0;transition:opacity .2s,transform .35s cubic-bezier(.34,1.4,.64,1),visibility 0s .2s}.cb2 ul[data-open="true"]{opacity:1;visibility:visible;transform:none;transition:opacity .2s,transform .35s cubic-bezier(.34,1.4,.64,1)}.cb2 li{display:flex;justify-content:space-between;padding:9px 12px;border-radius:8px;cursor:pointer;font-size:14px}.cb2 li[data-a="true"]{background:#262626}.cb2 li span{color:#ff630f}.cb2-n{opacity:.5;cursor:default!important}` }} />
    </div>
  );
}
