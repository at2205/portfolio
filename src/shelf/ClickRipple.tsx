"use client";
import { ShaderCanvas } from "./_gl";
/** ClickRipple — every click launches a decaying ring that refracts the pattern beneath it (the last two clicks are live at once). Pure fragment shader: displacement from a damped travelling sine. Needs _gl.tsx. */
const FRAG = `
vec2 ripple(vec3 c, vec2 uv, float asp){
  float dt=u_time-c.z;
  if(c.z<0.||dt>3.5) return vec2(0.);
  vec2 d=(uv-c.xy)*vec2(asp,1.); float r=length(d);
  float front=dt*.32;
  float w=sin((r-front)*46.)*exp(-abs(r-front)*9.)*exp(-dt*1.1);
  return normalize(d+1e-4)*w*.028;
}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res; float asp=u_res.x/u_res.y;
  vec2 off=ripple(u_c1,uv,asp)+ripple(u_c2,uv,asp);
  vec2 p=(uv+off)*vec2(asp,1.)*10.;
  vec2 g=abs(fract(p)-.5);
  float line=smoothstep(.04,.0,min(g.x,g.y)-.46+.04);
  float dots=smoothstep(.12,.05,length(fract(p)-.5));
  vec3 col=vec3(.04,.03,.035)+line*vec3(.2,.1,.05)+dots*vec3(1.,.42,.1)*.8;
  col+=vec3(1.,.5,.2)*length(off)*14.;
  col*=.7+.3*smoothstep(1.2,.2,distance(uv,vec2(.5)));
  gl_FragColor=vec4(col,1.);
}`;
export default function ClickRipple() { return <ShaderCanvas frag={FRAG} label="Click ripple shader" />; }
