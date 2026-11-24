"use client";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { ThreeStage, lights } from "./_three";
/** KeycapRow — a row of bevelled keys that depress under the pointer (raycast hover) and spring back, with a click to hold one down. RoundedBoxGeometry from three's examples. Needs _three.tsx + three. */
export default function KeycapRow() {
  return (
    <ThreeStage label="Keycap row" camZ={5} setup={({ scene, camera, pointer, env }) => {
      env(); lights(scene); camera.position.set(0, 2.6, 4.2); camera.lookAt(0, 0, 0);
      const keys = ["A", "R", "Y", "A", "N"].map((_, i) => {
        const m = new THREE.Mesh(new RoundedBoxGeometry(0.78, 0.5, 0.78, 5, 0.1), new THREE.MeshStandardMaterial({ color: i === 2 ? 0xff630f : 0x1d1d1d, roughness: 0.45, metalness: 0.1 }));
        m.position.x = (i - 2) * 0.92; scene.add(m);
        return { m, y: 0, held: false, base: i === 2 ? 0xff630f : 0x1d1d1d };
      });
      const ray = new THREE.Raycaster(), v = new THREE.Vector2();
      let prev = false;
      return { update: () => {
        v.set(pointer.x, pointer.y); ray.setFromCamera(v, camera);
        const hit = ray.intersectObjects(keys.map((k) => k.m))[0]?.object;
        if (pointer.down && !prev) { const k = keys.find((k) => k.m === hit); if (k) k.held = !k.held; }
        prev = pointer.down;
        keys.forEach((k) => {
          const target = k.held || k.m === hit ? -0.2 : 0; k.y += (target - k.y) * 0.25; k.m.position.y = k.y;
          (k.m.material as THREE.MeshStandardMaterial).emissive.setHex(k.held ? 0x662200 : 0x000000);
        });
      } };
    }} />
  );
}
