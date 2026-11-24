"use client";
import { useState } from "react";
/** SpringOdometer — digits roll to a new number, each column trailing the last and overshooting slightly. React only. */
export default function SpringOdometer() {
  const [n, setN] = useState(12840);
  const digits = String(n).padStart(6, "0").split("").map(Number);
  return (
    <div style={{ display: "grid", gap: 20, justifyItems: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `.od{display:flex;font-family:var(--f-display,system-ui);font-stretch:87.5%;font-size:clamp(48px,7vw,96px);line-height:1;letter-spacing:-.04em}.od-c{height:1em;overflow:hidden;width:.62em}.od-c div{transition:transform .9s cubic-bezier(.34,1.56,.64,1)}.od-c b{display:block;height:1em;font-weight:500;text-align:center}` }} />
      <div className="od" aria-label={String(n)} role="img">
        {digits.map((d, i) => (
          <span key={i} className="od-c">
            <div style={{ transform: `translateY(${-d}em)`, transitionDelay: `${(5 - i) * 60}ms` }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => <b key={x}>{x}</b>)}
            </div>
          </span>
        ))}
      </div>
      <button className="pill" onClick={() => setN(Math.floor(Math.random() * 999999))}>Randomise</button>
    </div>
  );
}
