"use client";
import { ShaderCanvas } from "./_gl";
/** Cloud sea — banks of fbm cloud lit from a low sun over a sunset sky; three layers drift at different speeds and the pointer shifts the horizon. Needs _gl.tsx. */
const FRAG = `
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res; float asp=u_res.x/u_res.y; float hor=.38+(u_mouse.y-.5)*.12;
  vec3 sky=mix(vec3(1.,.75,.45),vec3(.18,.1,.25),smoothstep(hor,1.,uv.y));
  float sun=exp(-length((uv-vec2(.5+(u_mouse.x-.5)*.2,hor+.08))*vec2(asp,1.))*5.);
  vec3 col=sky+sun*vec3(1.,.6,.25);
  for(int i=0;i<3;i++){
    float fi=float(i); float s=.25+fi*.18;
    float y=hor-fi*.05;
    vec2 q=vec2(uv.x*asp*(1.2+fi*.8)+u_time*s*.2,(uv.y-y)*(5.-fi)*1.2);
    float c=fbm(q+fi*7.);
    float m=smoothstep(.42,.72,c)*smoothstep(y+.28,y-.05,uv.y);
    vec3 cc=mix(vec3(.28,.15,.2),vec3(1.,.82,.62),smoothstep(.4,.9,c+uv.y*.25));
    col=mix(col,cc*(0.55+fi*.2),m*(.7+fi*.12));
  }
  gl_FragColor=vec4(col,1.);
}`;
export default function CloudSea() { return <ShaderCanvas frag={FRAG} label="Cloud sea shader" />; }
