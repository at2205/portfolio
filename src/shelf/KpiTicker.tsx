"use client";
import { useEffect, useState } from "react";
/** KpiTicker — a row of figures that tick to new values, each carrying its own direction and a sparkline that redraws with it. React only. */
const seed = () => [
  { k: "Requests", v: 10400, h: [8, 9, 9, 10, 10.4] },
  { k: "Latency ms", v: 142, h: [190, 170, 160, 150, 142] },
  { k: "Errors", v: 12, h: [30, 22, 18, 15, 12] },
];
export default function KpiTicker() {
  const [d, setD] = useState(seed);
  useEffect(() => {
    const t = setInterval(() => setD((a) => a.map((x) => {
      const nv = Math.max(1, Math.round(x.v * (1 + (Math.random() - 0.48) * 0.12)));
      return { ...x, v: nv, h: [...x.h.slice(1), nv / (x.v / x.h[4])] };
    })), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="kp">
      {d.map((x) => {
        const up = x.h[4] >= x.h[3];
        const lo = Math.min(...x.h), hi = Math.max(...x.h);
        const pts = x.h.map((y, i) => `${i * 22},${28 - ((y - lo) / (hi - lo || 1)) * 24}`).join(" ");
        return (
          <div key={x.k} className="kp-c">
            <small>{x.k}</small>
            <b>{x.v.toLocaleString()}</b>
            <span style={{ color: up ? "#ff630f" : "#8bd17c" }}>{up ? "▲" : "▼"}</span>
            <svg viewBox="0 0 88 30" width="88" height="30" aria-hidden="true"><polyline points={pts} fill="none" stroke={up ? "#ff630f" : "#8bd17c"} strokeWidth="2" strokeLinejoin="round" style={{ transition: "all .6s" }} /></svg>
          </div>
        );
      })}
      <style dangerouslySetInnerHTML={{ __html: `.kp{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:min(480px,100%)}.kp-c{position:relative;padding:14px;border-radius:14px;background:#141414;border:1px solid rgba(255,255,255,.1);display:grid;gap:4px}.kp-c small{font:10px var(--f-mono,monospace);text-transform:uppercase;letter-spacing:.06em;opacity:.55}.kp-c b{font:500 26px var(--f-display,system-ui);font-stretch:87.5%;font-variant-numeric:tabular-nums}.kp-c>span{position:absolute;right:12px;top:12px;font-size:11px}` }} />
    </div>
  );
}
