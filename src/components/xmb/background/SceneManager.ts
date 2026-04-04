import { Color, FogExp2, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR, CAMERA_Z } from './constants';
import { MenacingKanji } from './MenacingKanji';
import type { BackgroundState, Disposable } from './types';

function damp(current: number, target: number, lambda: number, delta: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

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
    this.renderer.setClearColor(new Color(0x000000), 0);

    this.scene = new Scene();
    this.scene.fog = new FogExp2(0x000000, 0.04);

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

    // Menacing kanji
    const kanji = new MenacingKanji(this.scene, isMobile);
    this.subsystems.push(kanji);
  }

  updateState(newState: BackgroundState): void {
    if (this.disposed) return;

    this.state = { ...newState };
    this.updateCameraTargets();
  }

  private updateCameraTargets(): void {
    this.targetCameraX = (this.state.activeCategoryIndex - 2) * 0.3;
    if (this.state.panelOpen) {
      this.targetCameraX -= 0.5;
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
