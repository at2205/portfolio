"use client";
import { useRef } from "react";
/** BlendCursor — a large disc with mix-blend-mode: difference, inverting whatever it passes over. Scoped to its box here; mount at the root for the whole page. React only. */
export default function BlendCursor() {
  const box = useRef<HTMLDivElement>(null), dot = useRef<HTMLSpanElement>(null);
  return (
    <div ref={box} className="bc" onPointerMove={(e) => { const b = box.current!.getBoundingClientRect(); dot.current!.style.transform = `translate(${e.clientX - b.left}px,${e.clientY - b.top}px) translate(-50%,-50%) scale(1)`; }}
      onPointerLeave={() => (dot.current!.style.transform = "translate(-50%,-50%) scale(0)")}>
      <h3>Invert<br />me</h3>
      <span ref={dot} />
      <style dangerouslySetInnerHTML={{ __html: `.bc{position:relative;width:min(420px,100%);height:230px;display:grid;place-items:center;border-radius:20px;overflow:hidden;background:#0a0a0a;cursor:none}.bc h3{margin:0;font:600 64px/.9 var(--f-display,system-ui);font-stretch:87.5%;text-transform:uppercase;text-align:center;color:#fff}.bc span{position:absolute;left:0;top:0;width:96px;height:96px;border-radius:50%;background:#fff;mix-blend-mode:difference;pointer-events:none;transform:translate(-50%,-50%) scale(0);transition:transform .25s cubic-bezier(.34,1.56,.64,1)}` }} />
    </div>
  );
}
