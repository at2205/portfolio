"use client";
import { useRef } from "react";
/** SpotlightGrid — one spotlight follows the pointer across the whole group, so the border nearest the cursor glows. React only. */
export default function SpotlightGrid() {
  const grid = useRef<HTMLDivElement>(null);
  return (
    <div ref={grid} className="sg" onPointerMove={(e) => {
      grid.current!.querySelectorAll<HTMLElement>(".sg-c").forEach((c) => {
        const b = c.getBoundingClientRect();
        c.style.setProperty("--x", `${e.clientX - b.left}px`);
        c.style.setProperty("--y", `${e.clientY - b.top}px`);
      });
    }}>
      {["Speed", "Safety", "Scale", "Signal"].map((t) => (<div key={t} className="sg-c"><b>{t}</b></div>))}
      <style dangerouslySetInnerHTML={{ __html: `.sg{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:min(380px,100%)}.sg-c{position:relative;height:96px;padding:16px;border-radius:16px;background:#121212;display:flex;align-items:end}.sg-c::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:radial-gradient(160px circle at var(--x,-200px) var(--y,-200px),#ff630f,rgba(255,255,255,.08) 70%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}.sg-c b{font:500 22px var(--f-display,system-ui);font-stretch:87.5%;text-transform:uppercase}` }} />
    </div>
  );
}
