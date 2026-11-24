"use client";
import * as THREE from "three";
import { ThreeStage } from "./_three";
/** InfiniteTunnel — 30 rings recycled along z so the corridor never ends; they twist and shift hue with depth, and the camera leans with the pointer. No new objects after setup. Needs _three.tsx + three. */
export default function InfiniteTunnel() {
  return (
    <ThreeStage label="Infinite tunnel" camZ={0.01} fov={70} setup={({ scene, camera, pointer }) => {
      camera.position.set(0, 0, 0); scene.fog = new THREE.Fog(0x050302, 4, 26);
      const N = 30, GAP = 1, rings: THREE.Mesh[] = [];
      for (let i = 0; i < N; i++) {
        const m = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.018, 6, i % 2 ? 6 : 4), new THREE.MeshBasicMaterial({ color: new THREE.Color().setHSL(0.06 + (i / N) * 0.08, 1, 0.55) }));
        m.position.z = -i * GAP; rings.push(m); scene.add(m);
      }
      return { update: (t, dt) => {
        rings.forEach((m, i) => { m.position.z += dt * 3; if (m.position.z > 0.5) m.position.z -= N * GAP; m.rotation.z = t * 0.2 + i * 0.12; const f = Math.min(1, -m.position.z / 6); m.scale.setScalar(1 + (1 - f) * 0.1); });
        camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.05; camera.position.y += (pointer.y * 0.4 - camera.position.y) * 0.05; camera.rotation.z = Math.sin(t * 0.3) * 0.15;
      } };
    }} />
  );
}
