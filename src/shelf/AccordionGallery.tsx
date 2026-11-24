"use client";
import { useState } from "react";
/** AccordionGallery — a row of panels where the active one grows and the rest compress, on flex-grow. Hover, tap or arrow keys. React only. */
const P = [["Backend", "linear-gradient(160deg,#ea4f16,#f6af60)"], ["LLM", "linear-gradient(160deg,#1a1a1a,#ff630f 130%)"], ["Data", "linear-gradient(160deg,#b4460a,#000)"], ["UI", "linear-gradient(160deg,#f6af60,#ea4f16 60%,#222)"]];
export default function AccordionGallery() {
  const [a, setA] = useState(0);
  return (
    <div className="ag2" role="tablist" onKeyDown={(e) => { if (e.key === "ArrowRight") setA((x) => (x + 1) % P.length); if (e.key === "ArrowLeft") setA((x) => (x + P.length - 1) % P.length); }}>
      {P.map(([t, bg], i) => (
        <button key={t} role="tab" aria-selected={a === i} className="ag2-p" style={{ flexGrow: a === i ? 4 : 1, background: bg }} onPointerEnter={() => setA(i)} onClick={() => setA(i)}>
          <span>{t}</span>
        </button>
      ))}
      <style dangerouslySetInnerHTML={{ __html: `.ag2{display:flex;gap:8px;width:min(480px,100%);height:240px}.ag2-p{flex-basis:0;min-width:46px;border-radius:18px;position:relative;overflow:hidden;color:#000;transition:flex-grow .7s cubic-bezier(.22,1,.36,1)}.ag2-p span{position:absolute;left:16px;bottom:14px;font:500 26px var(--f-display,system-ui);font-stretch:87.5%;text-transform:uppercase;white-space:nowrap;transition:transform .7s cubic-bezier(.22,1,.36,1)}.ag2-p[aria-selected="false"] span{transform-origin:0 100%;transform:rotate(-90deg) translateX(-100%) translateY(-6px);left:12px;bottom:16px;font-size:20px}` }} />
    </div>
  );
}
