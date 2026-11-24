"use client";
import { useEffect, useRef, useState } from "react";
/** StatCards — cards whose figures count up when scrolled into view, each with a delta chip. Easing is ease-out cubic; the unit stays put. React only. */
const S = [["Daily transactions", 10000, "+", "K", "▲ 12%"], ["Faster retrieval", 35, "", "%", "▲ 35%"], ["Jobs scored", 152, "", "", "▲ 40"]] as const;
export default function StatCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (!e.isIntersecting) return setT(0);
      const t0 = performance.now();
      const f = (n: number) => { const p = Math.min(1, (n - t0) / 1600); setT(1 - Math.pow(1 - p, 3)); if (p < 1) raf = requestAnimationFrame(f); };
      raf = requestAnimationFrame(f);
    }, { threshold: 0.6 });
    io.observe(ref.current!);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className="st2">
      {S.map(([l, v, , u, d]) => (
        <div key={l}><small>{l}</small><b>{u === "K" ? Math.round((v * t) / 1000) : Math.round(v * t)}<em>{u === "K" ? "K+" : u}</em></b><span>{d}</span></div>
      ))}
      <style dangerouslySetInnerHTML={{ __html: `.st2{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:min(480px,100%)}.st2>div{padding:16px;border-radius:16px;background:#141414;border:1px solid rgba(255,255,255,.1);display:grid;gap:6px;transition:transform .4s cubic-bezier(.34,1.56,.64,1),border-color .3s}.st2>div:hover{transform:translateY(-4px);border-color:#ff630f}.st2 small{font:10px var(--f-mono,monospace);text-transform:uppercase;letter-spacing:.06em;opacity:.55}.st2 b{font:500 38px/1 var(--f-display,system-ui);font-stretch:87.5%;font-variant-numeric:tabular-nums}.st2 em{font-style:normal;font-size:.55em;color:#ff630f;margin-left:2px}.st2 span{justify-self:start;font:10px var(--f-mono,monospace);padding:3px 8px;border-radius:99px;background:rgba(255,99,15,.15);color:#ff8a3d}@media(max-width:480px){.st2{grid-template-columns:1fr}}` }} />
    </div>
  );
}
