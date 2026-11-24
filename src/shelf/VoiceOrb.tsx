"use client";
import { useEffect, useRef, useState } from "react";
/** VoiceOrb — an orb that breathes when idle, ripples when listening and pulses when speaking, driven by one amplitude value written to a CSS variable. Simulated amplitude here; feed it an AnalyserNode for real audio. React only. */
const MODES = ["idle", "listening", "speaking"] as const;
export default function VoiceOrb() {
  const [m, setM] = useState<(typeof MODES)[number]>("idle");
  const orb = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0, a = 0;
    const f = (t: number) => {
      const target = m === "idle" ? 0.15 + Math.sin(t / 900) * 0.08 : m === "listening" ? 0.3 + Math.abs(Math.sin(t / 130) * Math.sin(t / 370)) * 0.5 : 0.35 + Math.abs(Math.sin(t / 90) * Math.cos(t / 210)) * 0.65;
      a += (target - a) * 0.18;
      orb.current?.style.setProperty("--a", a.toFixed(3));
      raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [m]);
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "center" }}>
      <div ref={orb} className="vo" data-m={m}><i /><i /><b /></div>
      <div style={{ display: "flex", gap: 6 }}>{MODES.map((x) => (<button key={x} className={`chip ${m === x ? "on" : ""}`} onClick={() => setM(x)}>{x}</button>))}</div>
      <style dangerouslySetInnerHTML={{ __html: `.vo{--a:.2;position:relative;width:120px;height:120px;display:grid;place-items:center}.vo b{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff 0,#f6af60 18%,#ff630f 50%,#7a2a06 100%);transform:scale(calc(.78 + var(--a)*.4));box-shadow:0 0 calc(20px + var(--a)*60px) rgba(255,99,15,calc(.3 + var(--a)*.5))}.vo i{position:absolute;inset:0;border-radius:50%;border:1.5px solid #ff630f;opacity:0}.vo[data-m="listening"] i{animation:vo-r 1.6s ease-out infinite}.vo[data-m="listening"] i+i{animation-delay:.8s}@keyframes vo-r{from{transform:scale(.9);opacity:.7}to{transform:scale(1.9);opacity:0}}` }} />
    </div>
  );
}
