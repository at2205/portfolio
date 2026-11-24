"use client";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { ThreeStage } from "./_three";
/** IridescentBlob — a high-detail icosphere displaced by three crossed sine fields, shaded by MeshNormalMaterial so its orientation becomes colour (the cheapest believable iridescence). Normals are recomputed per frame. Needs _three.tsx + three. */
export default function IridescentBlob() {
  return (
    <ThreeStage label="Iridescent blob" camZ={4.2} setup={({ scene, pointer }) => {
      const raw = new THREE.IcosahedronGeometry(1.15, 5); raw.deleteAttribute("normal"); raw.deleteAttribute("uv");
      const g = mergeVertices(raw), pos = g.attributes.position as THREE.BufferAttribute; // indexed, so normals can be smooth
      const base = Float32Array.from(pos.array as Float32Array);
      const m = new THREE.Mesh(g, new THREE.MeshNormalMaterial({ flatShading: false })); scene.add(m);
      return { update: (t) => {
        const amp = 0.22 + Math.abs(pointer.x) * 0.15;
        for (let i = 0; i < pos.count; i++) {
          const x = base[i * 3], y = base[i * 3 + 1], z = base[i * 3 + 2], l = Math.hypot(x, y, z);
          const d = (Math.sin(x * 2.6 + t * 1.1) + Math.sin(y * 3.1 - t * 0.9) + Math.sin(z * 2.2 + t * 1.3)) * amp * 0.5, s = (l + d) / l;
          pos.setXYZ(i, x * s, y * s, z * s);
        }
        pos.needsUpdate = true; g.computeVertexNormals(); m.rotation.y = t * 0.2 + pointer.x * 0.5; m.rotation.x = pointer.y * 0.3;
      } };
    }} />
  );
}
