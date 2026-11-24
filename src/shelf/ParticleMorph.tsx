"use client";
import * as THREE from "three";
import { ThreeStage } from "./_three";
/** ParticleMorph — 3,000 points eased between target shapes (sphere, cube, torus, helix). Targets are plain Float32Arrays, so any shape that can be sampled works. Click to advance. Needs _three.tsx + three. */
const N = 3000;
const shapes = (): Float32Array[] => {
  const s = new Float32Array(N * 3), c = new Float32Array(N * 3), t = new Float32Array(N * 3), h = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const u = Math.random(), v = Math.random(), a = u * Math.PI * 2, b = Math.acos(2 * v - 1);
    s.set([Math.sin(b) * Math.cos(a) * 1.3, Math.cos(b) * 1.3, Math.sin(b) * Math.sin(a) * 1.3], i * 3);
    const f = Math.floor(Math.random() * 6), q = () => (Math.random() - 0.5) * 2 * 1.05;
    const p = [q(), q(), q()]; p[f % 3] = f < 3 ? 1.05 : -1.05; c.set(p, i * 3);
    const A = u * Math.PI * 2, B = v * Math.PI * 2; t.set([(1 + 0.4 * Math.cos(B)) * Math.cos(A) * 1.1, 0.45 * Math.sin(B) * 1.1, (1 + 0.4 * Math.cos(B)) * Math.sin(A) * 1.1], i * 3);
    const H = (i / N) * Math.PI * 8; h.set([Math.cos(H) * (0.6 + Math.random() * 0.2), (i / N) * 2.8 - 1.4, Math.sin(H) * (0.6 + Math.random() * 0.2)], i * 3);
  }
  return [s, c, t, h];
};
export default function ParticleMorph() {
  return (
    <ThreeStage label="Particle morph" camZ={4.6} setup={({ scene }) => {
      const T = shapes(); let cur = 0, next = 0, lastSwap = 0, k = 1;
      const pos = Float32Array.from(T[0]), g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xff7a2a, size: 0.035, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending })); scene.add(pts);
      const go = () => { cur = next; next = (next + 1) % T.length; k = 0; };
      return {
        onClick: go,
        update: (t, dt) => {
          if (t - lastSwap > 3.2) { lastSwap = t; go(); }
          k = Math.min(1, k + dt * 0.8); const e = k * k * (3 - 2 * k), a = T[cur], b = T[next], p = g.attributes.position as THREE.BufferAttribute;
          for (let i = 0; i < N * 3; i++) (p.array as Float32Array)[i] = a[i] + (b[i] - a[i]) * e + (Math.sin(t * 2 + i) * 0.01);
          p.needsUpdate = true; pts.rotation.y = t * 0.3;
        },
      };
    }} />
  );
}
