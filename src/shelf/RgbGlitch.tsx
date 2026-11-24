"use client";
import * as THREE from "three";
import { ThreeStage } from "./_three";
/** RgbGlitch — text rasterised to a canvas texture, then sampled three times with per-channel offsets and random horizontal slice jumps in a fragment shader. Pointer height raises the damage; click for a burst. Needs _three.tsx + three. */
export default function RgbGlitch({ text = "GLITCH" }: { text?: string }) {
  return (
    <ThreeStage label="RGB glitch" camZ={3.4} setup={({ scene, pointer }) => {
      const c = document.createElement("canvas"); c.width = 1024; c.height = 512;
      const x = c.getContext("2d")!; x.fillStyle = "#000"; x.fillRect(0, 0, 1024, 512); x.fillStyle = "#fff"; x.font = "800 250px system-ui, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(text, 512, 270);
      const tex = new THREE.CanvasTexture(c);
      const mat = new THREE.ShaderMaterial({
        uniforms: { map: { value: tex }, uT: { value: 0 }, uA: { value: 0.3 } }, toneMapped: false,
        vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
        fragmentShader: `varying vec2 vUv;uniform sampler2D map;uniform float uT;uniform float uA;
float h(float x){return fract(sin(x*127.1)*43758.5453);}
void main(){
  float slice=floor(vUv.y*28.+floor(uT*9.));
  float hit=step(1.-.18*uA-.03,h(slice+floor(uT*9.)*7.));
  float jump=(h(slice*3.1+uT)-.5)*.12*uA*hit;
  float s=.004+.02*uA*hit+.004*sin(uT*3.);
  vec2 uv=vUv+vec2(jump,0.);
  float r=texture2D(map,uv+vec2(s,0.)).r, g=texture2D(map,uv).g, b=texture2D(map,uv-vec2(s,0.)).b;
  vec3 col=vec3(r,g*.55,b*.6)*vec3(1.,.8,.55);
  col+=vec3(1.,.38,.06)*r*.35;
  col*=.9+.1*sin(vUv.y*700.);
  gl_FragColor=vec4(col,1.);
}`,
      });
      const m = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.6), mat); scene.add(m);
      let burst = 0;
      return { onClick: () => (burst = 1), update: (t, dt) => { burst = Math.max(0, burst - dt * 1.5); mat.uniforms.uT.value = t; mat.uniforms.uA.value = 0.25 + (pointer.y + 1) * 0.3 + burst; } };
    }} />
  );
}
