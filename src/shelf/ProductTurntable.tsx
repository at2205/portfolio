"use client";
import * as THREE from "three";
import { ThreeStage, lights } from "./_three";
/** ProductTurntable — a bottle on a plinth that auto-rotates and can be dragged, keeping its angular velocity after release (inertia) before easing back to the idle spin. Swap the lathe for a GLTF model. Needs _three.tsx + three. */
export default function ProductTurntable() {
  return (
    <ThreeStage label="Product turntable" camZ={5} setup={({ scene, camera, pointer, env }) => {
      env(); lights(scene); camera.position.set(0, 1.2, 5); camera.lookAt(0, 0.1, 0);
      const pts = [[0, 0], [0.55, 0], [0.62, 0.1], [0.62, 1.1], [0.5, 1.4], [0.22, 1.55], [0.22, 1.8], [0, 1.8]].map(([x, y]) => new THREE.Vector2(x, y));
      const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 48), new THREE.MeshStandardMaterial({ color: 0xff630f, metalness: 0.6, roughness: 0.25 }));
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.28, 32), new THREE.MeshStandardMaterial({ color: 0x151515, metalness: 0.8, roughness: 0.3 })); cap.position.y = 1.92;
      const label = new THREE.Mesh(new THREE.CylinderGeometry(0.635, 0.635, 0.5, 48, 1, true), new THREE.MeshStandardMaterial({ color: 0xf2eadd, roughness: 0.8 })); label.position.y = 0.65;
      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.6, 0.14, 64), new THREE.MeshStandardMaterial({ color: 0x1b1b1b, metalness: 0.5, roughness: 0.35 })); plinth.position.y = -0.07;
      const g = new THREE.Group(); g.add(body, cap, label); g.position.y = 0.0; g.scale.setScalar(0.85);
      const root = new THREE.Group(); root.add(g, plinth); root.position.y = -0.8; scene.add(root);
      let vel = 0.4, lx = 0, was = false;
      return { update: (_t, dt) => {
        if (pointer.down) { if (was) vel = ((pointer.x - lx) * 8) / Math.max(dt, 0.008); lx = pointer.x; }
        else vel += (0.5 - vel) * dt * 1.2;
        was = pointer.down; if (pointer.down) lx = pointer.x;
        root.rotation.y += vel * dt * (pointer.down ? 0.15 : 1);
      } };
    }} />
  );
}
