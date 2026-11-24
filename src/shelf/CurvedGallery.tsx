"use client";
import * as THREE from "three";
import { ThreeStage } from "./_three";
/** CurvedGallery — panels placed on a cylinder facing outward, spun by dragging with inertia. Each panel's texture is drawn on a canvas, so swap in loaded images the same way. Needs _three.tsx + three. */
const N = 9;
export default function CurvedGallery() {
  return (
    <ThreeStage label="Curved gallery" camZ={7.6} fov={40} setup={({ scene, camera, pointer }) => {
      camera.position.set(0, 0.2, 7.6);
      const g = new THREE.Group(); scene.add(g);
      for (let i = 0; i < N; i++) {
        const c = document.createElement("canvas"); c.width = 256; c.height = 340; const x = c.getContext("2d")!;
        const gr = x.createLinearGradient(0, 0, 256, 340); gr.addColorStop(0, `hsl(${14 + i * 6},95%,${50 - i}%)`); gr.addColorStop(1, "#111"); x.fillStyle = gr; x.fillRect(0, 0, 256, 340);
        x.fillStyle = "#000"; x.font = "700 92px system-ui"; x.fillText(String(i + 1).padStart(2, "0"), 18, 320);
        const m = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 2), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), side: THREE.DoubleSide }));
        const a = (i / N) * Math.PI * 2; m.position.set(Math.sin(a) * 3.2, 0, Math.cos(a) * 3.2); m.rotation.y = a; g.add(m);
      }
      let v = 0.3, lx = 0, was = false;
      return { update: (_t, dt) => {
        if (pointer.down) { if (was) v = ((pointer.x - lx) * 5) / Math.max(dt, 0.008); lx = pointer.x; was = true; } else { was = false; v += (0.25 - v) * dt * 1.4; }
        g.rotation.y += v * dt * (pointer.down ? 0.25 : 1);
      } };
    }} />
  );
}
