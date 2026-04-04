import type { Scene } from 'three';
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute, LineSegments, ShaderMaterial } from 'three';
import { SPEED_LINE_COUNT, SPEED_LINE_COUNT_MOBILE } from './constants';
import type { BackgroundState, Disposable } from './types';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uRotationSpeed;
  uniform float uConvergeX;

  attribute float aOpacity;

  varying float vOpacity;

  void main() {
    vOpacity = aOpacity;

    float angle = uTime * uRotationSpeed;
    float cosA = cos(angle);
    float sinA = sin(angle);

    vec3 pos = position;

    // Rotate around Z axis
    float rx = pos.x * cosA - pos.y * sinA;
    float ry = pos.x * sinA + pos.y * cosA;
    pos.x = rx + uConvergeX;
    pos.y = ry;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vOpacity;

  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity);
  }
`;

export class SpeedLines implements Disposable {
  private lineSegments: LineSegments;
  private geometry: BufferGeometry;
  private material: ShaderMaterial;
  private scene: Scene;

  constructor(scene: Scene, isMobile: boolean) {
    this.scene = scene;
    const count = isMobile ? SPEED_LINE_COUNT_MOBILE : SPEED_LINE_COUNT;

    // Build line positions: radiate from center
    const positions: number[] = [];
    const opacities: number[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;

      // Inner radius — gap around center for UI
      const innerR = 1.5 + Math.random() * 1.5;
      // Outer radius — extend past screen
      const outerR = innerR + 2.0 + Math.random() * 5.0;

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Start point
      positions.push(cosA * innerR, sinA * innerR, 0);
      // End point
      positions.push(cosA * outerR, sinA * outerR, 0);

      // Opacity: thicker/brighter near certain angles, varying
      const baseOpacity = 0.02 + Math.random() * 0.06;
      opacities.push(baseOpacity, baseOpacity * 0.3); // fade at tips
    }

    this.geometry = new BufferGeometry();
    this.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    this.geometry.setAttribute('aOpacity', new Float32BufferAttribute(opacities, 1));

    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uRotationSpeed: { value: 0.03 },
        uConvergeX: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    this.lineSegments = new LineSegments(this.geometry, this.material);
    this.lineSegments.frustumCulled = false;
    this.lineSegments.position.z = -2;
    scene.add(this.lineSegments);
  }

  setIntensity(value: number): void {
    this.material.uniforms.uRotationSpeed.value = 0.03 * value;
  }

  setConvergeX(value: number): void {
    this.material.uniforms.uConvergeX.value = value;
  }

  update(time: number, _delta: number, _state: BackgroundState): void {
    this.material.uniforms.uTime.value = time;
  }

  dispose(): void {
    this.scene.remove(this.lineSegments);
    this.geometry.dispose();
    this.material.dispose();
  }
}
