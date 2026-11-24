"use client";
import { useRef } from "react";
/** TiltCard — tilts toward the pointer in three dimensions, with a specular highlight tracking across its face. React only. */
export default function TiltCard() {
  const card = useRef<HTMLDivElement>(null);
  return (
    <div style={{ perspective: 800 }}>
      <div ref={card} className="tc"
        onPointerMove={(e) => {
          const el = card.current!, b = el.getBoundingClientRect();
          const x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
          el.style.transform = `rotateY(${(x - 0.5) * 22}deg) rotateX(${(0.5 - y) * 22}deg)`;
          el.style.setProperty("--sx", `${x * 100}%`); el.style.setProperty("--sy", `${y * 100}%`);
        }}
        onPointerLeave={() => (card.current!.style.transform = "")}>
        <small>Tilt</small><b>Card</b>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.tc{position:relative;width:220px;height:280px;border-radius:22px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;background:linear-gradient(160deg,#ea4f16,#f6af60 70%);color:#000;transition:transform .4s cubic-bezier(.22,1,.36,1);transform-style:preserve-3d;overflow:hidden}.tc::after{content:"";position:absolute;inset:0;background:radial-gradient(200px circle at var(--sx,50%) var(--sy,0%),rgba(255,255,255,.55),transparent 60%);mix-blend-mode:soft-light}.tc small{font:11px var(--f-mono,monospace);text-transform:uppercase;letter-spacing:.06em}.tc b{font:500 48px var(--f-display,system-ui);font-stretch:87.5%;text-transform:uppercase;letter-spacing:-.04em}` }} />
    </div>
  );
}
