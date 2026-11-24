"use client";
import { useEffect, useRef } from "react";
/** MomentumCarousel — drag to scroll with real inertia: pointer velocity carries on after release and decays with friction. Wheel and arrow keys work too. React only. */
const T = ["#ea4f16", "#ff630f", "#f6af60", "#b4460a", "#c9531b", "#ff8a3d", "#8f3f12"];
export default function MomentumCarousel() {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current!;
    let down = false, lastX = 0, v = 0, raf = 0, moved = 0;
    const coast = () => { if (down) return; el.scrollLeft -= v; v *= 0.94; if (Math.abs(v) > 0.2) raf = requestAnimationFrame(coast); };
    const pd = (e: PointerEvent) => { down = true; lastX = e.clientX; v = 0; moved = 0; cancelAnimationFrame(raf); el.setPointerCapture(e.pointerId); el.style.cursor = "grabbing"; };
    const pm = (e: PointerEvent) => { if (!down) return; const d = e.clientX - lastX; lastX = e.clientX; v = d; moved += Math.abs(d); el.scrollLeft -= d; };
    const pu = () => { down = false; el.style.cursor = ""; raf = requestAnimationFrame(coast); };
    const click = (e: MouseEvent) => { if (moved > 6) e.preventDefault(); };
    el.addEventListener("pointerdown", pd); el.addEventListener("pointermove", pm); el.addEventListener("pointerup", pu); el.addEventListener("pointercancel", pu); el.addEventListener("click", click, true);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("pointerdown", pd); el.removeEventListener("pointermove", pm); el.removeEventListener("pointerup", pu); el.removeEventListener("pointercancel", pu); el.removeEventListener("click", click, true); };
  }, []);
  return (
    <div ref={box} className="mc" tabIndex={0} aria-label="Carousel" onKeyDown={(e) => { if (e.key === "ArrowRight") box.current!.scrollBy({ left: 180, behavior: "smooth" }); if (e.key === "ArrowLeft") box.current!.scrollBy({ left: -180, behavior: "smooth" }); }}>
      {T.map((c, i) => (<div key={i} style={{ background: `linear-gradient(160deg,${c},#111 150%)` }}><b>{String(i + 1).padStart(2, "0")}</b></div>))}
      <style dangerouslySetInnerHTML={{ __html: `.mc{display:flex;gap:10px;width:min(460px,100%);overflow-x:auto;padding:4px;cursor:grab;scrollbar-width:none;user-select:none;touch-action:pan-y}.mc::-webkit-scrollbar{display:none}.mc>div{flex:none;width:150px;height:200px;border-radius:16px;padding:14px;display:flex;align-items:flex-end}.mc b{font:500 38px var(--f-display,system-ui);font-stretch:87.5%;color:#000}` }} />
    </div>
  );
}
