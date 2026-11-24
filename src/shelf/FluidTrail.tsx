"use client";
import { useEffect, useRef } from "react";
/** FluidTrail — a glowing ribbon that follows the pointer and thins into a smoke-like fade. A 2D canvas with additive blending and a per-frame dark wash (no WebGL), plus a Lissajous "ghost" that draws while idle. React only. */
export default function FluidTrail() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, x = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0, last = performance.now(), mx = -1, my = -1, idle = 0;
    const blobs: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    const size = () => { const d = Math.min(devicePixelRatio || 1, 2); w = c.clientWidth; h = c.clientHeight; c.width = w * d; c.height = h * d; x.setTransform(d, 0, 0, d, 0, 0); x.fillStyle = "#0a0a0a"; x.fillRect(0, 0, w, h); };
    const ro = new ResizeObserver(size); ro.observe(c); size();
    const add = (px: number, py: number, vx: number, vy: number) => blobs.push({ x: px, y: py, vx, vy, r: 14 + Math.min(26, Math.hypot(vx, vy) * 2), a: 0.9 });
    const move = (e: PointerEvent) => { const b = c.getBoundingClientRect(), nx = e.clientX - b.left, ny = e.clientY - b.top; if (mx >= 0) add(nx, ny, (nx - mx) * 0.08, (ny - my) * 0.08); mx = nx; my = ny; idle = 0; };
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now; idle += dt;
      if (idle > 1.2 && matchMedia("(prefers-reduced-motion: no-preference)").matches) { const t = now / 1000; const px = w / 2 + Math.sin(t * 1.3) * w * 0.32, py = h / 2 + Math.sin(t * 1.9 + 1) * h * 0.3; add(px, py, Math.cos(t * 1.3) * 0.7, Math.cos(t * 1.9) * 0.6); }
      x.globalCompositeOperation = "source-over"; x.fillStyle = "rgba(10,10,10,.09)"; x.fillRect(0, 0, w, h);
      x.globalCompositeOperation = "lighter";
      for (let i = blobs.length - 1; i >= 0; i--) {
        const b = blobs[i]; b.x += b.vx; b.y += b.vy; b.vx *= 0.97; b.vy *= 0.97 - 0.001; b.vy -= 0.01; b.r *= 0.985; b.a *= 0.965;
        if (b.a < 0.02) { blobs.splice(i, 1); continue; }
        const g = x.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r); g.addColorStop(0, `rgba(255,150,60,${b.a * 0.5})`); g.addColorStop(0.5, `rgba(255,70,10,${b.a * 0.25})`); g.addColorStop(1, "rgba(255,40,0,0)");
        x.fillStyle = g; x.beginPath(); x.arc(b.x, b.y, b.r, 0, 7); x.fill();
      }
      if (blobs.length > 600) blobs.splice(0, blobs.length - 600);
      raf = requestAnimationFrame(frame);
    };
    c.addEventListener("pointermove", move); raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); c.removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={ref} role="img" aria-label="Fluid trail" style={{ width: "min(520px,100%)", height: 280, borderRadius: 18, display: "block", background: "#0a0a0a", touchAction: "none" }} />;
}
