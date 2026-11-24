"use client";
import { useState } from "react";
/** StackCards — a pile where the top card flies to the back when clicked, the rest shuffling forward. Order lives in one array. React only. */
const C = [["01", "Plan", "#ea4f16"], ["02", "Build", "#ff630f"], ["03", "Ship", "#f6af60"], ["04", "Learn", "#c9531b"]];
export default function StackCards() {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [leaving, setLeaving] = useState(false);
  const next = () => { if (leaving) return; setLeaving(true); setTimeout(() => { setOrder(([f, ...r]) => [...r, f]); setLeaving(false); }, 380); };
  return (
    <div style={{ display: "grid", gap: 22, justifyItems: "center" }}>
      <div className="sc2">
        {order.map((id, pos) => (
          <button key={id} onClick={pos === 0 ? next : undefined} aria-label={pos === 0 ? "Send to back" : undefined} tabIndex={pos === 0 ? 0 : -1}
            style={{ background: C[id][2], zIndex: 10 - pos, transform: pos === 0 && leaving ? "translateX(70%) rotate(14deg)" : `translateY(${pos * 14}px) scale(${1 - pos * 0.06})`, opacity: pos === 0 && leaving ? 0 : 1 - pos * 0.12 }}>
            <small>{C[id][0]}</small><b>{C[id][1]}</b>
          </button>
        ))}
      </div>
      <small style={{ font: "11px var(--f-mono,monospace)", letterSpacing: ".06em", textTransform: "uppercase", opacity: 0.5 }}>Click the top card</small>
      <style dangerouslySetInnerHTML={{ __html: `.sc2{position:relative;width:240px;height:230px}.sc2 button{position:absolute;inset:0 0 40px 0;border-radius:22px;padding:18px;display:flex;flex-direction:column;justify-content:space-between;text-align:left;color:#000;transform-origin:50% 100%;transition:transform .45s cubic-bezier(.34,1.3,.64,1),opacity .35s}.sc2 small{font:11px var(--f-mono,monospace)}.sc2 b{font:500 44px var(--f-display,system-ui);font-stretch:87.5%;text-transform:uppercase}` }} />
    </div>
  );
}
