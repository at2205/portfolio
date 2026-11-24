"use client";
import { useRef, useState } from "react";
/** SplitFlapButton — the label changes like a departures board: each character flips through the alphabet on its own hinge. React only. */
export default function SplitFlapButton({ from = "DEPARTS", to = "BOARDING" }: { from?: string; to?: string }) {
  const len = Math.max(from.length, to.length);
  const pad = (s: string) => s.padEnd(len, " ");
  const [txt, setTxt] = useState(pad(from));
  const [on, setOn] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const flip = (target: string) => {
    timers.current.forEach(clearTimeout);
    target = pad(target);
    [...target].forEach((t, i) => {
      const step = (cur: string) => {
        setTxt((s) => s.slice(0, i) + cur + s.slice(i + 1));
        if (cur !== t) {
          const next = cur === " " || cur === "Z" ? "A" : String.fromCharCode(cur.charCodeAt(0) + 1);
          timers.current.push(setTimeout(() => step(t === " " && next > "M" ? " " : next), 38));
        }
      };
      timers.current.push(setTimeout(() => step("A"), i * 60));
    });
  };
  return (
    <button className="sf" aria-label={on ? to : from} onClick={() => { flip(on ? from : to); setOn(!on); }}>
      {[...txt].map((c, i) => <b key={`${i}${c}`}>{c === " " ? " " : c}</b>)}
      <style dangerouslySetInnerHTML={{ __html: `.sf{display:flex;gap:3px;padding:10px}.sf b{display:grid;place-items:center;width:28px;height:42px;border-radius:5px;background:#1b1b1b;border-top:1px solid #333;font-family:var(--f-mono,monospace);font-weight:500;font-size:22px;color:#fff;position:relative;animation:sf-f .14s ease-out}.sf b::after{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:#000}.sf:hover b{color:#ff630f}@keyframes sf-f{from{transform:rotateX(-70deg)}to{transform:none}}` }} />
    </button>
  );
}
