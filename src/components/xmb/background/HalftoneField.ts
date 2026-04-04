import type { Scene } from 'three';
import { DoubleSide, Mesh, PlaneGeometry, ShaderMaterial } from 'three';
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
  uniform float uResolution;
  uniform float uShiftX;
  uniform float uAlpha;

  varying vec2 vUv;

  void main() {
    // Tile UV into grid cells
    vec2 cellUv = fract(vUv * uResolution);
    vec2 cellCenter = floor(vUv * uResolution) / uResolution;

    // Distance from center of each cell
    float dist = distance(cellUv, vec2(0.5));

    // Gradient: larger dots at edges, smaller at center (where UI lives)
    float centerDist = distance(cellCenter, vec2(0.5 + uShiftX, 0.5));
    float gradientValue = smoothstep(0.1, 0.6, centerDist);

    // Subtle breathing
    float breathe = 1.0 + 0.08 * sin(uTime * 0.4);
    float radius = gradientValue * 0.38 * breathe;

    // Draw dot
    float dot = smoothstep(radius, radius - 0.06, dist);

    gl_FragColor = vec4(vec3(1.0), dot * uAlpha);
  }
`;

export class HalftoneField implements Disposable {
  private mesh: Mesh;
  private geometry: PlaneGeometry;
  private material: ShaderMaterial;
  private scene: Scene;

  constructor(scene: Scene, _isMobile: boolean) {
    this.scene = scene;

    this.geometry = new PlaneGeometry(22, 16);

    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: 48.0 },
        uShiftX: { value: 0.0 },
        uAlpha: { value: 0.04 },
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
    // Shift gradient center when panel opens
    const targetShift = state.panelOpen ? -0.15 : 0;
    const current = this.material.uniforms.uShiftX.value as number;
    this.material.uniforms.uShiftX.value = current + (targetShift - current) * 0.02;
  }

  dispose(): void {
    this.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }
}
