"use client";
import { ShaderCanvas } from "./_gl";
/** Caustics — the bright net of light on a pool floor, from an iterated sine-warp. The pointer nudges the water. Needs _gl.tsx. */
const FRAG = `
void main(){
  vec2 uv=gl_FragCoord.xy/u_res; uv.x*=u_res.x/u_res.y; uv+=(u_mouse-.5)*.15;
  float t=u_time*.5+23.;
  vec2 p=mod(uv*6.28318*1.1,6.28318)-250.;
  vec2 i=p; float c=1.; float inten=.005;
  for(int n=0;n<5;n++){
    float tt=t*(1.-(3.5/float(n+1)));
    i=p+vec2(cos(tt-i.x)+sin(tt+i.y),sin(tt-i.y)+cos(tt+i.x));
    c+=1./length(vec2(p.x/(sin(i.x+tt)/inten),p.y/(cos(i.y+tt)/inten)));
  }
  c/=5.; c=1.17-pow(c,1.4);
  float l=pow(abs(c),8.);
  vec3 col=vec3(.09,.03,.01)+l*vec3(1.,.55,.2);
  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}`;
export default function Caustics() { return <ShaderCanvas frag={FRAG} label="Caustics shader" />; }
