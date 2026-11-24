"use client";
import { useRef, useState } from "react";
/** SharedElementLightbox — the clicked tile becomes the lightbox: its box is measured, the overlay starts there and animates to centre (FLIP), and back on close. React only. */
const T = ["#ea4f16", "#ff630f", "#f6af60", "#b4460a"];
export default function SharedElementLightbox() {
  const wrap = useRef<HTMLDivElement>(null), ov = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null), [rect, setRect] = useState<DOMRect | null>(null), [on, setOn] = useState(false);
  const show = (i: number, el: HTMLElement) => {
    const w = wrap.current!.getBoundingClientRect(), r = el.getBoundingClientRect();
    setRect(new DOMRect(r.left - w.left, r.top - w.top, r.width, r.height)); setOpen(i);
    requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
  };
  const close = () => { setOn(false); setTimeout(() => setOpen(null), 450); };
  const w = 260, h = 200;
  const t = open !== null && rect ? (on ? "translate(-50%,-50%)" : `translate(${rect.x + rect.width / 2 - 0}px,${rect.y + rect.height / 2}px) translate(-50%,-50%) scale(${rect.width / w},${rect.height / h})`) : "";
  return (
    <div ref={wrap} className="sl2" onKeyDown={(e) => e.key === "Escape" && close()}>
      <div className="sl2-g">{T.map((c, i) => (<button key={i} aria-label={`Open image ${i + 1}`} onClick={(e) => show(i, e.currentTarget)} style={{ background: `linear-gradient(150deg,${c},#111 150%)`, opacity: open === i ? 0 : 1 }} />))}</div>
      {open !== null && rect && (
        <div className="sl2-o" data-on={on} onClick={close} role="dialog" aria-modal="true" aria-label="Image preview">
          <div ref={ov} className="sl2-i" style={{ width: w, height: h, left: on ? "50%" : 0, top: on ? "50%" : 0, transform: t, background: `linear-gradient(150deg,${T[open]},#111 150%)` }}><span>{String(open + 1).padStart(2, "0")}</span></div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: `.sl2{position:relative;width:min(380px,100%);height:260px;border-radius:18px;overflow:hidden;background:#0a0a0a}.sl2-g{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px;height:100%}.sl2-g button{border-radius:12px;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}.sl2-g button:hover{transform:scale(1.03)}.sl2-o{position:absolute;inset:0;background:rgba(0,0,0,0);transition:background .45s}.sl2-o[data-on="true"]{background:rgba(0,0,0,.75)}.sl2-i{position:absolute;border-radius:14px;transition:transform .5s cubic-bezier(.22,1,.36,1),left .5s,top .5s;display:flex;align-items:flex-end;padding:14px;color:#000;font:500 48px var(--f-display,system-ui);font-stretch:87.5%}` }} />
    </div>
  );
}
