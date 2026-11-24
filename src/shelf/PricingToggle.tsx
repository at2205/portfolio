"use client";
import { useState } from "react";
/** PricingToggle — a sliding pill between Monthly and Yearly, with the price rolling to its new value. React only. */
export default function PricingToggle() {
  const [yearly, setYearly] = useState(false);
  const price = yearly ? 24 : 29;
  return (
    <div style={{ display: "grid", gap: 22, justifyItems: "center" }}>
      <div className="pt" role="tablist" data-y={yearly}>
        <i />
        {["Monthly", "Yearly −17%"].map((l, k) => (
          <button key={l} role="tab" aria-selected={(k === 1) === yearly} onClick={() => setYearly(k === 1)}>{l}</button>
        ))}
      </div>
      <div className="pt-p"><span>$</span>
        {String(price).split("").map((d, i) => (
          <b key={i}><em style={{ transform: `translateY(${-(+d) * 1}em)` }}>{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => <u key={x}>{x}</u>)}</em></b>
        ))}
        <small>/mo</small>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.pt{position:relative;display:flex;padding:4px;border-radius:999px;background:#151515;border:1px solid rgba(255,255,255,.12)}.pt i{position:absolute;top:4px;bottom:4px;left:4px;width:calc(50% - 4px);border-radius:999px;background:#ff630f;transition:transform .5s cubic-bezier(.34,1.56,.64,1)}.pt[data-y="true"] i{transform:translateX(100%)}.pt button{position:relative;padding:10px 20px;font-size:14px;transition:color .3s}.pt button[aria-selected="true"]{color:#000}.pt-p{display:flex;align-items:baseline;font:500 72px/1 var(--f-display,system-ui);font-stretch:87.5%;letter-spacing:-.04em}.pt-p b{height:1em;overflow:hidden;font-weight:500}.pt-p em{display:block;font-style:normal;transition:transform .7s cubic-bezier(.34,1.56,.64,1)}.pt-p u{display:block;height:1em;text-decoration:none}.pt-p span,.pt-p small{font-size:22px;opacity:.6;margin:0 4px}` }} />
    </div>
  );
}
