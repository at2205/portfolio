"use client";
import * as THREE from "three";
import { ThreeStage } from "./_three";
/** AudioSphere — a wireframe icosphere whose vertices are pushed out by a simulated beat plus travelling noise. Feed `level` from an AnalyserNode for real audio. Needs _three.tsx + three. */
export default function AudioSphere() {
  return (
    <ThreeStage label="Audio sphere" camZ={4} setup={({ scene, pointer }) => {
      const g = new THREE.IcosahedronGeometry(1.2, 4);
      const pos = g.attributes.position as THREE.BufferAttribute;
      const base = Float32Array.from(pos.array as Float32Array);
      const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0xff630f, wireframe: true, transparent: true, opacity: 0.85 }));
      scene.add(m);
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 24), new THREE.MeshBasicMaterial({ color: 0x1a0a04 }));
      scene.add(core);
      return {
        update: (t) => {
          const beat = Math.pow(Math.max(0, Math.sin(t * 2.4)), 6) * 0.3 + (pointer.down ? 0.25 : 0);
          for (let i = 0; i < pos.count; i++) {
            const x = base[i * 3], y = base[i * 3 + 1], z = base[i * 3 + 2], l = Math.hypot(x, y, z);
            const d = Math.sin(x * 3 + t * 3) * Math.sin(y * 2.6 + t * 2.2) * Math.sin(z * 3.4 + t * 2.7) * 0.22 + beat;
            const s = (l + d) / l;
            pos.setXYZ(i, x * s, y * s, z * s);
          }
          pos.needsUpdate = true;
          m.rotation.y = t * 0.25 + pointer.x * 0.6; m.rotation.x = pointer.y * 0.4;
        },
      };
    }} />
  );
}
