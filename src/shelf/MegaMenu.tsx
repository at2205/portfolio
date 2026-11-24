"use client";
import { useRef, useState } from "react";
/** MegaMenu — a nav whose panel opens under the hovered item with hover-intent (a short close delay so the pointer can cross the gap), keyboard support and a sliding highlight. React only. */
const M: Record<string, [string, string][]> = {
  Work: [["Projects", "Everything shipped"], ["Case studies", "How it was built"], ["Open source", "Code to take"]],
  Learn: [["Resources", "Nine deep dives"], ["Components", "A shelf to copy"], ["Writing", "Practical notes"]],
};
export default function MegaMenu() {
  const [o, setO] = useState<string | null>(null);
  const t = useRef<ReturnType<typeof setTimeout>>();
  const open = (k: string) => { clearTimeout(t.current); setO(k); };
  const close = () => { clearTimeout(t.current); t.current = setTimeout(() => setO(null), 160); };
  return (
    <div className="mn" onKeyDown={(e) => e.key === "Escape" && setO(null)} onPointerLeave={close}>
      <div className="mn-b">
        {Object.keys(M).map((k) => (<button key={k} aria-expanded={o === k} onPointerEnter={() => open(k)} onFocus={() => open(k)} onClick={() => setO(o === k ? null : k)}>{k}<i aria-hidden="true">⌄</i></button>))}
        <a href="#contact" className="mn-c">Contact</a>
      </div>
      <div className="mn-p" data-open={!!o} onPointerEnter={() => o && open(o)}>
        {Object.entries(M).map(([k, items]) => (<ul key={k} data-on={o === k}>{items.map(([l, d]) => (<li key={l}><a href={`#${l}`} tabIndex={o === k ? 0 : -1}><b>{l}</b><small>{d}</small></a></li>))}</ul>))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.mn{position:relative;width:min(400px,100%);height:250px}.mn-b{display:flex;gap:4px;padding:6px;border-radius:999px;background:#141414;border:1px solid rgba(255,255,255,.12);width:max-content}.mn-b button,.mn-c{padding:10px 16px;border-radius:999px;font-size:14px;display:flex;gap:6px;align-items:center;transition:background .25s}.mn-b button:hover,.mn-b button[aria-expanded="true"]{background:#242424}.mn-b i{font-style:normal;transition:transform .3s}.mn-b button[aria-expanded="true"] i{transform:rotate(180deg)}.mn-c{color:#ff630f}.mn-p{position:absolute;left:0;right:0;top:58px;min-height:140px;border-radius:20px;background:#141414;border:1px solid rgba(255,255,255,.14);padding:10px;opacity:0;visibility:hidden;transform:translateY(-8px) scale(.98);transform-origin:20% 0;transition:opacity .25s,transform .45s cubic-bezier(.34,1.3,.64,1),visibility 0s .25s}.mn-p[data-open="true"]{opacity:1;visibility:visible;transform:none;transition:opacity .25s,transform .45s cubic-bezier(.34,1.3,.64,1)}.mn-p ul{list-style:none;margin:0;padding:0;display:none}.mn-p ul[data-on="true"]{display:grid;gap:2px;animation:mn-i .35s cubic-bezier(.22,1,.36,1)}.mn-p a{display:grid;padding:10px 12px;border-radius:12px;transition:background .2s}.mn-p a:hover{background:#222}.mn-p b{font-weight:500}.mn-p small{opacity:.55}@keyframes mn-i{from{opacity:0;transform:translateX(8px)}}` }} />
    </div>
  );
}
