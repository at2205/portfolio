"use client";
import { useRef } from "react";
/** LiquidGlassPill — a frosted pill with a specular highlight that tracks the pointer. Backdrop blur + two gradients. React only. */
export default function LiquidGlassPill({ label = "Liquid glass" }: { label?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <div style={{ position: "relative", padding: "34px 44px", overflow: "hidden", borderRadius: 24 }}>
      <i style={{ position: "absolute", left: "12%", top: "10%", width: 90, height: 90, borderRadius: "50%", background: "#ff630f", filter: "blur(6px)" }} />
      <i style={{ position: "absolute", right: "10%", bottom: "6%", width: 70, height: 70, borderRadius: "50%", background: "#f6af60", filter: "blur(4px)" }} />
      <button ref={ref} className="lg"
        onPointerMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--hx", `${e.clientX - b.left}px`); e.currentTarget.style.setProperty("--hy", `${e.clientY - b.top}px`); }}>
        {label}
      </button>
      <style dangerouslySetInnerHTML={{ __html: `.lg{position:relative;padding:18px 34px;border-radius:999px;font-size:18px;color:#fff;background:linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,.06));border:1px solid rgba(255,255,255,.35);backdrop-filter:blur(14px) saturate(1.6);-webkit-backdrop-filter:blur(14px) saturate(1.6);box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 10px 30px rgba(0,0,0,.35);overflow:hidden;transition:transform .35s cubic-bezier(.34,1.56,.64,1)}.lg::after{content:"";position:absolute;inset:0;background:radial-gradient(90px circle at var(--hx,30%) var(--hy,0%),rgba(255,255,255,.55),transparent 60%);opacity:.7}.lg:hover{transform:scale(1.05)}` }} />
    </div>
  );
}
