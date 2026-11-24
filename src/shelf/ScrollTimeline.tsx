"use client";
import { useRef, useState } from "react";
/** ScrollTimeline — a vertical line that fills as its container scrolls, with each entry lighting as the fill passes it. Scoped to a scroll box here; point it at the window for a page. React only. */
const E = [["2020", "Started B.Tech, Big Data Analytics"], ["2024", "Joined FINDI Bankit as Software Engineer"], ["2024", "Migrated Struts modules to Spring Boot"], ["2025", "Shipped AEPS onboarding pipeline"], ["2025", "Built the LLM job-assistant platform"], ["Now", "Taking on new projects"]];
export default function ScrollTimeline() {
  const [p, setP] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  return (
    <div ref={box} className="stl" tabIndex={0} aria-label="Timeline, scrollable" onScroll={() => { const b = box.current!; setP(b.scrollTop / Math.max(1, b.scrollHeight - b.clientHeight)); }}>
      <div className="stl-in">
        <i className="stl-l" /><i className="stl-f" style={{ transform: `scaleY(${0.05 + p * 0.95})` }} />
        {E.map(([y, t], k) => (<div key={k} className="stl-e" data-on={p >= k / (E.length - 1) - 0.12}><b>{y}</b><span>{t}</span></div>))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.stl{width:min(360px,100%);height:240px;overflow:auto;border-radius:16px;background:#0c0c0c;border:1px solid rgba(255,255,255,.1);scrollbar-width:thin}.stl-in{position:relative;padding:20px 20px 20px 44px;display:grid;gap:56px}.stl-l,.stl-f{position:absolute;left:21px;top:28px;bottom:28px;width:2px}.stl-l{background:rgba(255,255,255,.12)}.stl-f{background:#ff630f;transform-origin:0 0;transition:transform .15s}.stl-e{position:relative;display:grid;gap:2px;opacity:.35;transition:opacity .4s,transform .5s cubic-bezier(.34,1.56,.64,1)}.stl-e::before{content:"";position:absolute;left:-28px;top:6px;width:10px;height:10px;border-radius:50%;background:#222;border:2px solid #444;transition:background .3s,border-color .3s}.stl-e[data-on="true"]{opacity:1;transform:translateX(4px)}.stl-e[data-on="true"]::before{background:#ff630f;border-color:#ff630f}.stl-e b{font:11px var(--f-mono,monospace);color:#ff630f}.stl-e span{font-size:14px}` }} />
    </div>
  );
}
