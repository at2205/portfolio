"use client";
import { useEffect, useState } from "react";
/** ChapteredVideoPlayer — a scrubber split into labelled chapters, with the current chapter name shown and click-to-jump. Runs a simulated clock here; pass a <video> ref's currentTime to drive it for real. React only. */
const CH = [["Intro", 0, 20], ["Architecture", 20, 55], ["Demo", 55, 110], ["Wrap-up", 110, 130]] as const;
export default function ChapteredVideoPlayer() {
  const [t, setT] = useState(0), [play, setPlay] = useState(false), [hover, setHover] = useState<number | null>(null);
  const total = 130;
  useEffect(() => { if (!play) return; const i = setInterval(() => setT((x) => (x + 0.25 >= total ? (setPlay(false), 0) : x + 0.25)), 250); return () => clearInterval(i); }, [play]);
  const cur = CH.find(([, a, b]) => t >= a && t < b) ?? CH[CH.length - 1];
  return (
    <div className="cv">
      <div className="cv-screen" onClick={() => setPlay(!play)}><span>{cur[0]}</span><button aria-label={play ? "Pause" : "Play"}>{play ? "❚❚" : "▶"}</button></div>
      <div className="cv-bar">
        {CH.map(([n, a, b], i) => (
          <div key={n} style={{ flex: b - a }} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)} onClick={() => setT(a)} role="button" aria-label={`Jump to ${n}`} data-h={hover === i}>
            <i style={{ transform: `scaleX(${Math.max(0, Math.min(1, (t - a) / (b - a)))})` }} />
            <em>{n}</em>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.cv{width:min(440px,100%);display:grid;gap:10px}.cv-screen{aspect-ratio:16/9;border-radius:14px;background:linear-gradient(135deg,#111,#2a1308);display:grid;place-items:center;position:relative;cursor:pointer}.cv-screen span{position:absolute;left:14px;bottom:12px;font:500 24px var(--f-display,system-ui);font-stretch:87.5%;text-transform:uppercase}.cv-screen button{width:54px;height:54px;border-radius:50%;background:rgba(255,255,255,.14);backdrop-filter:blur(6px);font-size:16px;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}.cv-screen:hover button{transform:scale(1.12)}.cv-bar{display:flex;gap:3px}.cv-bar>div{position:relative;height:6px;border-radius:3px;background:#2a2a2a;cursor:pointer;transition:height .25s}.cv-bar>div[data-h="true"]{height:10px}.cv-bar i{position:absolute;inset:0;border-radius:3px;background:#ff630f;transform-origin:0 50%}.cv-bar em{position:absolute;left:0;top:-22px;font:10px var(--f-mono,monospace);font-style:normal;text-transform:uppercase;letter-spacing:.05em;white-space:nowrap;opacity:0;transition:opacity .2s}.cv-bar>div[data-h="true"] em{opacity:1}.cv-bar{margin-top:18px}` }} />
    </div>
  );
}
