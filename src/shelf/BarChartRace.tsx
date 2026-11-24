"use client";
import { useEffect, useState } from "react";
/** BarChartRace — bars re-rank as values change, sliding to their new rows on a transform transition while widths animate. React only. */
const NAMES = ["Java", "SQL", "React", "Node", "Python", "Go"];
export default function BarChartRace() {
  const [v, setV] = useState(() => NAMES.map((_, i) => 30 + i * 9));
  useEffect(() => { const t = setInterval(() => setV((a) => a.map((x) => Math.max(5, Math.min(100, x + (Math.random() - 0.42) * 22)))), 1100); return () => clearInterval(t); }, []);
  const rank = [...v.keys()].sort((a, b) => v[b] - v[a]);
  return (
    <div className="br2" role="img" aria-label="Bar chart race">
      {NAMES.map((n, i) => (
        <div key={n} className="br2-r" style={{ transform: `translateY(${rank.indexOf(i) * 100}%)` }}>
          <span>{n}</span><i style={{ width: `${v[i]}%`, opacity: 0.5 + v[i] / 200 }} /><b>{Math.round(v[i])}</b>
        </div>
      ))}
      <style dangerouslySetInnerHTML={{ __html: `.br2{position:relative;width:min(420px,100%);height:${NAMES.length * 34}px}.br2-r{position:absolute;left:0;right:0;top:0;height:34px;display:grid;grid-template-columns:54px 1fr 34px;align-items:center;gap:8px;transition:transform .9s cubic-bezier(.22,1,.36,1)}.br2-r span{font:11px var(--f-mono,monospace);text-transform:uppercase;letter-spacing:.05em;color:rgba(255,255,255,.7)}.br2-r i{height:20px;border-radius:5px;background:linear-gradient(90deg,#ea4f16,#f6af60);transition:width 1s cubic-bezier(.22,1,.36,1)}.br2-r b{font:500 14px var(--f-mono,monospace);text-align:right;font-variant-numeric:tabular-nums}` }} />
    </div>
  );
}
