"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * _three — a small three.js stage. Creates renderer, scene and camera, keeps them sized,
 * feeds a normalised pointer (-1..1, y up), pauses off-screen and cleans up on unmount.
 * `setup` builds your scene and returns { update(t, dt), dispose?, onClick? }.
 */
export type Ctx = {
  scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer;
  pointer: { x: number; y: number; down: boolean }; canvas: HTMLCanvasElement;
  /** Studio reflections for glass / chrome — call once if you need them. */
  env: () => void;
};
export type Live = { update?: (t: number, dt: number) => void; dispose?: () => void; onClick?: (e: PointerEvent) => void } | void;

type StageProps = { setup: (c: Ctx) => Live; height?: number; camZ?: number; fov?: number; label?: string };

/**
 * Browsers allow ~16 live WebGL contexts and silently kill the oldest. So the renderer only
 * exists while the stage is near the viewport, and is fully disposed when it scrolls away.
 */
export function ThreeStage(props: StageProps) {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: "300px" });
    io.observe(box.current!);
    return () => io.disconnect();
  }, []);
  return <div ref={box} style={{ width: "min(520px,100%)", height: props.height ?? 300, borderRadius: 18, overflow: "hidden" }}>{near && <Stage {...props} />}</div>;
}

function Stage({ setup, height = 300, camZ = 4, fov = 45, label }: StageProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" }); } catch { return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
    camera.position.z = camZ;
    const pointer = { x: 0, y: 0, down: false };
    let envTex: THREE.Texture | null = null;
    const env = () => { if (envTex) return; const pm = new THREE.PMREMGenerator(renderer); envTex = pm.fromScene(new RoomEnvironment(), 0.04).texture; scene.environment = envTex; pm.dispose(); };
    const live = setup({ scene, camera, renderer, pointer, canvas, env }) || {};
    const size = () => { const w = canvas.clientWidth, h = canvas.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    const ro = new ResizeObserver(size); ro.observe(canvas); size();
    let visible = true, raf = 0, last = performance.now();
    const t0 = last;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = () => {
      const now = performance.now(), dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (visible) { live.update?.((now - t0) / 1000, reduce ? 0 : dt); renderer.render(scene, camera); }
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(canvas);
    const pm = (e: PointerEvent) => { const b = canvas.getBoundingClientRect(); pointer.x = ((e.clientX - b.left) / b.width) * 2 - 1; pointer.y = -(((e.clientY - b.top) / b.height) * 2 - 1); };
    const pd = (e: PointerEvent) => { pointer.down = true; live.onClick?.(e); };
    const pu = () => (pointer.down = false);
    canvas.addEventListener("pointermove", pm); canvas.addEventListener("pointerdown", pd); addEventListener("pointerup", pu);
    if (reduce) { live.update?.(2, 0); renderer.render(scene, camera); } else raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      canvas.removeEventListener("pointermove", pm); canvas.removeEventListener("pointerdown", pd); removeEventListener("pointerup", pu);
      live.dispose?.();
      scene.traverse((o) => { const m = o as THREE.Mesh; m.geometry?.dispose?.(); const mat = m.material as THREE.Material | THREE.Material[] | undefined; (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose()); });
      envTex?.dispose(); renderer.dispose(); renderer.forceContextLoss();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <canvas ref={ref} role="img" aria-label={label ?? "3D scene"} style={{ width: "100%", height, borderRadius: 18, display: "block", touchAction: "pan-y", cursor: "grab" }} />;
}

/** Soft key + fill + ambient lighting used by most scenes. */
export function lights(scene: THREE.Scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const k = new THREE.DirectionalLight(0xffd2b0, 2.2); k.position.set(3, 4, 5); scene.add(k);
  const f = new THREE.DirectionalLight(0xff630f, 1.2); f.position.set(-4, -1, 2); scene.add(f);
}
