"use client";
import { useEffect, useRef } from "react";
/** VelocityMarquee — scrolling the page speeds it up, leans it into the motion and flips its direction. React only. */
export default function VelocityMarquee({ words = ["Scroll", "faster", "to", "feel", "it"] }: { words?: string[] }) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = el.current!;
    let x = 0, v = 0, dir = 1, last = scrollY, raf = 0;
    const tick = () => {
      const d = scrollY - last;
      last = scrollY;
      v += (d - v) * 0.12;
      if (Math.abs(d) > 0.5) dir = d > 0 ? 1 : -1;
      x -= dir * (1 + Math.min(Math.abs(v), 40) * 0.7);
      const w = node.scrollWidth / 2;
      if (x <= -w) x += w;
      if (x > 0) x -= w;
      node.style.transform = `translateX(${x}px) skewX(${Math.max(-18, Math.min(18, -v * 0.5))}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const row = [...words, ...words, ...words, ...words];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div ref={el} style={{ display: "flex", gap: 32, width: "max-content", fontFamily: "var(--f-display,system-ui)", fontStretch: "87.5%", fontSize: "clamp(36px,6vw,80px)", letterSpacing: "-.04em", textTransform: "uppercase", whiteSpace: "nowrap", willChange: "transform" }}>
        {row.map((w, i) => (
          <span key={i}>{w} <span style={{ color: "#ff630f" }}>✦</span></span>
        ))}
      </div>
    </div>
  );
}
