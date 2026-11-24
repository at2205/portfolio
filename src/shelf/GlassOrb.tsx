"use client";
import * as THREE from "three";
import { ThreeStage, lights } from "./_three";
/** GlassOrb — a transmissive sphere (MeshPhysicalMaterial: transmission, thickness, ior) refracting a glowing knot inside it. Needs an environment to read as glass. Needs _three.tsx + three. */
export default function GlassOrb() {
  return (
    <ThreeStage label="Glass orb" camZ={4.2} setup={({ scene, pointer, env }) => {
      env(); lights(scene);
      const inner = new THREE.Mesh(new THREE.TorusKnotGeometry(0.38, 0.13, 120, 16), new THREE.MeshStandardMaterial({ color: 0xff630f, emissive: 0xff4a00, emissiveIntensity: 1.2, roughness: 0.3 }));
      const bar = new THREE.Mesh(new THREE.IcosahedronGeometry(0.25, 0), new THREE.MeshStandardMaterial({ color: 0xf6af60, emissive: 0xf6af60, emissiveIntensity: 0.6 })); bar.position.set(0.55, -0.3, 0.2);
      scene.add(inner, bar);
      const orb = new THREE.Mesh(new THREE.SphereGeometry(1.15, 64, 64), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 1, roughness: 0.04, thickness: 1.4, ior: 1.5, envMapIntensity: 1.2, clearcoat: 1 }));
      scene.add(orb);
      return { update: (t) => { inner.rotation.set(t * 0.6, t * 0.8, 0); bar.rotation.set(t, t * 0.5, 0); orb.rotation.y = pointer.x * 0.6; inner.position.set(pointer.x * 0.25, pointer.y * 0.2, 0); } };
    }} />
  );
}
