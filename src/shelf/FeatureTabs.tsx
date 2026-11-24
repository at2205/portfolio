"use client";
import { useEffect, useState } from "react";
/** FeatureTabs — a tab list that auto-advances with a progress bar on the active tab; hover pauses, click jumps, panels cross-fade. React only. */
const F = [["Fast", "Sub-100ms responses on indexed paths.", "linear-gradient(135deg,#ea4f16,#f6af60)"], ["Safe", "Role-based access and AES-256 at rest.", "linear-gradient(135deg,#111,#ff630f 140%)"], ["Observable", "Logs for every scrape and selector failure.", "linear-gradient(135deg,#b4460a,#000)"]];
export default function FeatureTabs() {
  const [i, setI] = useState(0), [paused, setPaused] = useState(false), [key, setKey] = useState(0);
  useEffect(() => { if (paused) return; const t = setTimeout(() => { setI((x) => (x + 1) % F.length); setKey((k) => k + 1); }, 4000); return () => clearTimeout(t); }, [i, paused, key]);
  return (
    <div className="ft" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div role="tablist" className="ft-l">
        {F.map(([t], k) => (
          <button key={t} role="tab" aria-selected={i === k} onClick={() => { setI(k); setKey((x) => x + 1); }}>
            {t}<i style={{ animation: i === k && !paused ? "ft-p 4s linear forwards" : "none", transform: i === k && paused ? "scaleX(1)" : undefined }} key={`${k}-${key}`} />
          </button>
        ))}
      </div>
      <div className="ft-p">{F.map(([t, d, bg], k) => (<div key={t} role="tabpanel" data-on={i === k} style={{ background: bg }}><p>{d}</p></div>))}</div>
      <style dangerouslySetInnerHTML={{ __html: `.ft{display:grid;grid-template-columns:130px 1fr;gap:12px;width:min(480px,100%)}.ft-l{display:grid;gap:4px;align-content:start}.ft-l button{position:relative;text-align:left;padding:12px 14px;border-radius:10px;font-size:15px;color:rgba(255,255,255,.55);overflow:hidden;transition:color .3s}.ft-l button[aria-selected="true"]{color:#fff;background:#151515}.ft-l i{position:absolute;left:0;bottom:0;height:2px;width:100%;background:#ff630f;transform:scaleX(0);transform-origin:0 50%}.ft-p{position:relative;height:190px}.ft-p>div{position:absolute;inset:0;border-radius:16px;padding:18px;display:flex;align-items:flex-end;color:#000;opacity:0;transform:scale(.97);transition:opacity .5s,transform .6s cubic-bezier(.22,1,.36,1)}.ft-p>div[data-on="true"]{opacity:1;transform:none}.ft-p p{margin:0;font:500 24px/1.05 var(--f-display,system-ui);font-stretch:87.5%;text-transform:uppercase}@keyframes ft-p{to{transform:scaleX(1)}}` }} />
    </div>
  );
}
