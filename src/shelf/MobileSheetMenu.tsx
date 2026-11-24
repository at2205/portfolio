"use client";
import { useRef, useState } from "react";
/** MobileSheetMenu — a bottom sheet menu: slides up, drags down to dismiss with a velocity-aware threshold, rubber-bands upward, and closes on scrim or Escape. Contained here. React only. */
export default function MobileSheetMenu() {
  const [open, setOpen] = useState(false), [dy, setDy] = useState(0), [drag, setDrag] = useState(false);
  const y0 = useRef(0), t0 = useRef(0);
  const down = (e: React.PointerEvent) => { y0.current = e.clientY; t0.current = performance.now(); setDrag(true); e.currentTarget.setPointerCapture(e.pointerId); };
  const move = (e: React.PointerEvent) => { if (!drag) return; const d = e.clientY - y0.current; setDy(d > 0 ? d : d * 0.2); };
  const up = (e: React.PointerEvent) => { if (!drag) return; setDrag(false); const v = (e.clientY - y0.current) / Math.max(1, performance.now() - t0.current); if (dy > 90 || v > 0.6) setOpen(false); setDy(0); };
  return (
    <div className="ms" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <button className="pill" onClick={() => setOpen(true)}>Menu</button>
      <div className="ms-s" data-open={open} onClick={() => setOpen(false)} />
      <div className="ms-sh" role="dialog" aria-label="Menu" data-open={open} data-drag={drag} style={{ transform: open ? `translateY(${dy}px)` : undefined }}>
        <div className="ms-h" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}><i /></div>
        <ul>{["Projects", "Resources", "About", "Contact"].map((l) => (<li key={l}><a href={`#${l}`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{l}<span>↗</span></a></li>))}</ul>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.ms{position:relative;width:min(300px,100%);height:300px;border-radius:24px;overflow:hidden;background:#0a0a0a;border:1px solid rgba(255,255,255,.1);display:grid;place-items:center}.ms-s{position:absolute;inset:0;background:rgba(0,0,0,.6);opacity:0;visibility:hidden;transition:opacity .35s,visibility 0s .35s}.ms-s[data-open="true"]{opacity:1;visibility:visible;transition:opacity .35s}.ms-sh{position:absolute;left:0;right:0;bottom:0;border-radius:24px 24px 0 0;background:#171717;border-top:1px solid rgba(255,255,255,.14);transform:translateY(105%);transition:transform .55s cubic-bezier(.34,1.2,.64,1)}.ms-sh[data-drag="true"]{transition:none}.ms-sh[data-open="true"]{transform:translateY(0)}.ms-h{padding:12px;display:grid;place-items:center;cursor:grab;touch-action:none}.ms-h i{width:40px;height:4px;border-radius:2px;background:#555}.ms-sh ul{list-style:none;margin:0;padding:0 14px 16px}.ms-sh a{display:flex;justify-content:space-between;padding:14px 8px;font:500 24px var(--f-display,system-ui);font-stretch:87.5%;text-transform:uppercase;border-top:1px solid rgba(255,255,255,.08)}.ms-sh a span{color:#ff630f}` }} />
    </div>
  );
}
