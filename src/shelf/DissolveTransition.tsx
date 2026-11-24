"use client";
import * as THREE from "three";
import { ThreeStage } from "./_three";
/** DissolveTransition — two scenes cross-faded through an fbm noise threshold with a glowing burn edge; progress eases toward a target that flips on click (and every 4s). Scenes here are procedural; sample textures instead for photos. Needs _three.tsx + three. */
export default function DissolveTransition() {
  return (
    <ThreeStage label="Dissolve transition" camZ={2.4} fov={50} setup={({ scene }) => {
      const mat = new THREE.ShaderMaterial({
        uniforms: { uP: { value: 0 }, uT: { value: 0 } },
        vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
        fragmentShader: `varying vec2 vUv;uniform float uP;uniform float uT;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 uv=vUv;
  vec3 A=mix(vec3(.92,.31,.09),vec3(.96,.69,.38),uv.y)*(.75+.25*sin(length(uv-.5)*24.-uT));
  vec2 g=abs(fract(uv*vec2(16.,10.))-.5);
  vec3 B=vec3(.04,.04,.06)+smoothstep(.46,.5,max(g.x,g.y))*vec3(.1,.35,.5)+smoothstep(.3,0.,length(uv-.5))*vec3(.1,.2,.4);
  float nz=fbm(uv*5.+1.3);
  float edge=uP*1.25-.125;
  float m=smoothstep(edge-.02,edge+.02,nz);
  float burn=smoothstep(.07,0.,abs(nz-edge))*step(.001,uP)*step(uP,.999);
  vec3 col=mix(B,A,m);
  col+=burn*vec3(1.,.55,.12)*2.;
  gl_FragColor=vec4(col,1.);
}`,
      });
      const cam = (scene as THREE.Scene); void cam;
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.1), mat));
      let target = 0, last = 0;
      return { onClick: () => (target = 1 - target), update: (t, dt) => { if (t - last > 4) { last = t; target = 1 - target; } mat.uniforms.uP.value += (target - mat.uniforms.uP.value) * Math.min(1, dt * 2.2); mat.uniforms.uT.value = t * 3; } };
    }} />
  );
}
