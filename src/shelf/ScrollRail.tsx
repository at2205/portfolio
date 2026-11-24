"use client";
import { useEffect, useRef, useState } from "react";
/** ScrollRail — a dot rail that tracks which section is in view (IntersectionObserver), grows the active dot and scrolls to a section on click. Scoped to a scroll box here. React only. */
const S = ["Intro", "Work", "About", "Contact"];
export default function ScrollRail() {
  const box = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [a, setA] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver((l) => l.forEach((e) => e.isIntersecting && setA(refs.current.indexOf(e.target as HTMLElement))), { root: box.current, rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return (
    <div className="sr3">
      <div ref={box} className="sr3-b">{S.map((s, i) => (<section key={s} ref={(el) => { refs.current[i] = el; }} style={{ background: i % 2 ? "#121212" : "#0c0c0c" }}><h3>{s}</h3></section>))}</div>
      <nav aria-label="Sections">{S.map((s, i) => (<button key={s} aria-label={s} aria-current={a === i} onClick={() => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" })}><span>{s}</span></button>))}</nav>
      <style dangerouslySetInnerHTML={{ __html: `.sr3{position:relative;width:min(380px,100%);height:240px;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.1)}.sr3-b{height:100%;overflow-y:auto;scroll-snap-type:y mandatory;scrollbar-width:none}.sr3-b::-webkit-scrollbar{display:none}.sr3-b section{height:100%;scroll-snap-align:start;display:grid;place-items:center}.sr3-b h3{margin:0;font:500 52px var(--f-display,system-ui);font-stretch:87.5%;text-transform:uppercase}.sr3 nav{position:absolute;right:12px;top:50%;transform:translateY(-50%);display:grid;gap:10px}.sr3 nav button{position:relative;width:10px;height:10px;border-radius:50%;background:#555;transition:height .4s cubic-bezier(.34,1.56,.64,1),background .3s,border-radius .3s}.sr3 nav button[aria-current="true"]{height:26px;border-radius:6px;background:#ff630f}.sr3 nav span{position:absolute;right:20px;top:-3px;font:10px var(--f-mono,monospace);text-transform:uppercase;opacity:0;transition:opacity .2s;pointer-events:none;white-space:nowrap}.sr3 nav button:hover span{opacity:1}` }} />
    </div>
  );
}
