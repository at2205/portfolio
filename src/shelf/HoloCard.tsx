"use client";
import * as THREE from "three";
import { ThreeStage } from "./_three";
/** HoloCard — a card that tilts to the pointer with a holographic foil: a cosine palette indexed by UV plus tilt, over fine scan-lines, with rounded corners cut in the fragment shader. Needs _three.tsx + three. */
export default function HoloCard() {
  return (
    <ThreeStage label="Holographic card" camZ={4.4} setup={({ scene, pointer }) => {
      const mat = new THREE.ShaderMaterial({
        transparent: true, side: THREE.DoubleSide, uniforms: { uTilt: { value: new THREE.Vector2() }, uTime: { value: 0 } },
        vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
        fragmentShader: `varying vec2 vUv;uniform vec2 uTilt;uniform float uTime;
float rr(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
void main(){
  vec2 p=(vUv-.5)*vec2(1.6,2.2);
  if(rr(p,vec2(.8,1.1),.12)>0.) discard;
  float k=vUv.x*.9+vUv.y*.7+uTilt.x*.6-uTilt.y*.4+uTime*.05;
  vec3 foil=.5+.5*cos(6.28318*(k+vec3(0.,.33,.67)));
  float lines=.85+.15*sin(vUv.y*260.+uTilt.y*30.);
  float spec=pow(max(0.,1.-length(p-uTilt*vec2(.9,1.1))),3.);
  vec3 base=mix(vec3(.04,.03,.05),vec3(.25,.1,.05),vUv.y);
  vec3 col=base+foil*lines*.55*(.4+.6*spec)+spec*.35;
  float edge=smoothstep(.0,.03,-rr(p,vec2(.8,1.1),.12));
  col=mix(vec3(1.,.5,.15),col,edge);
  gl_FragColor=vec4(col,1.);
}`,
      });
      const card = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.2), mat); scene.add(card);
      return { update: (t) => { card.rotation.y += (pointer.x * 0.7 - card.rotation.y) * 0.1; card.rotation.x += (-pointer.y * 0.55 - card.rotation.x) * 0.1; mat.uniforms.uTilt.value.set(card.rotation.y, -card.rotation.x); mat.uniforms.uTime.value = t; } };
    }} />
  );
}
