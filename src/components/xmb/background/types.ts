export interface BackgroundState {
  activeCategoryIndex: number;
  panelOpen: boolean;
  navigationTimestamp: number;
  isMobile: boolean;
}

export interface Disposable {
  dispose(): void;
  update(time: number, delta: number, state: BackgroundState): void;
}
