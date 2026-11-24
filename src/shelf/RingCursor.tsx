"use client";
import { useEffect, useRef } from "react";
/** RingCursor — a dot that tracks the pointer exactly, with a ring that trails on a lerp and grows over anything interactive. Scoped to its box here. React only. */
export default function RingCursor() {
  const box = useRef<HTMLDivElement>(null), ring = useRef<HTMLSpanElement>(null), dot = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0;
    const move = (e: PointerEvent) => { const b = box.current!.getBoundingClientRect(); x = e.clientX - b.left; y = e.clientY - b.top; dot.current!.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`; ring.current!.dataset.hot = String(!!(e.target as Element).closest("button,a")); };
    const tick = () => { rx += (x - rx) * 0.16; ry += (y - ry) * 0.16; ring.current!.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; raf = requestAnimationFrame(tick); };
    const el = box.current!; el.addEventListener("pointermove", move); raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("pointermove", move); };
  }, []);
  return (
    <div ref={box} className="rg" style={{ cursor: "none" }}>
      <button className="pill">Hover me</button><button className="pill ghost">Or me</button>
      <span ref={ring} className="rg-r" data-hot="false" /><span ref={dot} className="rg-d" />
      <style dangerouslySetInnerHTML={{ __html: `.rg{position:relative;width:min(420px,100%);height:200px;display:flex;gap:14px;align-items:center;justify-content:center;border-radius:20px;background:#0a0a0a;overflow:hidden}.rg button{cursor:none}.rg-r,.rg-d{position:absolute;left:0;top:0;pointer-events:none;border-radius:50%}.rg-r{width:40px;height:40px;border:1.5px solid #ff630f;transition:width .35s cubic-bezier(.34,1.56,.64,1),height .35s cubic-bezier(.34,1.56,.64,1),background .3s}.rg-r[data-hot="true"]{width:72px;height:72px;background:rgba(255,99,15,.18)}.rg-d{width:6px;height:6px;background:#fff}` }} />
    </div>
  );
}
