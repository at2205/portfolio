"use client";
import { useEffect, useMemo, useRef, useState } from "react";
/** WaveformAudioPlayer — bar waveform with a played/unplayed split, click-to-seek and keyboard control. With no `src` it runs a silent simulated clock; pass a src to drive a real <audio>. React only. */
export default function WaveformAudioPlayer({ src, duration = 84 }: { src?: string; duration?: number }) {
  const bars = useMemo(() => { let s = 3; const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280); return Array.from({ length: 56 }, () => 0.2 + r() * 0.8); }, []);
  const [t, setT] = useState(0), [play, setPlay] = useState(false);
  const au = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (!play) return;
    const el = au.current;
    if (src && el) { el.play(); const i = setInterval(() => setT(el.currentTime), 100); return () => { el.pause(); clearInterval(i); }; }
    const i = setInterval(() => setT((x) => (x + 0.1 >= duration ? (setPlay(false), 0) : x + 0.1)), 100);
    return () => clearInterval(i);
  }, [play, src, duration]);
  const seek = (p: number) => { setT(p * duration); if (au.current) au.current.currentTime = p * duration; };
  const fmt = (n: number) => `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, "0")}`;
  return (
    <div className="wf">
      {src && <audio ref={au} src={src} preload="metadata" />}
      <button className="wf-b" onClick={() => setPlay(!play)} aria-label={play ? "Pause" : "Play"}>{play ? "❚❚" : "▶"}</button>
      <div className="wf-w" role="slider" tabIndex={0} aria-label="Seek" aria-valuemin={0} aria-valuemax={duration} aria-valuenow={Math.round(t)}
        onClick={(e) => { const b = e.currentTarget.getBoundingClientRect(); seek((e.clientX - b.left) / b.width); }}
        onKeyDown={(e) => { if (e.key === "ArrowRight") seek(Math.min(1, (t + 5) / duration)); if (e.key === "ArrowLeft") seek(Math.max(0, (t - 5) / duration)); if (e.key === " ") { e.preventDefault(); setPlay(!play); } }}>
        {bars.map((h, i) => (<i key={i} data-p={i / bars.length < t / duration} style={{ height: `${h * 100}%` }} />))}
      </div>
      <small>{fmt(t)} / {fmt(duration)}</small>
      <style dangerouslySetInnerHTML={{ __html: `.wf{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:14px;width:min(440px,100%);padding:14px;border-radius:16px;background:#141414;border:1px solid rgba(255,255,255,.1)}.wf-b{width:44px;height:44px;border-radius:50%;background:#ff630f;color:#000;font-size:14px;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}.wf-b:hover{transform:scale(1.1)}.wf-w{display:flex;align-items:center;gap:2px;height:44px;cursor:pointer}.wf-w i{flex:1;border-radius:2px;background:#3a3a3a;transition:background .2s,transform .2s}.wf-w i[data-p="true"]{background:#ff630f}.wf-w:hover i{transform:scaleY(1.08)}.wf small{font:11px var(--f-mono,monospace);opacity:.65;font-variant-numeric:tabular-nums}` }} />
    </div>
  );
}
