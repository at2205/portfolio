"use client";
import { ShaderCanvas } from "./_gl";
/** Liquid chrome — repeated sine warping of the plane, then shaded by the warp's gradient as if it were a reflective surface. The pointer bends the waves. Needs _gl.tsx. */
const FRAG = `
void main(){
  vec2 uv=(gl_FragCoord.xy*2.-u_res)/min(u_res.x,u_res.y); float t=u_time*.35;
  uv+=(u_mouse-.5)*.6;
  vec2 p=uv;
  for(float i=1.;i<6.;i++){
    p+=vec2(.7/i*sin(i*p.y*1.6+t+.3*i),.7/i*sin(i*p.x*1.6+t*1.2+.3*i))*.9;
  }
  float v=sin(p.x*1.2+p.y)*.5+.5;
  vec3 chrome=mix(vec3(.04),vec3(.95),pow(v,1.5));
  float hi=pow(sin(p.x*2.1-p.y*1.3+t)*.5+.5,12.);
  vec3 col=chrome*mix(vec3(.85,.88,.95),vec3(1.,.75,.55),smoothstep(.3,.9,sin(p.y*.8+t*.5)*.5+.5));
  col+=hi*vec3(1.,.45,.12)*.8;
  gl_FragColor=vec4(col,1.);
}`;
export default function LiquidChrome() { return <ShaderCanvas frag={FRAG} label="Liquid chrome shader" />; }
