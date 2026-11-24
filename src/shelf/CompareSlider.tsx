"use client";
import { useRef, useState } from "react";
/** CompareSlider — a before/after reveal on one handle: pointer drag, touch, and arrow keys. Swap the two layers for images. React only. */
export default function CompareSlider() {
  const [p, setP] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const at = (x: number) => { const b = box.current!.getBoundingClientRect(); setP(Math.max(0, Math.min(100, ((x - b.left) / b.width) * 100))); };
  return (
    <div ref={box} className="cs" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); at(e.clientX); }} onPointerMove={(e) => e.buttons && at(e.clientX)}>
      <div className="cs-a">After</div>
      <div className="cs-b" style={{ clipPath: `inset(0 ${100 - p}% 0 0)` }}>Before</div>
      <button className="cs-h" role="slider" aria-label="Compare" aria-valuenow={Math.round(p)} aria-valuemin={0} aria-valuemax={100} style={{ left: `${p}%` }}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") setP((v) => Math.max(0, v - 5)); if (e.key === "ArrowRight") setP((v) => Math.min(100, v + 5)); }}>↔</button>
      <style dangerouslySetInnerHTML={{ __html: `.cs{position:relative;width:min(420px,100%);aspect-ratio:16/10;border-radius:18px;overflow:hidden;touch-action:none;cursor:ew-resize;user-select:none}.cs-a,.cs-b{position:absolute;inset:0;display:grid;place-items:center;font:500 44px var(--f-display,system-ui);font-stretch:87.5%;text-transform:uppercase;letter-spacing:-.04em}.cs-a{background:linear-gradient(135deg,#ea4f16,#f6af60);color:#000}.cs-b{background:linear-gradient(135deg,#111,#2a2a2a);color:#fff}.cs-h{position:absolute;top:50%;width:42px;height:42px;margin:-21px 0 0 -21px;border-radius:50%;background:#fff;color:#000;display:grid;place-items:center;box-shadow:0 4px 18px rgba(0,0,0,.4)}` }} />
    </div>
  );
}
