"use client";
import { ShaderCanvas } from "./_gl";
/** Aurora — layered curtains of light over a star field, warmed to the site's orange. Fragment shader; mouse height drives intensity. Needs _gl.tsx. */
const FRAG = `
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res; uv.x*=u_res.x/u_res.y; float t=u_time*.15;
  vec3 col=vec3(.015,.012,.03)*(1.-uv.y*.4);
  for(int i=0;i<3;i++){
    float fi=float(i);
    float y=.45+fi*.09+.14*fbm(vec2(uv.x*1.5+t+fi*3.,fi));
    float band=smoothstep(.24,0.,abs(uv.y-y));
    float rays=fbm(vec2(uv.x*16.+fi*5.,t*2.));
    col+=band*(.3+.7*rays)*mix(vec3(1.,.36,.06),vec3(.96,.69,.38),fi/2.)*(.45+.7*u_mouse.y);
  }
  col+=step(.9965,h(floor(gl_FragCoord.xy/2.)))*.7*(1.-uv.y*.3);
  gl_FragColor=vec4(col,1.);
}`;
export default function Aurora() { return <ShaderCanvas frag={FRAG} label="Aurora shader" />; }
