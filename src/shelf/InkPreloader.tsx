"use client";
import { useState } from "react";
/** InkPreloader — draws its mark as a stroke, fills it, then lifts the whole screen away. SVG + CSS only. React only. */
export default function InkPreloader() {
  const [k, setK] = useState(0);
  return (
    <div style={{ position: "relative", width: "min(320px,100%)", aspectRatio: "16/10", borderRadius: 18, overflow: "hidden", background: "#141414", display: "grid", placeItems: "center" }}>
      <span style={{ font: "500 28px var(--f-display,system-ui)", textTransform: "uppercase" }}>Loaded.</span>
      <div key={k} className="ip">
        <svg viewBox="0 0 100 100" width="84" height="84" aria-hidden="true">
          <path d="M20 80 L50 18 L80 80 M33 58 H67" fill="none" stroke="#ff630f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
        </svg>
      </div>
      <button className="chip" onClick={() => setK((x) => x + 1)} style={{ position: "absolute", bottom: 10, right: 10 }}>Replay</button>
      <style dangerouslySetInnerHTML={{ __html: `.ip{position:absolute;inset:0;background:#0a0a0a;display:grid;place-items:center;animation:ip-lift .8s cubic-bezier(.76,0,.24,1) 2.1s forwards}.ip path{stroke-dasharray:1;stroke-dashoffset:1;animation:ip-d 1.4s ease forwards,ip-f .5s ease 1.4s forwards}@keyframes ip-d{to{stroke-dashoffset:0}}@keyframes ip-f{to{fill:#ff630f}}@keyframes ip-lift{to{transform:translateY(-101%)}}` }} />
    </div>
  );
}
