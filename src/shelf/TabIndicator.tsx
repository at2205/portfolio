"use client";
import { useLayoutEffect, useRef, useState } from "react";
/** TabIndicator — a pill that slides and stretches between tabs; labels re-ink as it passes. Measures real offsets, so any label width works. React only. */
const TABS = ["Overview", "Activity", "Billing", "Settings"];
export default function TabIndicator() {
  const [i, setI] = useState(0);
  const [box, setBox] = useState({ x: 0, w: 0 });
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  useLayoutEffect(() => {
    const el = refs.current[i]!;
    setBox({ x: el.offsetLeft, w: el.offsetWidth });
  }, [i]);
  return (
    <div className="ti" role="tablist">
      <i style={{ transform: `translateX(${box.x}px)`, width: box.w }} />
      {TABS.map((t, k) => (
        <button key={t} ref={(el) => { refs.current[k] = el; }} role="tab" aria-selected={i === k} onClick={() => setI(k)}
          onKeyDown={(e) => { if (e.key === "ArrowRight") setI((i + 1) % TABS.length); if (e.key === "ArrowLeft") setI((i + TABS.length - 1) % TABS.length); }}>{t}</button>
      ))}
      <style dangerouslySetInnerHTML={{ __html: `.ti{position:relative;display:flex;padding:4px;border-radius:999px;background:#141414;border:1px solid rgba(255,255,255,.12)}.ti i{position:absolute;top:4px;bottom:4px;left:0;border-radius:999px;background:#ff630f;transition:transform .55s cubic-bezier(.34,1.3,.64,1),width .55s cubic-bezier(.34,1.3,.64,1)}.ti button{position:relative;padding:10px 16px;font-size:14px;color:rgba(255,255,255,.65);transition:color .3s .1s}.ti button[aria-selected="true"]{color:#000}@media(max-width:480px){.ti button{padding:10px 10px;font-size:12px}}` }} />
    </div>
  );
}
