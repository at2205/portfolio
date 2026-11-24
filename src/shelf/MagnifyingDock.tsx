"use client";
import { useRef } from "react";
/** MagnifyingDock — icons scale with their distance from the pointer, with a smooth falloff. React only. */
const ICONS = ["◐", "▲", "●", "■", "✦", "◆"];
export default function MagnifyingDock() {
  const dock = useRef<HTMLDivElement>(null);
  const apply = (x: number | null) => {
    dock.current?.querySelectorAll<HTMLElement>("button").forEach((b) => {
      const r = b.getBoundingClientRect();
      const d = x === null ? 999 : Math.abs(x - (r.left + r.width / 2));
      b.style.setProperty("--s", String(1 + 0.75 * Math.max(0, 1 - d / 110) ** 2));
    });
  };
  return (
    <div ref={dock} className="dk" onPointerMove={(e) => apply(e.clientX)} onPointerLeave={() => apply(null)}>
      {ICONS.map((c, i) => (<button key={i} aria-label={`Item ${i + 1}`}>{c}</button>))}
      <style dangerouslySetInnerHTML={{ __html: `.dk{display:flex;align-items:flex-end;gap:8px;padding:10px 14px;height:76px;border-radius:22px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(10px)}.dk button{width:44px;height:44px;border-radius:12px;background:linear-gradient(160deg,#ea4f16,#f6af60);color:#000;font-size:20px;transform-origin:50% 100%;transform:scale(var(--s,1));transition:transform .18s ease-out}` }} />
    </div>
  );
}
