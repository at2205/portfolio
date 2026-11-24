"use client";
import { useEffect, useRef, useState } from "react";

/**
 * _gl — a tiny raw-WebGL runner for full-screen fragment shaders. No libraries.
 * Built-in uniforms: u_res (vec2, px), u_time (s), u_mouse (vec2, 0..1, y up),
 * u_c1 / u_c2 (vec3: click x, y in 0..1 and the time it happened — latest, previous).
 * Pauses off-screen, honours prefers-reduced-motion (renders one still frame).
 */
/** The context only exists while the canvas is near the viewport (browsers cap live WebGL contexts at ~16). */
export function ShaderCanvas(props: { frag: string; height?: number; label?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: "300px" });
    io.observe(box.current!);
    return () => io.disconnect();
  }, []);
  return <div ref={box} style={{ width: "min(520px,100%)", height: props.height ?? 280, borderRadius: 18, overflow: "hidden" }}>{near && <Inner {...props} />}</div>;
}

function Inner({ frag, height = 280, label }: { frag: string; height?: number; label?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const gl = c.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;
    const mk = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error("shader:", gl.getShaderInfoLog(s));
      return s;
    };
    const p = gl.createProgram()!;
    gl.attachShader(p, mk(gl.VERTEX_SHADER, "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}"));
    gl.attachShader(p, mk(gl.FRAGMENT_SHADER, "precision highp float;uniform vec2 u_res;uniform float u_time;uniform vec2 u_mouse;uniform vec3 u_c1;uniform vec3 u_c2;\n" + frag));
    gl.linkProgram(p);
    gl.useProgram(p);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(p, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(p, n);
    const uRes = U("u_res"), uTime = U("u_time"), uMouse = U("u_mouse"), uC1 = U("u_c1"), uC2 = U("u_c2");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mouse = [0.5, 0.5], tm = [0.5, 0.5], c1 = [0.5, 0.5, -99], c2 = [0.5, 0.5, -99], visible = true, raf = 0;
    const t0 = performance.now();
    const size = () => { const d = Math.min(devicePixelRatio || 1, 1.5); c.width = Math.max(2, Math.floor(c.clientWidth * d)); c.height = Math.max(2, Math.floor(c.clientHeight * d)); gl.viewport(0, 0, c.width, c.height); };
    const draw = (t: number) => {
      mouse[0] += (tm[0] - mouse[0]) * 0.08; mouse[1] += (tm[1] - mouse[1]) * 0.08;
      gl.uniform2f(uRes, c.width, c.height); gl.uniform1f(uTime, t); gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.uniform3f(uC1, c1[0], c1[1], c1[2]); gl.uniform3f(uC2, c2[0], c2[1], c2[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = () => { if (visible) draw((performance.now() - t0) / 1000); raf = requestAnimationFrame(loop); };
    const pm = (e: PointerEvent) => { const b = c.getBoundingClientRect(); tm = [(e.clientX - b.left) / b.width, 1 - (e.clientY - b.top) / b.height]; };
    const pd = (e: PointerEvent) => { const b = c.getBoundingClientRect(); c2 = c1; c1 = [(e.clientX - b.left) / b.width, 1 - (e.clientY - b.top) / b.height, (performance.now() - t0) / 1000]; };
    const ro = new ResizeObserver(size); ro.observe(c); size();
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(c);
    c.addEventListener("pointermove", pm); c.addEventListener("pointerdown", pd);
    if (reduce) draw(3); else raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); c.removeEventListener("pointermove", pm); c.removeEventListener("pointerdown", pd); gl.getExtension("WEBGL_lose_context")?.loseContext(); };
  }, [frag]);
  return <canvas ref={ref} role="img" aria-label={label ?? "Animated shader"} style={{ width: "100%", height, borderRadius: 18, display: "block", touchAction: "pan-y" }} />;
}
