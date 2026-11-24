"use client";
import { ShaderCanvas } from "./_gl";
/** Rain glass — drops that bead, slide down and leave a trail on a pane, each refracting a blurred bokeh street behind it. Per-cell random drops; no textures. Needs _gl.tsx. */
const FRAG = `
float h(float x){return fract(sin(x*127.1)*43758.5453);}
float h2(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
vec3 bokeh(vec2 uv,float blur){
  vec3 c=vec3(.03,.02,.04);
  for(int i=0;i<14;i++){
    float fi=float(i);
    vec2 pos=vec2(h(fi*3.1),h(fi*7.7)*.8+.1);
    float r=.05+h(fi*1.7)*.07+blur*.03;
    float d=length((uv-pos)*vec2(u_res.x/u_res.y,1.));
    float m=smoothstep(r,r*(.55-blur*.2),d);
    vec3 col=mix(vec3(1.,.4,.08),vec3(1.,.8,.5),h(fi*5.3));
    if(h(fi*9.1)>.7) col=vec3(.3,.45,1.);
    c+=m*col*(.35+h(fi*2.9)*.6);
  }
  return c;
}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res; float asp=u_res.x/u_res.y; float t=u_time;
  vec2 off=vec2(0.); float trail=0.;
  for(int L=0;L<3;L++){
    float fl=float(L); float sc=7.+fl*5.;
    vec2 g=vec2(uv.x*asp*sc,uv.y*sc*1.4+t*(.18+fl*.07));
    vec2 id=floor(g); vec2 f=fract(g)-.5;
    float rnd=h2(id+fl*17.);
    float on=step(.55,rnd);
    float y=fract(t*(.12+rnd*.08)+rnd*6.)*.8-.4;
    vec2 d=f-vec2((rnd-.5)*.5,-y);
    d.y*=.7;
    float drop=smoothstep(.16,.04,length(d))*on;
    float tr=smoothstep(.05,0.,abs(f.x-(rnd-.5)*.5))*smoothstep(-.5,.5,f.y+y)*smoothstep(.6,0.,f.y+y)*on*.25;
    off+=d*drop*.5; trail+=tr;
  }
  vec2 puv=uv+off*.05;
  vec3 bg=bokeh(puv,1.-clamp(trail*2.,0.,1.));
  float fog=.35*(1.-clamp(length(off)*8.+trail*3.,0.,1.));
  vec3 col=mix(bg,vec3(.5,.35,.3)*.4,fog);
  col+=vec3(.9,.7,.5)*length(off)*.6;
  float mm=smoothstep(.3,0.,distance(uv,u_mouse));
  col=mix(col,bokeh(uv,0.),mm*.6);
  gl_FragColor=vec4(col,1.);
}`;
export default function RainGlass() { return <ShaderCanvas frag={FRAG} label="Rain on glass shader" />; }
