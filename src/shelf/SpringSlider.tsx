"use client";
import { useState } from "react";
/** SpringSlider — a range slider whose value bubble stretches as it moves and settles when it stops. Built on a native range input. React only. */
export default function SpringSlider() {
  const [v, setV] = useState(40);
  const [drag, setDrag] = useState(false);
  return (
    <div style={{ width: "min(360px,80vw)", padding: "44px 0 8px" }}>
      <div style={{ position: "relative" }}>
        <span className="ss-b" data-drag={drag} style={{ left: `calc(${v}% + ${(0.5 - v / 100) * 24}px)` }}>{v}</span>
        <input type="range" min={0} max={100} value={v} aria-label="Value" onChange={(e) => setV(+e.target.value)}
          onPointerDown={() => setDrag(true)} onPointerUp={() => setDrag(false)} className="ss"
          style={{ background: `linear-gradient(90deg,#ff630f ${v}%,#2a2a2a ${v}%)` }} />
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.ss{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:99px;outline:none}.ss::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.5);transition:transform .35s cubic-bezier(.34,1.56,.64,1)}.ss:active::-webkit-slider-thumb{transform:scale(1.25)}.ss::-moz-range-thumb{width:24px;height:24px;border:0;border-radius:50%;background:#fff}.ss-b{position:absolute;top:-38px;transform:translateX(-50%) scale(.9);min-width:38px;text-align:center;padding:4px 8px;border-radius:999px;background:#ff630f;color:#000;font-family:var(--f-mono,monospace);font-size:12px;transition:transform .45s cubic-bezier(.34,1.56,.64,1)}.ss-b[data-drag="true"]{transform:translateX(-50%) scale(1.15,1.3) translateY(-3px)}` }} />
    </div>
  );
}
