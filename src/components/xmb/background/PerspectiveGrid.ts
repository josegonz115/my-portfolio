import type { Scene } from 'three';
import { DoubleSide, Mesh, PlaneGeometry, ShaderMaterial, Vector3 } from 'three';
import { CYBER_FLAGS } from '../../../config/cyberFlags';
import { GRID_ALPHA, GRID_SCROLL_SPEED } from './constants';
import type { BackgroundState, Disposable } from './types';

const GRID_COLOR = CYBER_FLAGS.cyberPalette ? { r: 0.0, g: 0.83, b: 0.67 } : { r: 1.0, g: 1.0, b: 1.0 };

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
  uniform float uScrollSpeed;
  uniform float uShiftX;
  uniform vec3 uColor;

  varying vec2 vUv;

  // Filtered grid line — returns 0..1 intensity without flicker.
  // Uses the integral of the repeating pattern over the pixel footprint
  // so that sub-pixel movement never causes popping.
  float gridLine(float coord, float fw) {
    // Half-width of the line in grid-cell units (thin crisp lines)
    float lineWidth = 0.005;
    // The pixel covers coord ± fw/2.  Compute the fraction of that
    // interval that falls inside the line (|fract(c)-0.5| < lineWidth).
    // Saturate fw so we never divide by zero.
    float hw = max(fw, 0.0001);
    // Analytical box-filter: smoothstep across one pixel on each edge
    float cell = fract(coord);
    float d = abs(cell - 0.5);
    return 1.0 - smoothstep(lineWidth, lineWidth + hw, d);
  }

  void main() {
    vec2 uv = vUv;
    uv.x += uShiftX;

    // === HORIZON ===
    float horizon = 0.62;
    float belowHorizon = horizon - uv.y;

    // Above horizon: subtle glow falloff
    if (belowHorizon <= 0.0) {
      float horizonGlow = smoothstep(0.06, 0.0, -belowHorizon);
      gl_FragColor = vec4(uColor, horizonGlow * 0.2 * uAlpha);
      return;
    }

    // === PERSPECTIVE DEPTH MAPPING ===
    float depth = 1.0 / (belowHorizon + 0.008);
    depth = min(depth, 35.0);

    // World-space coordinates
    float worldZ = depth * 2.0 - uTime * uScrollSpeed;
    float worldX = (uv.x - 0.5) * depth * 3.5;

    // === GRID LINES (flicker-free filtered) ===
    float gridSpacing = 1.0;
    float coordZ = worldZ / gridSpacing;
    float coordX = worldX / gridSpacing;

    // Screen-space derivatives — how much the coordinate changes per pixel
    float fwZ = fwidth(coordZ);
    float fwX = fwidth(coordX);

    float hLine = gridLine(coordZ, fwZ);
    float vLine = gridLine(coordX, fwX);

    float grid = max(hLine, vLine);

    // === DEPTH FOG — fade distant lines ===
    float fog = smoothstep(35.0, 3.0, depth);

    // === HORIZON GLOW ===
    float glow = smoothstep(0.15, 0.0, belowHorizon) * 0.35;

    // === EDGE FADE — cinematic ===
    float edgeFade = smoothstep(0.0, 0.12, uv.x) * smoothstep(1.0, 0.88, uv.x);

    // === BOTTOM FADE — gentle fadeout at bottom ===
    float bottomFade = smoothstep(0.0, 0.06, uv.y);

    float finalAlpha = (grid * fog * 0.6 + glow) * edgeFade * bottomFade * uAlpha;

    gl_FragColor = vec4(uColor, finalAlpha);
  }
`;

export class PerspectiveGrid implements Disposable {
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
        uAlpha: { value: GRID_ALPHA },
        uScrollSpeed: { value: GRID_SCROLL_SPEED },
        uShiftX: { value: 0.0 },
        uColor: { value: new Vector3(GRID_COLOR.r, GRID_COLOR.g, GRID_COLOR.b) },
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

  update(time: number, delta: number, state: BackgroundState): void {
    this.material.uniforms.uTime.value = time;

    // Shift grid for navigation parallax + panel open
    const navShift = (state.activeCategoryIndex - 2) * -0.015;
    const panelShift = state.panelOpen ? -0.08 : 0;
    const targetShift = navShift + panelShift;
    const current = this.material.uniforms.uShiftX.value as number;
    // Frame-rate-independent damping (lambda=3.0 for smooth, responsive feel)
    this.material.uniforms.uShiftX.value = current + (targetShift - current) * (1 - Math.exp(-3.0 * delta));
  }

  dispose(): void {
    this.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }
}
