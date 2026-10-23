import * as THREE from 'three';

// The particle "voice" that lives behind the whole site. One point cloud with
// three target shapes — an orb (a voice at rest), a waveform (a voice in
// motion) and a ring (a portal) — blended on the GPU by `morph`:
//   0 = orb, 1 = waveform, 2 = ring.

import { DEFAULT_STATE, type SceneState } from './state';

export { DEFAULT_STATE, type SceneState };

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERTEX = /* glsl */ `
${NOISE}
uniform float uTime;
uniform float uMorph;
uniform float uChaos;
uniform float uLevel;
uniform float uSize;
uniform float uPixelRatio;
uniform float uHue;
uniform float uMono;
uniform float uRot;
uniform float uWaveSpan;
attribute vec3 aSphere;
attribute vec3 aWave;
attribute vec3 aRing;
attribute vec4 aRand;
varying vec3 vColor;
varying float vAlpha;

vec3 aurora(float t){
  vec3 a=vec3(0.294,0.322,0.667);
  vec3 b=vec3(0.486,0.549,1.000);
  vec3 c=vec3(0.659,0.529,0.863);
  vec3 d=vec3(0.988,0.859,0.937);
  t=fract(t);
  if(t<0.34) return mix(a,b,t/0.34);
  if(t<0.68) return mix(b,c,(t-0.34)/0.34);
  return mix(c,d,(t-0.68)/0.32);
}
vec3 ember(float t){ return mix(vec3(1.0,0.36,0.12), vec3(1.0,0.78,0.52), t); }

vec3 rotY(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(c*p.x+s*p.z, p.y, -s*p.x+c*p.z); }

void main(){
  float t = uTime;
  vec3 n = normalize(aSphere);

  // Orb: a sphere whose surface "speaks" — slow noise plus faster ripples,
  // pushed further by the live microphone level.
  float speak = uLevel * (0.55 + 0.45 * sin(t * 9.0 + aRand.x * 6.2831));
  float n1 = snoise(n * 1.5 + vec3(0.0, t * 0.22, t * 0.15));
  float n2 = snoise(n * 4.2 - vec3(t * 0.55)) * 0.4;
  vec3 orb = aSphere * (1.0 + (n1 + n2) * 0.2 * uChaos + speak * 0.32 * (0.6 + n1));
  orb = rotY(orb, uRot);

  // Waveform: strands of a travelling wave across the screen.
  float x = aWave.x * uWaveSpan;
  float edge = uWaveSpan * 0.55;
  float env = smoothstep(-uWaveSpan, -edge, x) * (1.0 - smoothstep(edge, uWaveSpan, x));
  float strand = aWave.y;
  float amp = (0.42 + uLevel * 1.1) * env * (0.45 + 0.55 * sin(strand * 3.1416));
  float y = sin(x * 1.15 - t * 1.5 + strand * 2.2) * amp
          + sin(x * 2.9 + t * 2.1 + strand * 5.0) * amp * 0.32;
  vec3 wave = vec3(x, y + (strand - 0.5) * 0.18, (aWave.z - 0.5) * 0.5 + (strand - 0.5) * 0.9);

  // Ring: a luminous portal that breathes.
  float ang = aRing.x * 6.2831853 + t * 0.04;
  float r = 2.35 + sin(ang * 5.0 + t * 0.8) * 0.08 * (0.5 + aRing.y) + (aRing.z - 0.5) * 0.32 + speak * 0.25;
  vec3 ring = vec3(cos(ang) * r, sin(ang) * r, (aRing.y - 0.5) * 0.55 + sin(ang * 3.0 + t) * 0.12);

  // Each particle morphs on its own schedule so shapes dissolve, not slide.
  float st = aRand.y * 0.4;
  float m1 = smoothstep(st, st + 0.6, clamp(uMorph, 0.0, 1.0));
  float m2 = smoothstep(st, st + 0.6, clamp(uMorph - 1.0, 0.0, 1.0));
  vec3 pos = mix(mix(orb, wave, m1), ring, m2);
  // A little turbulence mid-flight.
  float flight = sin(m1 * 3.1416) + sin(m2 * 3.1416);
  pos += vec3(snoise(aSphere * 2.0 + t * 0.3), snoise(aWave + t * 0.3), snoise(aRing + t * 0.3)) * 0.35 * flight;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = uSize * (0.55 + aRand.z * 1.45) * (1.0 + speak * 0.8);
  gl_PointSize = size * uPixelRatio * (9.0 / -mv.z);

  // Rim light: particles on the orb's silhouette glow brighter, so it reads
  // as a luminous sphere rather than a cloud.
  vec3 vn = normalize((modelViewMatrix * vec4(rotY(n, uRot), 0.0)).xyz);
  float rim = pow(1.0 - abs(vn.z), 2.2);
  float orbness = 1.0 - m1;

  vec3 col = aurora(aRand.w * 0.55 + n.y * 0.22 + 0.15 + t * 0.015);
  col = mix(col, vec3(0.988, 0.859, 0.937), rim * 0.55 * orbness);
  col = mix(col, ember(aRand.w), uHue);
  float grey = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(col, vec3(grey) * 0.9, uMono);
  vColor = col;
  vAlpha = (0.45 + 0.55 * aRand.x) * mix(1.0, 0.28 + 1.9 * rim, orbness * (1.0 - uMono * 0.5));
}`;

const FRAGMENT = /* glsl */ `
uniform float uOpacity;
varying vec3 vColor;
varying float vAlpha;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = smoothstep(0.5, 0.0, d);
  a *= a;
  gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
}`;

function glowTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(200,190,255,0.55)');
  grad.addColorStop(0.35, 'rgba(124,140,255,0.18)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class VoiceScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private group = new THREE.Group();
  private material: THREE.ShaderMaterial;
  private glow: THREE.Sprite;
  private clock = new THREE.Clock();
  private rot = 0;
  private pointer = new THREE.Vector2();
  private pointerTarget = new THREE.Vector2();
  private raf = 0;
  private disposed = false;

  /** Current (smoothed) state and the target it eases towards. */
  state: SceneState = { ...DEFAULT_STATE };
  target: SceneState = { ...DEFAULT_STATE };
  level = 0;
  private levelSmoothed = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setClearColor(0x000000, 0);
    this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    this.camera.position.set(0, 0, DEFAULT_STATE.z);

    const small = Math.min(window.innerWidth, window.innerHeight) < 700;
    const count = small ? 11000 : 26000;
    const aSphere = new Float32Array(count * 3);
    const aWave = new Float32Array(count * 3);
    const aRing = new Float32Array(count * 3);
    const aRand = new Float32Array(count * 4);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      // Fibonacci sphere with a thin shell so the orb has depth.
      const yy = 1 - (i / (count - 1)) * 2;
      const rad = Math.sqrt(1 - yy * yy);
      const th = golden * i;
      const shell = 1.55 * (0.9 + Math.random() * 0.1);
      aSphere.set([Math.cos(th) * rad * shell, yy * shell, Math.sin(th) * rad * shell], i * 3);
      aWave.set([Math.random() * 2 - 1, Math.floor(Math.random() * 7) / 6, Math.random()], i * 3);
      aRing.set([Math.random(), Math.random(), Math.random()], i * 3);
      aRand.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    geo.setAttribute('aSphere', new THREE.BufferAttribute(aSphere, 3));
    geo.setAttribute('aWave', new THREE.BufferAttribute(aWave, 3));
    geo.setAttribute('aRing', new THREE.BufferAttribute(aRing, 3));
    geo.setAttribute('aRand', new THREE.BufferAttribute(aRand, 4));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);

    this.material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uChaos: { value: DEFAULT_STATE.chaos },
        uLevel: { value: 0 },
        uSize: { value: small ? 2.4 : 2.0 },
        uPixelRatio: { value: 1 },
        uHue: { value: 0 },
        uMono: { value: 0 },
        uRot: { value: 0 },
        uWaveSpan: { value: 6.5 },
        uOpacity: { value: 1 },
      },
    });
    this.group.add(new THREE.Points(geo, this.material));

    this.glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    this.glow.scale.setScalar(7);
    this.group.add(this.glow);
    this.scene.add(this.group);

    this.resize();
    window.addEventListener('resize', this.resize);
    window.addEventListener('pointermove', this.onPointer, { passive: true });
    this.loop();
  }

  private onPointer = (e: PointerEvent) => {
    this.pointerTarget.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
  };

  resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const pr = Math.min(window.devicePixelRatio || 1, 1.75);
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.material.uniforms.uPixelRatio.value = pr;
    // Make the waveform span the visible width at its depth.
    const visibleW = 2 * Math.tan((this.camera.fov * Math.PI) / 360) * DEFAULT_STATE.z * this.camera.aspect;
    this.material.uniforms.uWaveSpan.value = Math.max(3.2, visibleW * 0.55);
  };

  private loop = () => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.elapsedTime;

    // Ease towards the scroll-driven target.
    const k = 1 - Math.pow(0.0025, dt);
    for (const key of Object.keys(this.state) as (keyof SceneState)[]) {
      this.state[key] += (this.target[key] - this.state[key]) * k;
    }
    this.levelSmoothed += (this.level - this.levelSmoothed) * (1 - Math.pow(0.0001, dt));
    this.pointer.lerp(this.pointerTarget, 1 - Math.pow(0.02, dt));

    const s = this.state;
    const u = this.material.uniforms;
    const orbness = 1 - Math.min(1, Math.max(0, s.morph));
    this.rot += dt * (0.08 + this.levelSmoothed * 0.6);
    u.uTime.value = t;
    u.uMorph.value = s.morph;
    u.uChaos.value = s.chaos;
    u.uLevel.value = this.levelSmoothed;
    u.uHue.value = s.hue;
    u.uMono.value = s.mono;
    u.uRot.value = this.rot;
    u.uOpacity.value = s.opacity;

    this.group.position.set(s.x + this.pointer.x * 0.15, s.y - this.pointer.y * 0.1, 0);
    this.group.rotation.x = this.pointer.y * 0.12 * orbness;
    this.group.rotation.y = this.pointer.x * 0.18 * orbness;
    const glowMat = this.glow.material as THREE.SpriteMaterial;
    const ringness = Math.min(1, Math.max(0, s.morph - 1));
    glowMat.opacity = (orbness * 0.55 + ringness * 0.35 + this.levelSmoothed * 0.4) * s.opacity * (1 - s.mono * 0.6);
    this.glow.scale.setScalar(6 + this.levelSmoothed * 2.5 + ringness * 2);
    this.camera.position.z = s.z;
    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('pointermove', this.onPointer);
    this.renderer.dispose();
  }
}
