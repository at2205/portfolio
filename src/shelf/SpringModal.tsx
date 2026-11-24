"use client";
import { useEffect, useRef, useState } from "react";
/** SpringModal — grows out of the button that opened it with an overshoot, traps focus, closes on Escape or scrim. Contained here; use position:fixed in an app. React only. */
export default function SpringModal() {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const btn = useRef<HTMLButtonElement>(null), box = useRef<HTMLDivElement>(null), wrap = useRef<HTMLDivElement>(null);
  const show = () => { const b = btn.current!.getBoundingClientRect(), w = wrap.current!.getBoundingClientRect(); setOrigin(`${b.left + b.width / 2 - w.left}px ${b.top + b.height / 2 - w.top}px`); setOpen(true); };
  useEffect(() => {
    if (!open) return;
    box.current?.querySelector<HTMLElement>("button")?.focus();
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, [open]);
  return (
    <div ref={wrap} className="sm2">
      <button ref={btn} className="pill" onClick={show}>Open modal</button>
      <div className="sm2-s" data-open={open} onClick={() => setOpen(false)}>
        <div ref={box} role="dialog" aria-modal="true" aria-label="Demo modal" className="sm2-m" style={{ transformOrigin: origin }} onClick={(e) => e.stopPropagation()}>
          <h3>Springs open.</h3><p>It scales from the trigger, not the centre.</p>
          <button className="pill" onClick={() => { setOpen(false); btn.current?.focus(); }}>Done</button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.sm2{position:relative;width:min(420px,100%);height:240px;display:grid;place-items:center;border-radius:20px;overflow:hidden;background:#0a0a0a}.sm2-s{position:absolute;inset:0;display:grid;place-items:center;background:rgba(0,0,0,.6);opacity:0;visibility:hidden;transition:opacity .3s,visibility 0s .3s}.sm2-s[data-open="true"]{opacity:1;visibility:visible;transition:opacity .3s}.sm2-m{width:min(300px,86%);padding:22px;border-radius:20px;background:#161616;border:1px solid rgba(255,255,255,.16);transform:scale(.2);opacity:0;transition:transform .55s cubic-bezier(.34,1.56,.64,1),opacity .25s}.sm2-s[data-open="true"] .sm2-m{transform:none;opacity:1}.sm2-m h3{margin:0 0 6px;font:500 30px var(--f-display,system-ui);font-stretch:87.5%;text-transform:uppercase}.sm2-m p{margin:0 0 16px;color:rgba(255,255,255,.65);font-size:14px}` }} />
    </div>
  );
}
