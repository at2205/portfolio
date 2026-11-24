"use client";
import { useRef } from "react";
/** MagneticButton — leans toward the cursor; the label drifts further than the body; a colour flood pours in from where the pointer entered. React only. */
export default function MagneticButton({ label = "Hover me" }: { label?: string }) {
  const btn = useRef<HTMLButtonElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = btn.current!, b = el.getBoundingClientRect();
    const dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height / 2);
    el.style.transform = `translate(${dx * 0.28}px,${dy * 0.28}px)`;
    el.style.setProperty("--lx", `${dx * 0.12}px`);
    el.style.setProperty("--ly", `${dy * 0.12}px`);
  };
  const enter = (e: React.PointerEvent) => {
    const b = btn.current!.getBoundingClientRect();
    btn.current!.style.setProperty("--fx", `${e.clientX - b.left}px`);
    btn.current!.style.setProperty("--fy", `${e.clientY - b.top}px`);
  };
  const leave = () => {
    btn.current!.style.transform = "";
    btn.current!.style.setProperty("--lx", "0px");
    btn.current!.style.setProperty("--ly", "0px");
  };
  return (
    <div style={{ padding: 40 }}>
      <button ref={btn} className="mg" onPointerMove={move} onPointerEnter={enter} onPointerLeave={leave}>
        <span className="mg-l">{label}</span>
      </button>
      <style dangerouslySetInnerHTML={{ __html: `.mg{position:relative;overflow:hidden;padding:20px 34px;border-radius:999px;border:1px solid rgba(255,255,255,.3);font-size:18px;letter-spacing:-.02em;transition:transform .35s cubic-bezier(.22,1,.36,1)}.mg::before{content:"";position:absolute;left:var(--fx,50%);top:var(--fy,50%);width:300%;aspect-ratio:1;border-radius:50%;background:#ff630f;transform:translate(-50%,-50%) scale(0);transition:transform .55s cubic-bezier(.22,1,.36,1)}.mg:hover::before{transform:translate(-50%,-50%) scale(1)}.mg-l{position:relative;display:block;transform:translate(var(--lx,0),var(--ly,0));transition:transform .35s cubic-bezier(.22,1,.36,1)}.mg:hover{color:#000}` }} />
    </div>
  );
}
