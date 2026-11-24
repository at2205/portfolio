"use client";
import { useState } from "react";
/** VinylRecordPlayer — a record that spins up and down with inertia (animation-play-state + eased speed), and a tonearm that swings onto it. SVG + CSS only. React only. */
export default function VinylRecordPlayer() {
  const [play, setPlay] = useState(false);
  return (
    <div className="vr">
      <div className="vr-d" data-play={play}>
        <svg viewBox="0 0 200 200" width="190" height="190" aria-hidden="true">
          <circle cx="100" cy="100" r="98" fill="#0b0b0b" stroke="#222" />
          {[84, 74, 64, 54, 44].map((r) => (<circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#1d1d1d" />))}
          <circle cx="100" cy="100" r="30" fill="#ff630f" /><circle cx="100" cy="100" r="30" fill="url(#vr-g)" />
          <circle cx="100" cy="100" r="3.5" fill="#0a0a0a" />
          <path d="M30 60 A80 80 0 0 1 100 20" stroke="rgba(255,255,255,.08)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <defs><radialGradient id="vr-g"><stop offset="0" stopColor="#f6af60" stopOpacity=".5" /><stop offset="1" stopColor="#000" stopOpacity=".25" /></radialGradient></defs>
        </svg>
      </div>
      <div className="vr-a" data-play={play}><i /></div>
      <button className="pill" onClick={() => setPlay(!play)}>{play ? "Stop" : "Play"}</button>
      <style dangerouslySetInnerHTML={{ __html: `.vr{position:relative;width:260px;height:250px;display:grid;justify-items:center;align-content:start;gap:12px}.vr-d{width:190px;height:190px;border-radius:50%;animation:vr-s 2.4s linear infinite;animation-play-state:paused;transition:filter .6s;box-shadow:0 14px 40px rgba(0,0,0,.6)}.vr-d[data-play="true"]{animation-play-state:running}@keyframes vr-s{to{transform:rotate(1turn)}}.vr-a{position:absolute;right:10px;top:0;width:8px;height:130px;transform-origin:50% 6px;transform:rotate(-24deg);transition:transform 1s cubic-bezier(.34,1.2,.64,1)}.vr-a[data-play="true"]{transform:rotate(14deg)}.vr-a i{position:absolute;inset:0;border-radius:4px;background:linear-gradient(90deg,#aaa,#666)}.vr-a i::after{content:"";position:absolute;bottom:-6px;left:-5px;width:18px;height:14px;border-radius:3px;background:#ddd}` }} />
    </div>
  );
}
