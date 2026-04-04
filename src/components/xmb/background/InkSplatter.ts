import type { Scene } from 'three';
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute, Points, ShaderMaterial } from 'three';
import { INK_COUNT_DESKTOP, INK_COUNT_MOBILE } from './constants';
import type { BackgroundState, Disposable } from './types';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;

  attribute float aPhase;
  attribute float aCycleLength;
  attribute float aSize;

  varying float vOpacity;

  void main() {
    // Each particle has its own cycle timing
    float cyclePos = mod(uTime + aPhase, aCycleLength) / aCycleLength;

    // Splash in (0-0.1), hold (0.1-0.6), fade out (0.6-1.0)
    float splashIn = smoothstep(0.0, 0.08, cyclePos);
    float fadeOut = 1.0 - smoothstep(0.5, 1.0, cyclePos);
    vOpacity = splashIn * fadeOut * 0.12;

    // Scale: pop in from nothing
    float scale = splashIn;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * scale * uPixelRatio * (150.0 / -mvPosition.z);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vOpacity;

  void main() {
    // Sharper ink blot edge
    float dist = distance(gl_PointCoord, vec2(0.5));
    float alpha = smoothstep(0.5, 0.3, dist) * vOpacity;

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
  }
`;

export class InkSplatter implements Disposable {
  private points: Points;
  private geometry: BufferGeometry;
  private material: ShaderMaterial;
  private scene: Scene;

  constructor(scene: Scene, isMobile: boolean) {
    this.scene = scene;
    const count = isMobile ? INK_COUNT_MOBILE : INK_COUNT_DESKTOP;

    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const cycleLengths = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = -1 - Math.random() * 4;

      phases[i] = Math.random() * 10; // stagger start times
      cycleLengths[i] = 4.0 + Math.random() * 4.0; // 4-8s per cycle
      sizes[i] = 3.0 + Math.random() * 8.0;
    }

    this.geometry = new BufferGeometry();
    this.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    this.geometry.setAttribute('aPhase', new Float32BufferAttribute(phases, 1));
    this.geometry.setAttribute('aCycleLength', new Float32BufferAttribute(cycleLengths, 1));
    this.geometry.setAttribute('aSize', new Float32BufferAttribute(sizes, 1));

    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: {
          value: Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2),
        },
      },
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    this.points = new Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    scene.add(this.points);
  }

  update(time: number, _delta: number, _state: BackgroundState): void {
    this.material.uniforms.uTime.value = time;
  }

  dispose(): void {
    this.scene.remove(this.points);
    this.geometry.dispose();
    this.material.dispose();
  }
}
