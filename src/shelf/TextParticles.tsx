"use client";
import * as THREE from "three";
import { ThreeStage } from "./_three";
/** TextParticles — text drawn to an offscreen canvas, its filled pixels sampled into points; each point springs home and is shoved away by the pointer. Needs _three.tsx + three. */
export default function TextParticles({ text = "ARYAN" }: { text?: string }) {
  return (
    <ThreeStage label="Text particles" camZ={4} setup={({ scene, camera, pointer, canvas }) => {
      const c = document.createElement("canvas"); c.width = 640; c.height = 220;
      const x = c.getContext("2d", { willReadFrequently: true })!; x.fillStyle = "#fff"; x.font = "800 190px system-ui, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(text, 320, 118);
      const d = x.getImageData(0, 0, 640, 220).data, home: number[] = [];
      for (let py = 0; py < 220; py += 3) for (let px = 0; px < 640; px += 3) if (d[(py * 640 + px) * 4 + 3] > 128) home.push((px - 320) / 120, -(py - 110) / 120);
      const N = home.length / 2, pos = new Float32Array(N * 3), vel = new Float32Array(N * 2);
      for (let i = 0; i < N; i++) pos.set([(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4, 0], i * 3);
      const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xff7a2a, size: 0.03, transparent: true, opacity: 0.95, depthWrite: false })));
      const h = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
      return { update: (_t, dt) => {
        const aspect = canvas.clientWidth / canvas.clientHeight, mx = pointer.x * (h / 2) * aspect, my = pointer.y * (h / 2), k = 14 * Math.min(dt * 60, 3) / 60;
        for (let i = 0; i < N; i++) {
          const j = i * 3, dx = pos[j] - mx, dy = pos[j + 1] - my, dist = Math.hypot(dx, dy) + 0.0001;
          if (dist < 0.55) { const f = (0.55 - dist) * 0.9; vel[i * 2] += (dx / dist) * f; vel[i * 2 + 1] += (dy / dist) * f; }
          vel[i * 2] += (home[i * 2] - pos[j]) * k; vel[i * 2 + 1] += (home[i * 2 + 1] - pos[j + 1]) * k;
          vel[i * 2] *= 0.82; vel[i * 2 + 1] *= 0.82; pos[j] += vel[i * 2]; pos[j + 1] += vel[i * 2 + 1];
        }
        (g.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      } };
    }} />
  );
}
