"use client";
import { ShaderCanvas } from "./_gl";
/** Ink fluid — domain-warped noise (noise fed into noise) reads as ink diffusing in water. The pointer stirs the warp. Needs _gl.tsx. */
const FRAG = `
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res; uv.x*=u_res.x/u_res.y; float t=u_time*.12;
  vec2 m=(u_mouse-.5)*1.4;
  vec2 q=vec2(fbm(uv*2.+t),fbm(uv*2.+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(uv*2.+3.*q+vec2(1.7,9.2)+t*1.5+m),fbm(uv*2.+3.*q+vec2(8.3,2.8)-t));
  float f=fbm(uv*2.+3.*r);
  vec3 col=mix(vec3(.02,.015,.02),vec3(.95,.3,.05),smoothstep(.2,.8,f));
  col=mix(col,vec3(1.,.8,.5),smoothstep(.55,1.,length(q))*.6*f);
  col*=.4+f*f*1.6;
  gl_FragColor=vec4(col,1.);
}`;
export default function InkFluid() { return <ShaderCanvas frag={FRAG} label="Ink fluid shader" />; }
