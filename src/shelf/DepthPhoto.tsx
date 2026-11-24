"use client";
import * as THREE from "three";
import { ThreeStage } from "./_three";
/** DepthPhoto — a 2.5D parallax: a scene split into transparent layers at different depths, with the camera moving a little against the pointer so near layers slide further than far ones. Layers are drawn procedurally here; use your own cut-outs. Needs _three.tsx + three. */
const W = 768, H = 480;
const layer = (draw: (x: CanvasRenderingContext2D) => void) => { const c = document.createElement("canvas"); c.width = W; c.height = H; draw(c.getContext("2d")!); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
const ridge = (x: CanvasRenderingContext2D, base: number, amp: number, col: string, seed: number) => { x.fillStyle = col; x.beginPath(); x.moveTo(0, H); for (let i = 0; i <= W; i += 8) x.lineTo(i, base - amp * (Math.sin(i * 0.011 + seed) * 0.6 + Math.sin(i * 0.03 + seed * 2) * 0.4) - amp); x.lineTo(W, H); x.fill(); };
export default function DepthPhoto() {
  return (
    <ThreeStage label="Depth photo parallax" camZ={4.2} fov={40} setup={({ scene, camera, pointer }) => {
      const defs: [number, (x: CanvasRenderingContext2D) => void][] = [
        [-3, (x) => { const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#1a0f2e"); g.addColorStop(0.55, "#ea4f16"); g.addColorStop(1, "#f6af60"); x.fillStyle = g; x.fillRect(0, 0, W, H); }],
        [-2.4, (x) => { const g = x.createRadialGradient(W * 0.5, H * 0.62, 10, W * 0.5, H * 0.62, 90); g.addColorStop(0, "#fff6d8"); g.addColorStop(1, "rgba(255,200,120,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H); x.fillStyle = "#fff3cf"; x.beginPath(); x.arc(W * 0.5, H * 0.62, 38, 0, 7); x.fill(); }],
        [-1.8, (x) => ridge(x, H * 0.78, 40, "#7a2a22", 1)],
        [-1.1, (x) => ridge(x, H * 0.86, 46, "#4a1a1c", 4)],
        [-0.4, (x) => ridge(x, H * 0.96, 40, "#1b0d12", 8)],
        [0.5, (x) => { x.fillStyle = "#07040a"; for (let i = 0; i < 7; i++) { const px = 40 + i * 120 + (i % 2) * 20, hh = 120 + (i * 37) % 70; x.beginPath(); x.moveTo(px, H); x.lineTo(px + 18, H - hh); x.lineTo(px + 36, H); x.fill(); } }],
      ];
      defs.forEach(([z, d]) => {
        const s = (4.2 - z) / 4.2 * 1.0 + 0.0, w = 5.2 * (4.2 - z) / 4.2 * 1.05;
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w, (w * H) / W), new THREE.MeshBasicMaterial({ map: layer(d), transparent: true, toneMapped: false })); m.position.z = z; void s; scene.add(m);
      });
      return { update: () => { camera.position.x += (-pointer.x * 0.5 - camera.position.x) * 0.06; camera.position.y += (-pointer.y * 0.3 - camera.position.y) * 0.06; camera.lookAt(0, 0, -1); } };
    }} />
  );
}
