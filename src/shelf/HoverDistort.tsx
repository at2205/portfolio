"use client";
import * as THREE from "three";
import { ThreeStage } from "./_three";
/** HoverDistort — a textured plane that bulges toward the pointer: the vertices lift on a Gaussian and the UVs are pulled with them, with a chromatic fringe. The pointer is lerped on the CPU so the motion has weight. Needs _three.tsx + three. */
export default function HoverDistort({ text = "DISTORT" }: { text?: string }) {
  return (
    <ThreeStage label="Hover distort" camZ={2.8} fov={50} setup={({ scene, pointer }) => {
      const c = document.createElement("canvas"); c.width = 1024; c.height = 576; const x = c.getContext("2d")!;
      const g = x.createLinearGradient(0, 0, 1024, 576); g.addColorStop(0, "#ea4f16"); g.addColorStop(1, "#1a0a05"); x.fillStyle = g; x.fillRect(0, 0, 1024, 576);
      x.fillStyle = "#fff"; x.font = "800 190px system-ui, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(text, 512, 300);
      x.strokeStyle = "rgba(255,255,255,.25)"; for (let i = 0; i < 1024; i += 64) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 576); x.stroke(); }
      const tex = new THREE.CanvasTexture(c); // left un-tagged on purpose: a raw ShaderMaterial writes straight to the framebuffer
      const mat = new THREE.ShaderMaterial({
        uniforms: { map: { value: tex }, uM: { value: new THREE.Vector2(0.5, 0.5) }, uS: { value: 0 } },
        vertexShader: `varying vec2 vUv;uniform vec2 uM;uniform float uS;void main(){vUv=uv;vec3 p=position;float d=distance(uv,uM);p.z+=exp(-d*d*28.)*.45*uS;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
        fragmentShader: `varying vec2 vUv;uniform sampler2D map;uniform vec2 uM;uniform float uS;void main(){vec2 d=vUv-uM;float k=exp(-dot(d,d)*18.)*uS;vec2 uv=vUv-d*k*.35;float s=.012*k;vec3 c=vec3(texture2D(map,uv+d*s).r,texture2D(map,uv).g,texture2D(map,uv-d*s).b);gl_FragColor=vec4(c,1.);}`,
      });
      const m = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.8, 72, 40), mat); scene.add(m);
      const tgt = new THREE.Vector2(0.5, 0.5); let s = 0;
      return { update: () => { tgt.set(pointer.x * 0.5 + 0.5, pointer.y * 0.5 + 0.5); mat.uniforms.uM.value.lerp(tgt, 0.12); s += ((pointer.x === 0 && pointer.y === 0 ? 0 : 1) - s) * 0.08; mat.uniforms.uS.value = s; m.rotation.y = (mat.uniforms.uM.value.x - 0.5) * 0.25; m.rotation.x = -(mat.uniforms.uM.value.y - 0.5) * 0.2; } };
    }} />
  );
}
