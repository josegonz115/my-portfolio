import {
  BufferGeometry,
  Float32BufferAttribute,
  LineSegments,
  ShaderMaterial,
  AdditiveBlending,
} from 'three';
import type { Scene } from 'three';
import type { Disposable, BackgroundState } from './types';
import { CROSSHATCH_LINE_COUNT, CROSSHATCH_LINE_COUNT_MOBILE } from './constants';

const vertexShader = /* glsl */ `
  attribute float aOpacity;
  varying float vOpacity;

  void main() {
    vOpacity = aOpacity;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vOpacity;

  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity);
  }
`;

export class CrossHatch implements Disposable {
  private lineSegments: LineSegments;
  private geometry: BufferGeometry;
  private material: ShaderMaterial;
  private scene: Scene;

  constructor(scene: Scene, isMobile: boolean) {
    this.scene = scene;
    const count = isMobile ? CROSSHATCH_LINE_COUNT_MOBILE : CROSSHATCH_LINE_COUNT;

    const positions: number[] = [];
    const opacities: number[] = [];

    const lineLength = 0.4;
    const cos45 = Math.cos(Math.PI / 4) * lineLength;
    const sin45 = Math.sin(Math.PI / 4) * lineLength;

    for (let i = 0; i < count; i++) {
      const cx = (Math.random() - 0.5) * 16;
      const cy = (Math.random() - 0.5) * 10;
      const cz = -4 - Math.random() * 2;
      const opacity = 0.02 + Math.random() * 0.04;

      // Forward slash line ( / )
      positions.push(cx - cos45, cy - sin45, cz);
      positions.push(cx + cos45, cy + sin45, cz);
      opacities.push(opacity, opacity);

      // Back slash line ( \ )
      positions.push(cx + cos45, cy - sin45, cz);
      positions.push(cx - cos45, cy + sin45, cz);
      opacities.push(opacity, opacity);
    }

    this.geometry = new BufferGeometry();
    this.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    this.geometry.setAttribute('aOpacity', new Float32BufferAttribute(opacities, 1));

    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    this.lineSegments = new LineSegments(this.geometry, this.material);
    this.lineSegments.frustumCulled = false;
    scene.add(this.lineSegments);
  }

  update(_time: number, _delta: number, _state: BackgroundState): void {
    // Static texture — no per-frame updates needed
  }

  dispose(): void {
    this.scene.remove(this.lineSegments);
    this.geometry.dispose();
    this.material.dispose();
  }
}
