"use client";
import { ShaderCanvas } from "./_gl";
/** Warp starfield — stars on polar coordinates streaming outward from a vanishing point that follows the pointer; click for a burst of speed. Needs _gl.tsx. */
const FRAG = `
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
  vec2 uv=(gl_FragCoord.xy-u_res*.5)/u_res.y; vec2 c=(u_mouse-.5)*vec2(u_res.x/u_res.y,1.)*.8;
  uv-=c;
  float boost=exp(-(u_time-u_c1.z)*1.6)*(u_c1.z>0.?1.:0.);
  float ang=atan(uv.y,uv.x), rad=length(uv);
  vec3 col=vec3(.01,.008,.02);
  for(int i=0;i<4;i++){
    float fi=float(i); float layer=1.+fi*.6;
    float cells=60.*layer;
    float a=ang/6.28318*cells; float id=floor(a);
    float rnd=h(vec2(id,fi));
    float speed=.25+rnd*.6+boost*1.5;
    float z=fract(rnd*7.+u_time*speed*.4);
    float r=z*z*1.6;
    float streak=.02+z*(.06+boost*.25);
    float line=smoothstep(.5,0.,abs(fract(a)-.5)*2.-.7+.3);
    float along=smoothstep(r,r-streak,rad)*smoothstep(r-streak*3.,r-streak,rad);
    float lum=along*line*z*(.7+rnd*.6);
    col+=lum*mix(vec3(1.,.5,.15),vec3(.8,.9,1.),rnd);
  }
  col+=exp(-rad*6.)*vec3(.5,.18,.04)*(.4+boost);
  gl_FragColor=vec4(col,1.);
}`;
export default function WarpStarfield() { return <ShaderCanvas frag={FRAG} label="Warp starfield shader" />; }
