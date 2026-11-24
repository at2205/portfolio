"use client";
import { ShaderCanvas } from "./_gl";
/** Grain gradient — slow-moving colour blobs with film grain dithered on top (the grain is what stops the banding). The pointer drags one blob. Needs _gl.tsx. */
const FRAG = `
float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res; float asp=u_res.x/u_res.y; vec2 p=vec2(uv.x*asp,uv.y); float t=u_time*.3;
  vec2 a=vec2(.5*asp+sin(t)*.5,.5+cos(t*1.3)*.3);
  vec2 b=vec2(.3*asp+cos(t*.8)*.4,.3+sin(t*.6)*.3);
  vec2 c=vec2(u_mouse.x*asp,u_mouse.y);
  vec2 d=vec2(.8*asp+sin(t*1.1)*.2,.8+cos(t*.9)*.2);
  float wa=.5/(.2+distance(p,a)*distance(p,a)*3.);
  float wb=.5/(.2+distance(p,b)*distance(p,b)*3.);
  float wc=.4/(.2+distance(p,c)*distance(p,c)*4.);
  float wd=.4/(.2+distance(p,d)*distance(p,d)*3.);
  vec3 col=(wa*vec3(1.,.39,.06)+wb*vec3(.96,.69,.38)+wc*vec3(.92,.31,.09)+wd*vec3(.35,.12,.3))/(wa+wb+wc+wd);
  col*=.85+.15*(wa+wb);
  col+=(h(gl_FragCoord.xy+fract(u_time)*100.)-.5)*.14;
  gl_FragColor=vec4(col,1.);
}`;
export default function GrainGradient() { return <ShaderCanvas frag={FRAG} label="Grain gradient shader" />; }
