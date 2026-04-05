import type { Scene } from 'three';
import { DoubleSide, Mesh, PlaneGeometry, ShaderMaterial } from 'three';
import { OCEAN_WAVE_COUNT, OCEAN_WAVE_COUNT_MOBILE } from './constants';
import type { BackgroundState, Disposable } from './types';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uAlpha;
  uniform int uWaveCount;
  uniform float uSpeed;
  uniform float uShiftX;

  varying vec2 vUv;

  // --- Hash-based value noise (no texture lookups) ---
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // --- Asymmetric wave shape (sharp crests, broad troughs) ---
  float computeWave(float x, int layer, float time) {
    float layerF = float(layer);
    float speed = (0.12 + layerF * 0.025) * time;
    float px = x * 5.0 + speed;

    // Primary swell with sharpened crests
    float s = sin(px + layerF * 1.7);
    float wave = sign(s) * pow(abs(s), 0.7) * 0.08;

    // Secondary chop + ripples
    wave += sin(px * 2.3 + layerF * 0.9) * 0.035;
    wave += sin(px * 4.1 + layerF * 2.4) * 0.015;

    // Single noise call for hand-drawn jitter
    wave += (noise(vec2(px * 4.0, layerF * 7.3 + time * 0.06)) - 0.5) * 0.02;

    return wave;
  }

  void main() {
    vec2 uv = vUv;
    uv.x += uShiftX;

    float totalAlpha = 0.0;
    float time = uTime * uSpeed;

    for (int i = 0; i < 12; i++) {
      if (i >= uWaveCount) break;

      float layerF = float(i);
      float yBase = 0.10 + layerF * 0.07;

      // === Only 2 computeWave calls per layer ===
      float waveY = computeWave(uv.x, i, time);
      float waveYNext = computeWave(uv.x + 0.005, i, time);

      // Derive everything from these two samples
      float deriv = (waveYNext - waveY) / 0.005;

      // Crest detection: wave is high and near a peak
      float waveHeight = smoothstep(0.02, 0.08, waveY);
      float nearPeak = 1.0 - smoothstep(0.0, 0.5, abs(deriv));
      float crestAmount = waveHeight * nearPeak;

      // Stroke thickness: thicker at crests, pen-pressure variation via sin (no noise)
      float base = 0.004 + layerF * 0.0003;
      base *= 1.0 + crestAmount * 1.5;
      float thick = base * (0.7 + 0.3 * sin(uv.x * 12.0 + layerF * 2.5));

      // --- Primary wave trace ---
      float dist = abs(uv.y - yBase - waveY);
      float line = smoothstep(thick, thick * 0.25, dist);

      // --- Scribble double (reuse waveYNext with offset) ---
      float dist2 = abs(uv.y - yBase - waveYNext - 0.0025);
      float line2 = smoothstep(thick * 0.7, thick * 0.15, dist2);

      // --- Curl stroke: single parabolic arc at crests ---
      float curl = 0.0;
      float curlIntensity = smoothstep(0.3, 0.8, crestAmount);
      // Parameterize arc relative to pixel position
      float arcT = clamp((uv.x - uv.x + 0.005) * 30.0, 0.0, 1.0);
      // Use crest position to create a dropping arc
      float curlDrop = crestAmount * crestAmount * 0.025;
      float curlDist = abs(uv.y - yBase - waveY + curlDrop);
      float curlThick = thick * 1.2 * curlIntensity;
      curl = smoothstep(curlThick, curlThick * 0.25, curlDist) * curlIntensity * 0.7;

      // --- Foam spray: single noise call, no fbm ---
      float foamIntensity = smoothstep(0.2, 0.7, crestAmount);
      float foamN = noise(uv * 80.0 + vec2(time * 0.3 + layerF * 3.0, layerF * 7.0));
      float aboveWave = uv.y - (yBase + waveY);
      float foamBand = smoothstep(0.0, 0.005, aboveWave) * smoothstep(0.04, 0.01, aboveWave);
      float foam = smoothstep(0.55, 0.58, foamN) * foamBand * foamIntensity * 0.6;

      // Layer opacity
      float opacity = 0.8 - layerF * 0.055;

      totalAlpha += (line + line2 * 0.5 + curl + foam) * opacity;
    }

    totalAlpha = min(totalAlpha, 1.0);

    gl_FragColor = vec4(1.0, 1.0, 1.0, totalAlpha * uAlpha);
  }
`;

export class OceanWaves implements Disposable {
  private mesh: Mesh;
  private geometry: PlaneGeometry;
  private material: ShaderMaterial;
  private scene: Scene;

  constructor(scene: Scene, isMobile: boolean) {
    this.scene = scene;

    this.geometry = new PlaneGeometry(22, 16);

    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uAlpha: { value: 0.45 },
        uWaveCount: { value: isMobile ? OCEAN_WAVE_COUNT_MOBILE : OCEAN_WAVE_COUNT },
        uSpeed: { value: 1.0 },
        uShiftX: { value: 0.0 },
      },
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.z = -8;
    this.mesh.frustumCulled = false;
    scene.add(this.mesh);
  }

  update(time: number, _delta: number, state: BackgroundState): void {
    this.material.uniforms.uTime.value = time;

    // Shift wave pattern when panel opens
    const targetShift = state.panelOpen ? -0.1 : 0;
    const current = this.material.uniforms.uShiftX.value as number;
    this.material.uniforms.uShiftX.value = current + (targetShift - current) * 0.02;
  }

  dispose(): void {
    this.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }
}
