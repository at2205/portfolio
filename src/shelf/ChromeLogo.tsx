"use client";
import * as THREE from "three";
import { ThreeStage, lights } from "./_three";
/** ChromeLogo — a mirror-finish torus knot: metalness 1, low roughness, reflecting a studio environment. Swap the geometry for your own mark (ExtrudeGeometry from an SVG). Needs _three.tsx + three. */
export default function ChromeLogo() {
  return (
    <ThreeStage label="Chrome logo" camZ={4.2} setup={({ scene, pointer, env }) => {
      env(); lights(scene);
      const m = new THREE.Mesh(new THREE.TorusKnotGeometry(0.85, 0.3, 220, 36), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.1, envMapIntensity: 1.4 }));
      scene.add(m);
      return { update: (t) => { m.rotation.y += (pointer.x * 1.2 + t * 0.35 - m.rotation.y) * 0.06; m.rotation.x += (pointer.y * 0.8 + 0.3 - m.rotation.x) * 0.06; } };
    }} />
  );
}
