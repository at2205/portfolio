"use client";
import { useEffect, useRef, useState } from "react";
/** StoryViewer — segmented progress bars, tap the right/left half to move, press and hold to pause, auto-advance at 4s. Uses a CSS animation as the clock so pausing is free. React only. */
const S = [["Plan", "#ea4f16"], ["Build", "#ff630f"], ["Ship", "#f6af60"]];
export default function StoryViewer() {
  const [i, setI] = useState(0), [hold, setHold] = useState(false), [k, setK] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const go = (n: number) => { setI(Math.max(0, Math.min(S.length - 1, n))); setK((x) => x + 1); };
  const done = useRef(false);
  useEffect(() => { done.current = false; }, [i, k]);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <div className="sv" onPointerDown={() => (timer.current = setTimeout(() => setHold(true), 180))} onPointerUp={(e) => { clearTimeout(timer.current); if (hold) return setHold(false); const b = e.currentTarget.getBoundingClientRect(); go(i + (e.clientX - b.left > b.width / 2 ? 1 : -1)); }} onPointerLeave={() => { clearTimeout(timer.current); setHold(false); }}>
      <div className="sv-bars">{S.map((_, n) => (<i key={n}><b key={`${n}-${k}`} className={n < i ? "full" : n === i ? "run" : ""} style={{ animationPlayState: hold ? "paused" : "running" }} onAnimationEnd={() => { if (n === i && !done.current) { done.current = true; if (i < S.length - 1) go(i + 1); } }} /></i>))}</div>
      <div key={i} className="sv-s" style={{ background: `linear-gradient(160deg,${S[i][1]},#111 160%)` }}><span>{String(i + 1).padStart(2, "0")}</span><h3>{S[i][0]}</h3></div>
      <small>Tap sides · hold to pause</small>
      <style dangerouslySetInnerHTML={{ __html: `.sv{position:relative;width:200px;height:320px;border-radius:20px;overflow:hidden;user-select:none;touch-action:manipulation;cursor:pointer}.sv-bars{position:absolute;left:10px;right:10px;top:10px;display:flex;gap:4px;z-index:2}.sv-bars i{flex:1;height:3px;border-radius:3px;background:rgba(0,0,0,.25);overflow:hidden}.sv-bars b{display:block;height:100%;background:#fff;transform:scaleX(0);transform-origin:0 50%}.sv-bars b.full{transform:scaleX(1)}.sv-bars b.run{animation:sv-r 4s linear forwards}.sv-s{position:absolute;inset:0;padding:28px 18px;display:flex;flex-direction:column;justify-content:space-between;color:#000;animation:sv-in .5s cubic-bezier(.22,1,.36,1)}.sv-s span{font:12px var(--f-mono,monospace)}.sv-s h3{margin:0;font:500 64px/.9 var(--f-display,system-ui);font-stretch:87.5%;text-transform:uppercase}.sv small{position:absolute;bottom:8px;left:0;right:0;text-align:center;font:9px var(--f-mono,monospace);text-transform:uppercase;letter-spacing:.06em;color:rgba(0,0,0,.6)}@keyframes sv-r{to{transform:scaleX(1)}}@keyframes sv-in{from{opacity:0;transform:scale(1.05)}}` }} />
    </div>
  );
}
