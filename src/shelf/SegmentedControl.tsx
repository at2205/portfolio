"use client";
import { useState } from "react";
/** SegmentedControl — equal-width segments with a sliding thumb; a real radio group underneath, so arrow keys and screen readers just work. React only. */
const OPTS = ["Day", "Week", "Month", "Year"];
export default function SegmentedControl() {
  const [i, setI] = useState(1);
  return (
    <div className="sc" role="radiogroup" aria-label="Range" style={{ "--n": OPTS.length, "--i": i } as React.CSSProperties}>
      <i />
      {OPTS.map((o, k) => (
        <label key={o}>
          <input type="radio" name="sc" checked={i === k} onChange={() => setI(k)} />
          <span>{o}</span>
        </label>
      ))}
      <style dangerouslySetInnerHTML={{ __html: `.sc{position:relative;display:grid;grid-template-columns:repeat(var(--n),1fr);padding:4px;border-radius:12px;background:#141414;border:1px solid rgba(255,255,255,.12);width:min(360px,100%)}.sc i{position:absolute;top:4px;bottom:4px;left:4px;width:calc((100% - 8px)/var(--n));border-radius:9px;background:#fff;transform:translateX(calc(var(--i)*100%));transition:transform .5s cubic-bezier(.34,1.4,.64,1)}.sc label{position:relative;text-align:center}.sc input{position:absolute;opacity:0;inset:0;cursor:pointer}.sc span{display:block;padding:9px 0;font-size:14px;color:rgba(255,255,255,.65);transition:color .3s}.sc input:checked+span{color:#000}.sc label:focus-within span{outline:2px solid #ff630f;outline-offset:-2px;border-radius:9px}` }} />
    </div>
  );
}
