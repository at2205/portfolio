"use client";
import * as THREE from "three";
import { ThreeStage, lights } from "./_three";
/** ExplodedView — a stack of layers that separate along one axis and settle back, like a product teardown. Pointer height sets how far; idle it breathes. Needs _three.tsx + three. */
const COL = [0x2a2a2a, 0xea4f16, 0xff630f, 0xf6af60, 0x3a3a3a];
export default function ExplodedView() {
  return (
    <ThreeStage label="Exploded view" camZ={5.2} setup={({ scene, camera, pointer }) => {
      lights(scene); camera.position.set(2.2, 1.6, 5); camera.lookAt(0, 0, 0);
      const layers = COL.map((c, i) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(2, 0.14, 1.4), new THREE.MeshStandardMaterial({ color: c, roughness: 0.4, metalness: 0.4 }));
        if (i === 2) { const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.18, 24), new THREE.MeshStandardMaterial({ color: 0x111111 })); m.add(dot); }
        scene.add(m); return m;
      });
      let k = 0.5;
      return { update: (t) => { const target = pointer.down || pointer.y > -1 && Math.abs(pointer.x) < 1 && pointer.y !== 0 ? (pointer.y + 1) / 2 : 0.5 + Math.sin(t) * 0.5; k += (target - k) * 0.08; layers.forEach((m, i) => { m.position.y = (i - 2) * (0.1 + k * 0.62); m.rotation.y = Math.sin(t * 0.6) * 0.25 + (i - 2) * k * 0.08; }); } };
    }} />
  );
}
