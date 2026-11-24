"use client";
import * as THREE from "three";
import { ThreeStage } from "./_three";
/** DataGlobe — a dot-sphere on a Fibonacci lattice with great-circle arcs that draw themselves between cities. Drag to spin. Swap the pairs for real coordinates. Needs _three.tsx + three. */
const ll = (lat: number, lon: number, r: number) => { const p = ((90 - lat) * Math.PI) / 180, t = ((lon + 180) * Math.PI) / 180; return new THREE.Vector3(-r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t)); };
const PAIRS: [number, number, number, number][] = [[28.6, 77.2, 51.5, -0.1], [28.6, 77.2, 1.3, 103.8], [51.5, -0.1, 40.7, -74], [1.3, 103.8, -33.9, 151.2], [40.7, -74, 37.8, -122.4]];
export default function DataGlobe() {
  return (
    <ThreeStage label="Data globe" camZ={4.2} setup={({ scene, pointer }) => {
      const g = new THREE.Group(); scene.add(g);
      const N = 1600, pts = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), a = i * 2.39996; pts.set([Math.cos(a) * r * 1.3, y * 1.3, Math.sin(a) * r * 1.3], i * 3); }
      const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pts, 3));
      g.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xf6af60, size: 0.028, transparent: true, opacity: 0.9 })));
      g.add(new THREE.Mesh(new THREE.SphereGeometry(1.27, 32, 32), new THREE.MeshBasicMaterial({ color: 0x120805 })));
      const arcs = PAIRS.map(([a, b, c, d]) => {
        const p0 = ll(a, b, 1.3), p1 = ll(c, d, 1.3), mid = p0.clone().add(p1).multiplyScalar(0.5).normalize().multiplyScalar(1.3 + p0.distanceTo(p1) * 0.45);
        const pts = new THREE.QuadraticBezierCurve3(p0, mid, p1).getPoints(60);
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0xff630f }));
        g.add(line); return line;
      });
      let ry = 0, vel = 0, lx = 0;
      return {
        update: (t) => {
          if (pointer.down) { vel = (pointer.x - lx) * 2.2; } else vel *= 0.95;
          lx = pointer.x; ry += vel + 0.003; g.rotation.y = ry; g.rotation.x = 0.35;
          arcs.forEach((l, i) => { const f = ((t * 0.35 + i * 0.2) % 1.6); l.geometry.setDrawRange(0, Math.min(61, Math.floor(Math.min(f, 1) * 61))); (l.material as THREE.LineBasicMaterial).opacity = f > 1 ? 1 - (f - 1) / 0.6 : 1; (l.material as THREE.LineBasicMaterial).transparent = true; });
        },
      };
    }} />
  );
}
