"use client";
import * as THREE from "three";
import { ThreeStage, lights } from "./_three";
/** ExtrudedText — text rasterised on a canvas, then every filled cell becomes an instanced box with depth, so any font works without a typeface JSON. Turns with the pointer. Needs _three.tsx + three. */
export default function ExtrudedText({ text = "DEPTH" }: { text?: string }) {
  return (
    <ThreeStage label="Extruded text" camZ={5.4} setup={({ scene, camera, pointer, env }) => {
      env(); lights(scene); camera.position.set(0, 0, 5.4);
      const c = document.createElement("canvas"); c.width = 560; c.height = 200; const x = c.getContext("2d", { willReadFrequently: true })!;
      x.fillStyle = "#fff"; x.font = "800 180px system-ui, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(text, 280, 108);
      const d = x.getImageData(0, 0, 560, 200).data, cells: [number, number][] = [], S = 5;
      for (let py = 0; py < 200; py += S) for (let px = 0; px < 560; px += S) if (d[(py * 560 + px) * 4 + 3] > 128) cells.push([px, py]);
      const K = 0.0112, u = K * S, mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(u * 0.94, u * 0.94, 0.34), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.35 }), cells.length);
      const dummy = new THREE.Object3D(), col = new THREE.Color();
      cells.forEach(([px, py], i) => { dummy.position.set((px - 280) * K, -(py - 100) * K, 0); dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix); col.setHSL(0.04 + (px / 560) * 0.08, 0.95, 0.5); mesh.setColorAt(i, col); });
      const g = new THREE.Group(); g.add(mesh); scene.add(g);
      return { update: (t) => { g.rotation.y += (pointer.x * 0.7 + Math.sin(t * 0.6) * 0.15 - g.rotation.y) * 0.07; g.rotation.x += (-pointer.y * 0.35 - g.rotation.x) * 0.07; } };
    }} />
  );
}
