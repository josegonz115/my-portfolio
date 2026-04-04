import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  FogExp2,
  Color,
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
} from 'three';
import type { BackgroundState, Disposable } from './types';
import { CAMERA_FOV, CAMERA_NEAR, CAMERA_FAR, CAMERA_Z } from './constants';
import { SpeedLines } from './SpeedLines';
import { HalftoneField } from './HalftoneField';
import { MenacingKanji } from './MenacingKanji';
import { InkSplatter } from './InkSplatter';
import { CrossHatch } from './CrossHatch';

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

  // Speed lines reactivity
  private lineIntensityTarget = 1.0;
  private lineIntensityCurrent = 1.0;
  private lastNavTimestamp = 0;
  private speedLines: SpeedLines | null = null;

  // Impact flash
  private flashMesh: Mesh;
  private flashMaterial: MeshBasicMaterial;
  private flashOpacity = 0;

  constructor(canvas: HTMLCanvasElement, initialState: BackgroundState) {
    this.state = { ...initialState };

    this.renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !initialState.isMobile,
      powerPreference: 'low-power',
    });
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, initialState.isMobile ? 1.5 : 2)
    );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(new Color(0x000000), 0);

    this.scene = new Scene();
    this.scene.fog = new FogExp2(0x000000, 0.04);

    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new PerspectiveCamera(CAMERA_FOV, aspect, CAMERA_NEAR, CAMERA_FAR);
    this.camera.position.set(0, 0, CAMERA_Z);
    this.camera.lookAt(0, 0, 0);

    // Impact flash plane (in front of everything)
    const flashGeo = new PlaneGeometry(20, 14);
    this.flashMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    this.flashMesh = new Mesh(flashGeo, this.flashMaterial);
    this.flashMesh.position.z = 1;
    this.flashMesh.frustumCulled = false;
    this.scene.add(this.flashMesh);

    this.initSubsystems();
    this.updateCameraTargets();

    window.addEventListener('resize', this.onResize);
    document.addEventListener('visibilitychange', this.onVisibility);

    this.lastFrameTime = performance.now();
    this.animationId = requestAnimationFrame(this.animate);
  }

  private initSubsystems(): void {
    const isMobile = this.state.isMobile;

    // Halftone (farthest back)
    const halftone = new HalftoneField(this.scene, isMobile);
    this.subsystems.push(halftone);

    // Cross-hatch texture
    const crosshatch = new CrossHatch(this.scene, isMobile);
    this.subsystems.push(crosshatch);

    // Speed lines (core visual)
    const lines = new SpeedLines(this.scene, isMobile);
    this.speedLines = lines;
    this.subsystems.push(lines);

    // Menacing kanji
    const kanji = new MenacingKanji(this.scene, isMobile);
    this.subsystems.push(kanji);

    // Ink splatter (nearest)
    const ink = new InkSplatter(this.scene, isMobile);
    this.subsystems.push(ink);
  }

  updateState(newState: BackgroundState): void {
    if (this.disposed) return;

    const categoryChanged = newState.activeCategoryIndex !== this.state.activeCategoryIndex;
    const panelChanged = newState.panelOpen !== this.state.panelOpen;
    const panelOpening = !this.state.panelOpen && newState.panelOpen;

    this.state = { ...newState };
    this.updateCameraTargets();

    // Navigation impulse: spike speed lines
    if (categoryChanged || panelChanged) {
      this.lastNavTimestamp = performance.now();
      if (!newState.panelOpen) {
        this.lineIntensityTarget = 3.0;
      }
    }

    // Panel open: slow lines, trigger impact flash
    if (newState.panelOpen) {
      this.lineIntensityTarget = 0.5;
      this.speedLines?.setConvergeX(1.0); // converge rightward toward panel
    } else {
      this.speedLines?.setConvergeX(0);
    }

    // Impact flash on panel open
    if (panelOpening) {
      this.flashOpacity = 0.6;
    }
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

    // Damp speed line intensity
    const timeSinceNav = now - this.lastNavTimestamp;
    if (!this.state.panelOpen && timeSinceNav > 600) {
      this.lineIntensityTarget = 1.0;
    }
    this.lineIntensityCurrent = damp(this.lineIntensityCurrent, this.lineIntensityTarget, 4.0, delta);
    this.speedLines?.setIntensity(this.lineIntensityCurrent);

    // Impact flash decay
    if (this.flashOpacity > 0.001) {
      this.flashOpacity = damp(this.flashOpacity, 0, 8.0, delta);
      this.flashMaterial.opacity = this.flashOpacity;
    } else {
      this.flashMaterial.opacity = 0;
    }

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
    this.speedLines = null;

    this.scene.remove(this.flashMesh);
    this.flashMaterial.dispose();

    this.scene.clear();
  }
}
