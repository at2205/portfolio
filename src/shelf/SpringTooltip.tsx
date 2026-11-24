"use client";
import { useRef, useState } from "react";
/** SpringTooltip — springs out from its trigger and flips to the other side when it would leave the viewport. React only. */
export default function SpringTooltip({ tip = "Springs out of the trigger" }: { tip?: string }) {
  const [open, setOpen] = useState(false);
  const [below, setBelow] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const show = () => { setBelow(btn.current!.getBoundingClientRect().top < 90); setOpen(true); };
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <button ref={btn} className="chip" aria-describedby="tt" onPointerEnter={show} onPointerLeave={() => setOpen(false)} onFocus={show} onBlur={() => setOpen(false)} style={{ height: 40, padding: "0 18px" }}>Hover or focus</button>
      <span id="tt" role="tooltip" className="tt" data-open={open} data-below={below}>{tip}</span>
      <style dangerouslySetInnerHTML={{ __html: `.tt{position:absolute;left:50%;bottom:calc(100% + 10px);padding:8px 12px;border-radius:10px;background:#fff;color:#000;font-size:13px;white-space:nowrap;pointer-events:none;opacity:0;transform:translateX(-50%) translateY(8px) scale(.6);transform-origin:50% 100%;transition:transform .45s cubic-bezier(.34,1.56,.64,1),opacity .2s}.tt[data-below="true"]{bottom:auto;top:calc(100% + 10px);transform-origin:50% 0;transform:translateX(-50%) translateY(-8px) scale(.6)}.tt[data-open="true"]{opacity:1;transform:translateX(-50%) scale(1)}` }} />
    </span>
  );
}
