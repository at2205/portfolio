"use client";
import { useEffect, useState } from "react";
/** CounterCurtainPreloader — a counter climbs 0→100 over the page, then the curtain splits and lifts away. Replace the timer with real load progress. React only. */
export default function CounterCurtainPreloader() {
  const [n, setN] = useState(0), [k, setK] = useState(0);
  useEffect(() => {
    setN(0);
    const t0 = performance.now(); let raf = 0;
    const f = (t: number) => { const p = Math.min(1, (t - t0) / 2200); setN(Math.round((1 - Math.pow(1 - p, 2.2)) * 100)); if (p < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [k]);
  return (
    <div className="cc2">
      <p>Ready.</p>
      <div className="cc2-c" data-done={n === 100}><i /><i /><b>{String(n).padStart(3, "0")}</b></div>
      <button className="chip" onClick={() => setK((x) => x + 1)} style={{ position: "absolute", right: 10, bottom: 10, zIndex: 5 }}>Replay</button>
      <style dangerouslySetInnerHTML={{ __html: `.cc2{position:relative;width:min(360px,100%);aspect-ratio:16/10;border-radius:18px;overflow:hidden;background:#141414;display:grid;place-items:center}.cc2 p{margin:0;font:500 34px var(--f-display,system-ui);text-transform:uppercase}.cc2-c{position:absolute;inset:0}.cc2-c i{position:absolute;left:0;right:0;height:50%;background:#0a0a0a;transition:transform .9s cubic-bezier(.76,0,.24,1) .25s}.cc2-c i:first-child{top:0}.cc2-c i:nth-child(2){bottom:0}.cc2-c[data-done="true"] i:first-child{transform:translateY(-101%)}.cc2-c[data-done="true"] i:nth-child(2){transform:translateY(101%)}.cc2-c b{position:absolute;left:16px;bottom:8px;font:500 64px var(--f-display,system-ui);font-stretch:87.5%;font-variant-numeric:tabular-nums;color:#ff630f;transition:opacity .3s}.cc2-c[data-done="true"] b{opacity:0}` }} />
    </div>
  );
}
