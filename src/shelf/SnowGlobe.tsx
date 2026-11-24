"use client";
import * as THREE from "three";
import { ThreeStage, lights } from "./_three";
/** SnowGlobe — a glass sphere over a plinth with 500 flakes that fall under gravity, bounce off the inside of the glass and are kicked back up when you click (shake). Needs _three.tsx + three. */
export default function SnowGlobe() {
  return (
    <ThreeStage label="Snow globe" camZ={5} setup={({ scene, camera, pointer, env }) => {
      env(); lights(scene); camera.position.set(0, 0.7, 5); camera.lookAt(0, 0, 0);
      const R = 1.25, N = 500, pos = new Float32Array(N * 3), vel = new Float32Array(N * 3);
      const seed = (i: number) => { const r = Math.cbrt(Math.random()) * (R - 0.08), a = Math.random() * 6.283, b = Math.acos(2 * Math.random() - 1); pos.set([r * Math.sin(b) * Math.cos(a), r * Math.cos(b), r * Math.sin(b) * Math.sin(a)], i * 3); };
      for (let i = 0; i < N; i++) seed(i);
      const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const snow = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 0.045, transparent: true, opacity: 0.95, depthWrite: false })); scene.add(snow);
      const tree = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.8, 7), new THREE.MeshStandardMaterial({ color: 0xff630f, roughness: 0.5 })); tree.position.set(0, -0.8, 0); scene.add(tree);
      const tree2 = tree.clone(); tree2.scale.setScalar(0.6); tree2.position.set(0.5, -0.95, 0.2); scene.add(tree2);
      const glass = new THREE.Mesh(new THREE.SphereGeometry(R, 48, 48), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.95, roughness: 0.03, thickness: 0.2, ior: 1.3, transparent: true, envMapIntensity: 1 })); scene.add(glass);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.25, 0.5, 48), new THREE.MeshStandardMaterial({ color: 0x1b1b1b, metalness: 0.6, roughness: 0.3 })); base.position.y = -1.35; scene.add(base);
      const kick = () => { for (let i = 0; i < N; i++) { vel[i * 3] += (Math.random() - 0.5) * 3; vel[i * 3 + 1] += 1.5 + Math.random() * 3; vel[i * 3 + 2] += (Math.random() - 0.5) * 3; } };
      return { onClick: kick, update: (t, dt) => {
        for (let i = 0; i < N; i++) {
          const j = i * 3; vel[j + 1] -= dt * 0.6; vel[j] *= 0.985; vel[j + 1] *= 0.985; vel[j + 2] *= 0.985;
          pos[j] += vel[j] * dt + Math.sin(t + i) * 0.0015; pos[j + 1] += vel[j + 1] * dt; pos[j + 2] += vel[j + 2] * dt;
          const l = Math.hypot(pos[j], pos[j + 1], pos[j + 2]);
          if (l > R - 0.05) { const k = (R - 0.05) / l; pos[j] *= k; pos[j + 1] *= k; pos[j + 2] *= k; vel[j + 1] *= -0.2; }
          if (pos[j + 1] < -0.95) { pos[j + 1] = -0.95; vel[j + 1] = 0; }
        }
        (g.attributes.position as THREE.BufferAttribute).needsUpdate = true;
        scene.rotation.y += (pointer.x * 0.8 - scene.rotation.y) * 0.06;
      } };
    }} />
  );
}
