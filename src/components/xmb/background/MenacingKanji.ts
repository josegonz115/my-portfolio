import type { Scene } from 'three';
import { AdditiveBlending, CanvasTexture, DoubleSide, Mesh, PlaneGeometry, ShaderMaterial } from 'three';
import { KANJI_COUNT, KANJI_COUNT_MOBILE } from './constants';
import type { BackgroundState, Disposable } from './types';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDriftSpeed;
  uniform float uInitPhase;
  uniform float uInitY;

  varying vec2 vUv;

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Slow upward drift with wrapping
    float y = mod(uInitY + uTime * uDriftSpeed, 12.0) - 6.0;
    pos.y += y;

    // Gentle horizontal sway
    pos.x += sin(uTime * 0.3 + uInitPhase) * 0.3;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uAlpha;

  varying vec2 vUv;

  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    gl_FragColor = vec4(tex.rgb, tex.a * uAlpha);
  }
`;

function createKanjiTexture(): CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D context from canvas');
  }
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = '#A855F7';
  ctx.font = 'bold 100px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('\u30B4', size / 2, size / 2); // ゴ

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export class MenacingKanji implements Disposable {
  private meshes: Mesh[] = [];
  private materials: ShaderMaterial[] = [];
  private geometries: PlaneGeometry[] = [];
  private texture: CanvasTexture;
  private scene: Scene;

  constructor(scene: Scene, isMobile: boolean) {
    this.scene = scene;
    const count = isMobile ? KANJI_COUNT_MOBILE : KANJI_COUNT;

    this.texture = createKanjiTexture();

    for (let i = 0; i < count; i++) {
      const size = 0.8 + Math.random() * 1.2;
      const geometry = new PlaneGeometry(size, size);
      this.geometries.push(geometry);

      const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uTexture: { value: this.texture },
          uAlpha: { value: 0.04 + Math.random() * 0.05 },
          uDriftSpeed: { value: 0.08 + Math.random() * 0.12 },
          uInitPhase: { value: Math.random() * Math.PI * 2 },
          uInitY: { value: Math.random() * 12.0 },
        },
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        side: DoubleSide,
      });
      this.materials.push(material);

      const mesh = new Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 12, // X spread
        0,
        -3 - Math.random() * 4, // Z depth: -3 to -7
      );
      mesh.rotation.z = -0.1 + Math.random() * 0.2; // slight tilt
      mesh.frustumCulled = false;
      scene.add(mesh);
      this.meshes.push(mesh);
    }
  }

  update(time: number, _delta: number, state: BackgroundState): void {
    for (const mat of this.materials) {
      mat.uniforms.uTime.value = time;
      const targetAlpha = state.panelOpen ? 0.08 : (mat.uniforms.uAlpha.value as number);
      const currentAlpha = mat.uniforms.uAlpha.value as number;
      mat.uniforms.uAlpha.value = currentAlpha + (targetAlpha - currentAlpha) * 0.01;
    }
  }

  dispose(): void {
    for (const mesh of this.meshes) {
      this.scene.remove(mesh);
    }
    for (const geo of this.geometries) {
      geo.dispose();
    }
    for (const mat of this.materials) {
      mat.dispose();
    }
    this.texture.dispose();
  }
}
