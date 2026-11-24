"use client";
import * as THREE from "three";
import { ThreeStage } from "./_three";
/** GrassField — 1,600 instanced blades swaying on a travelling wave, bent away from the pointer like wind. One InstancedMesh, matrices rewritten per frame. Needs _three.tsx + three. */
export default function GrassField() {
  return (
    <ThreeStage label="Grass field" camZ={3} setup={({ scene, camera, pointer }) => {
      camera.position.set(0, 0.7, 3.2); camera.lookAt(0, 0.25, 0);
      scene.background = new THREE.Color(0x120a06);
      const N = 1600, geo = new THREE.ConeGeometry(0.025, 0.55, 3); geo.translate(0, 0.275, 0);
      const mesh = new THREE.InstancedMesh(geo, new THREE.MeshBasicMaterial({ vertexColors: false }), N);
      const base: { x: number; z: number; h: number }[] = [], c = new THREE.Color(), dummy = new THREE.Object3D();
      for (let i = 0; i < N; i++) {
        const x = (Math.random() - 0.5) * 6, z = (Math.random() - 0.5) * 3.2 - 0.4; base.push({ x, z, h: 0.6 + Math.random() * 0.9 });
        c.setHSL(0.07 + Math.random() * 0.05, 0.9, 0.35 + Math.random() * 0.25); mesh.setColorAt(i, c);
      }
      scene.add(mesh);
      return { update: (t) => {
        const wx = pointer.x * 2.4;
        for (let i = 0; i < N; i++) {
          const b = base[i], sway = Math.sin(t * 1.6 + b.x * 1.4 + b.z) * 0.12, push = Math.max(0, 1 - Math.abs(b.x - wx) / 0.9) * Math.sign(b.x - wx) * 0.45;
          dummy.position.set(b.x, 0, b.z); dummy.rotation.set(Math.sin(t * 1.1 + b.z * 2) * 0.05, 0, -(sway + push)); dummy.scale.set(1, b.h, 1); dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      } };
    }} />
  );
}
