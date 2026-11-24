"use client";
import { useRef, useState } from "react";
/** LineChart — an SVG line that draws itself in, with a crosshair and value readout that snap to the nearest point. No chart library. React only. */
const D = [12, 18, 15, 26, 22, 34, 30, 42, 38, 51, 47, 60];
export default function LineChart() {
  const [h, setH] = useState<number | null>(null);
  const svg = useRef<SVGSVGElement>(null);
  const W = 420, H = 180, P = 14, max = 64;
  const x = (i: number) => P + (i * (W - P * 2)) / (D.length - 1), y = (v: number) => H - P - (v / max) * (H - P * 2);
  const pts = D.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  return (
    <div style={{ width: "min(440px,100%)" }}>
      <svg ref={svg} viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Line chart" style={{ touchAction: "none" }}
        onPointerMove={(e) => { const b = svg.current!.getBoundingClientRect(); const px = ((e.clientX - b.left) / b.width) * W; setH(Math.max(0, Math.min(D.length - 1, Math.round(((px - P) / (W - P * 2)) * (D.length - 1))))); }} onPointerLeave={() => setH(null)}>
        <defs><linearGradient id="lc-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff630f" stopOpacity=".35" /><stop offset="1" stopColor="#ff630f" stopOpacity="0" /></linearGradient></defs>
        {[0, 1, 2, 3].map((g) => (<line key={g} x1={P} x2={W - P} y1={P + g * ((H - P * 2) / 3)} y2={P + g * ((H - P * 2) / 3)} stroke="rgba(255,255,255,.08)" />))}
        <polygon points={`${x(0)},${H - P} ${pts} ${x(D.length - 1)},${H - P}`} fill="url(#lc-g)" style={{ animation: "lc-f 1.2s ease .6s both" }} />
        <polyline points={pts} fill="none" stroke="#ff630f" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" pathLength={1} style={{ strokeDasharray: 1, animation: "lc-d 1.6s cubic-bezier(.22,1,.36,1) both" }} />
        {h !== null && (<g><line x1={x(h)} x2={x(h)} y1={P} y2={H - P} stroke="rgba(255,255,255,.3)" strokeDasharray="3 3" /><circle cx={x(h)} cy={y(D[h])} r="5" fill="#fff" stroke="#ff630f" strokeWidth="2" /></g>)}
      </svg>
      <small style={{ font: "11px var(--f-mono,monospace)", letterSpacing: ".06em", textTransform: "uppercase", opacity: 0.6 }}>{h === null ? "Hover the chart" : `Week ${h + 1} · ${D[h]}k`}</small>
      <style dangerouslySetInnerHTML={{ __html: `@keyframes lc-d{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}@keyframes lc-f{from{opacity:0}}` }} />
    </div>
  );
}
