"use client";
import { useEffect, useRef, useState } from "react";
/** ProgressRings — concentric rings that fill with an overshoot, each with its own gradient and a figure that counts up. React only. */
const RINGS = [["Uptime", 99, "#ff630f"], ["Coverage", 82, "#f6af60"], ["Cache", 64, "#ea4f16"]] as const;
export default function ProgressRings() {
  const ref = useRef<SVGSVGElement>(null);
  const [on, setOn] = useState(false);
  const [n, setN] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.5 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!on) return setN(0);
    let raf = 0; const t0 = performance.now();
    const f = (t: number) => { const p = Math.min(1, (t - t0) / 1400); setN(1 - Math.pow(1 - p, 3)); if (p < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [on]);
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
      <svg ref={ref} viewBox="0 0 120 120" width="160" height="160" role="img" aria-label="Progress rings">
        <defs>{RINGS.map(([k, , c]) => (<linearGradient key={k} id={`pr-${k}`}><stop offset="0" stopColor={c} /><stop offset="1" stopColor="#fff" /></linearGradient>))}</defs>
        {RINGS.map(([k, v], i) => {
          const r = 50 - i * 14, C = 2 * Math.PI * r;
          return (<g key={k} transform="rotate(-90 60 60)">
            <circle cx="60" cy="60" r={r} fill="none" stroke="#1d1d1d" strokeWidth="8" />
            <circle cx="60" cy="60" r={r} fill="none" stroke={`url(#pr-${k})`} strokeWidth="8" strokeLinecap="round" strokeDasharray={C}
              style={{ strokeDashoffset: on ? C * (1 - v / 100) : C, transition: `stroke-dashoffset 1.4s cubic-bezier(.34,1.2,.64,1) ${i * 0.15}s` }} />
          </g>);
        })}
      </svg>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
        {RINGS.map(([k, v, c]) => (
          <li key={k} style={{ display: "flex", gap: 10, alignItems: "baseline", fontFamily: "var(--f-mono,monospace)", fontSize: 13 }}>
            <i style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />{k}
            <b style={{ fontFamily: "var(--f-display,system-ui)", fontSize: 22, fontWeight: 500, marginLeft: "auto", fontVariantNumeric: "tabular-nums" }}>{Math.round(v * n)}%</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
