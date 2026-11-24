"use client";
import { useRef } from "react";
/** WeightHover — variable-weight type thickens under the pointer and thins behind it, falling off with distance. Needs a variable font. React only. */
export default function WeightHover({ text = "Weight under the pointer" }: { text?: string }) {
  const box = useRef<HTMLParagraphElement>(null);
  const apply = (px: number | null) => {
    box.current?.querySelectorAll<HTMLElement>("i").forEach((el) => {
      const b = el.getBoundingClientRect();
      const d = px === null ? 999 : Math.abs(px - (b.left + b.width / 2));
      el.style.fontWeight = String(Math.round(200 + 700 * Math.max(0, 1 - d / 140)));
    });
  };
  return (
    <p ref={box} aria-label={text} onPointerMove={(e) => apply(e.clientX)} onPointerLeave={() => apply(null)}
      style={{ margin: 0, fontFamily: "var(--f-display,system-ui)", fontStretch: "87.5%", fontSize: "clamp(34px,5vw,68px)", letterSpacing: "-.03em", lineHeight: 1.05, textTransform: "uppercase" }}>
      {[...text].map((c, i) => (
        <i key={i} aria-hidden="true" style={{ fontStyle: "normal", fontWeight: 200, transition: "font-weight .25s" }}>{c === " " ? " " : c}</i>
      ))}
    </p>
  );
}
