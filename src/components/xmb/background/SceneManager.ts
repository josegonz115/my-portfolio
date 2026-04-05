import { Color, FogExp2, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { CYBER_FLAGS } from '../../../config/cyberFlags';
import { CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR, CAMERA_Z } from './constants';
import { OceanWaves } from './OceanWaves';
import { PerspectiveGrid } from './PerspectiveGrid';
import type { BackgroundState, Disposable } from './types';

function damp(current: number, target: number, lambda: number, delta: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

const BG_COLOR = CYBER_FLAGS.cyberPalette ? 0x050a0e : 0x000000;

export class SceneManager {
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private animationId = 0;
  private subsystems: Disposable[] = [];
  private state: BackgroundState;
  private disposed = false;

  // Manual time tracking
  private lastFrameTime = 0;
  private elapsedTime = 0;
  private running = true;

  // Smoothed camera values
  private targetCameraX = 0;
  private currentCameraX = 0;
  private targetCameraY = 0;
  private currentCameraY = 0;

  constructor(canvas: HTMLCanvasElement, initialState: BackgroundState) {
    this.state = { ...initialState };

    this.renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !initialState.isMobile,
      powerPreference: 'low-power',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, initialState.isMobile ? 1.5 : 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(new Color(BG_COLOR), 0);

    this.scene = new Scene();
    this.scene.fog = new FogExp2(BG_COLOR, 0.04);

    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new PerspectiveCamera(CAMERA_FOV, aspect, CAMERA_NEAR, CAMERA_FAR);
    this.camera.position.set(0, 0, CAMERA_Z);
    this.camera.lookAt(0, 0, 0);

    this.initSubsystems();
    this.updateCameraTargets();

    window.addEventListener('resize', this.onResize);
    document.addEventListener('visibilitychange', this.onVisibility);

    this.lastFrameTime = performance.now();
    this.animationId = requestAnimationFrame(this.animate);
  }

  private initSubsystems(): void {
    const isMobile = this.state.isMobile;

    if (CYBER_FLAGS.perspectiveGrid) {
      const grid = new PerspectiveGrid(this.scene, isMobile);
      this.subsystems.push(grid);
    } else {
      const ocean = new OceanWaves(this.scene, isMobile);
      this.subsystems.push(ocean);
    }
  }

  updateState(newState: BackgroundState): void {
    if (this.disposed) return;

    this.state = { ...newState };
    this.updateCameraTargets();
  }

  private updateCameraTargets(): void {
    // Camera X stays at 0 — the PerspectiveGrid shader handles horizontal
    // parallax via its uShiftX uniform. Moving the Three.js camera sideways
    // conflicts with the shader's own perspective math, causing a flip artifact.
    this.targetCameraX = 0;
    if (this.state.panelOpen) {
      this.targetCameraY = 0.1;
    } else {
      this.targetCameraY = 0;
    }
  }

  private animate = (): void => {
    if (this.disposed || !this.running) return;

    const now = performance.now();
    const delta = Math.min((now - this.lastFrameTime) / 1000, 0.1);
    this.lastFrameTime = now;
    this.elapsedTime += delta;

    // Damp camera
    this.currentCameraX = damp(this.currentCameraX, this.targetCameraX, 2.0, delta);
    this.currentCameraY = damp(this.currentCameraY, this.targetCameraY, 2.0, delta);
    this.camera.position.x = this.currentCameraX;
    this.camera.position.y = this.currentCameraY;

    // Update subsystems
    for (const sub of this.subsystems) {
      sub.update(this.elapsedTime, delta, this.state);
    }

    this.renderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(this.animate);
  };

  private onResize = (): void => {
    if (this.disposed) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private onVisibility = (): void => {
    if (this.disposed) return;
    if (document.hidden) {
      this.running = false;
      cancelAnimationFrame(this.animationId);
    } else {
      this.running = true;
      this.lastFrameTime = performance.now();
      this.animationId = requestAnimationFrame(this.animate);
    }
  };

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.running = false;

    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('visibilitychange', this.onVisibility);

    for (const sub of this.subsystems) {
      sub.dispose();
    }
    this.subsystems = [];

    this.scene.clear();
  }
}
