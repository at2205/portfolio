"use client";
import { useEffect, useRef, useState } from "react";
/** LogoCloud — a grid of marks that settle in on scroll and lift individually under the pointer. Swap the text marks for SVGs. React only. */
const MARKS = ["Bankit", "Findi", "m-Swasth", "CAPS", "QuickRail", "NSDL", "iServeU", "AEPS"];
export default function LogoCloud() {
  const ref = useRef<HTMLUListElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.3 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  return (
    <ul ref={ref} className="lc" data-on={on}>
      {MARKS.map((m, i) => (<li key={m} style={{ transitionDelay: `${i * 70}ms` }}>{m}</li>))}
      <style dangerouslySetInnerHTML={{ __html: `.lc{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;width:min(480px,100%)}.lc li{display:grid;place-items:center;height:64px;border:1px solid rgba(255,255,255,.1);border-radius:14px;font:500 15px var(--f-display,system-ui);letter-spacing:-.02em;color:rgba(255,255,255,.6);opacity:0;transform:translateY(16px) scale(.94);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1),color .3s,border-color .3s}.lc[data-on="true"] li{opacity:1;transform:none}.lc[data-on="true"] li:hover{transform:translateY(-5px);color:#fff;border-color:#ff630f;transition-delay:0s}@media(max-width:480px){.lc{grid-template-columns:repeat(2,1fr)}}` }} />
    </ul>
  );
}
