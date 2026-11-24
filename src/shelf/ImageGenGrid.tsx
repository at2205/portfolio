"use client";
import { useRef, useState } from "react";
/** ImageGenGrid — four tiles that "develop" from blurred noise to a finished image, staggered, with a shimmer while pending. Wire onGenerate to a real model and swap the gradients for the returned URLs. React only. */
const G = ["linear-gradient(150deg,#ea4f16,#111 130%)", "linear-gradient(210deg,#ff630f,#f6af60)", "linear-gradient(120deg,#b4460a,#000)", "linear-gradient(170deg,#f6af60,#ea4f16 55%,#222)"];
export default function ImageGenGrid() {
  const [state, setState] = useState<("idle" | "pending" | "done")[]>(["idle", "idle", "idle", "idle"]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const run = () => {
    timers.current.forEach(clearTimeout);
    setState(["pending", "pending", "pending", "pending"]);
    G.forEach((_, i) => timers.current.push(setTimeout(() => setState((s) => s.map((x, j) => (j === i ? "done" : x))), 900 + i * 450)));
  };
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
      <div className="ig">{G.map((g, i) => (<div key={i} data-s={state[i]} style={{ "--g": g } as React.CSSProperties} />))}</div>
      <button className="pill" onClick={run}>{state.includes("pending") ? "Generating…" : "Generate"}</button>
      <style dangerouslySetInnerHTML={{ __html: `.ig{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:min(280px,100%)}.ig div{aspect-ratio:1;border-radius:14px;background:#1a1a1a;position:relative;overflow:hidden}.ig div::before{content:"";position:absolute;inset:0;background:var(--g);opacity:0;filter:blur(24px) saturate(.4);transform:scale(1.2);transition:opacity 1s,filter 1.1s cubic-bezier(.22,1,.36,1),transform 1.1s cubic-bezier(.22,1,.36,1)}.ig div[data-s="done"]::before{opacity:1;filter:none;transform:none}.ig div[data-s="pending"]::after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.12) 50%,transparent 70%) 0 0/250% 100%;animation:ig-s 1.2s linear infinite}@keyframes ig-s{to{background-position:-150% 0}}` }} />
    </div>
  );
}
