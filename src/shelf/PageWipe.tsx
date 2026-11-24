"use client";
import { useState } from "react";
/** PageWipe — a page-turn transition in CSS 3D: the top page rotates about its left edge with backface hidden, revealing the next, then drops to the bottom of the stack. Pure CSS transforms; the order is one array. React only. */
const P = [["01", "Plan", "linear-gradient(150deg,#ea4f16,#f6af60)"], ["02", "Build", "linear-gradient(150deg,#111,#ff630f 140%)"], ["03", "Ship", "linear-gradient(150deg,#b4460a,#000)"]];
export default function PageWipe() {
  const [order, setOrder] = useState([0, 1, 2]);
  const [turning, setTurning] = useState(false);
  const turn = () => { if (turning) return; setTurning(true); setTimeout(() => { setOrder(([a, ...r]) => [...r, a]); setTurning(false); }, 900); };
  return (
    <div style={{ display: "grid", gap: 18, justifyItems: "center" }}>
      <div className="pw">
        {[...order].reverse().map((id) => { const top = order[0] === id; return (
          <button key={id} className="pw-p" onClick={top ? turn : undefined} tabIndex={top ? 0 : -1} aria-label={top ? "Turn the page" : undefined}
            style={{ background: P[id][2], transform: top && turning ? "rotateY(-172deg)" : "none", zIndex: top ? 5 : order.indexOf(id) === 1 ? 2 : 1 }}>
            <small>{P[id][0]}</small><b>{P[id][1]}</b>
          </button>); })}
      </div>
      <small style={{ font: "11px var(--f-mono,monospace)", letterSpacing: ".06em", textTransform: "uppercase", opacity: 0.5 }}>Click to turn</small>
      <style dangerouslySetInnerHTML={{ __html: `.pw{position:relative;width:240px;height:300px;perspective:1100px}.pw-p{position:absolute;inset:0;border-radius:6px 18px 18px 6px;padding:18px;display:flex;flex-direction:column;justify-content:space-between;text-align:left;color:#000;transform-origin:0 50%;transition:transform .9s cubic-bezier(.65,0,.25,1);backface-visibility:hidden;box-shadow:inset 6px 0 14px rgba(0,0,0,.25),0 18px 40px rgba(0,0,0,.4)}.pw-p small{font:11px var(--f-mono,monospace)}.pw-p b{font:500 56px var(--f-display,system-ui);font-stretch:87.5%;text-transform:uppercase}` }} />
    </div>
  );
}
