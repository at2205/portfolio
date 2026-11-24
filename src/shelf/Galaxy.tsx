"use client";
import * as THREE from "three";
import { ThreeStage } from "./_three";
/** Galaxy — 14,000 additive points on logarithmic spiral arms, warm core to cool rim, with radial scatter. Rotation speed follows the pointer. Needs _three.tsx + three. */
export default function Galaxy() {
  return (
    <ThreeStage label="Galaxy" camZ={4.6} setup={({ scene, camera, pointer }) => {
      camera.position.set(0, 2.2, 4.4); camera.lookAt(0, 0, 0);
      const N = 14000, pos = new Float32Array(N * 3), col = new Float32Array(N * 3), inn = new THREE.Color(0xff8a3d), out = new THREE.Color(0x4a6dff);
      for (let i = 0; i < N; i++) {
        const r = Math.pow(Math.random(), 1.6) * 2.6, arm = (i % 3) * ((Math.PI * 2) / 3), a = arm + r * 1.7;
        const s = (0.05 + r * 0.06), rx = (Math.random() - 0.5) * s * 3, ry = (Math.random() - 0.5) * s, rz = (Math.random() - 0.5) * s * 3;
        pos.set([Math.cos(a) * r + rx, ry, Math.sin(a) * r + rz], i * 3);
        const c = inn.clone().lerp(out, r / 2.6); col.set([c.r, c.g, c.b], i * 3);
      }
      const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3)); g.setAttribute("color", new THREE.BufferAttribute(col, 3));
      const pts = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.02, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      scene.add(pts);
      return { update: (_t, dt) => { pts.rotation.y += dt * (0.12 + Math.abs(pointer.x) * 0.5); } };
    }} />
  );
}
