"use client";
import { useState } from "react";
/** SpringToggle — a switch whose thumb overshoots, stretches while it travels and squashes as it lands. React only. */
export default function SpringToggle() {
  const [on, setOn] = useState(false);
  const [moving, setMoving] = useState(false);
  return (
    <button role="switch" aria-checked={on} aria-label="Toggle" className="st" data-on={on} data-moving={moving}
      onClick={() => { setOn((o) => !o); setMoving(true); setTimeout(() => setMoving(false), 220); }}>
      <i />
      <style dangerouslySetInnerHTML={{ __html: `.st{width:92px;height:52px;border-radius:999px;background:#2a2a2a;position:relative;transition:background .3s,transform .4s cubic-bezier(.34,1.56,.64,1)}.st[data-on="true"]{background:#ff630f}.st:active{transform:scale(.94)}.st i{position:absolute;left:6px;top:6px;width:40px;height:40px;border-radius:999px;background:#fff;transition:transform .55s cubic-bezier(.34,1.56,.64,1),width .22s ease}.st[data-on="true"] i{transform:translateX(40px)}.st[data-moving="true"] i{width:56px}.st[data-moving="true"][data-on="true"] i{transform:translateX(24px)}` }} />
    </button>
  );
}
