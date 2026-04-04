import { useRef, useEffect } from 'react';
import { SceneManager } from './background/SceneManager';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { XMBState } from '../../types/xmb';
import type { BackgroundState } from './background/types';

interface Props {
  state: XMBState;
}

export function XMBBackground({ state }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const managerRef = useRef<SceneManager | null>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  // Create scene manager once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initialState: BackgroundState = {
      activeCategoryIndex: state.activeCategoryIndex,
      panelOpen: state.panelOpen,
      navigationTimestamp: 0,
      isMobile,
    };

    const manager = new SceneManager(canvas, initialState);
    managerRef.current = manager;

    return () => {
      manager.dispose();
      managerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Push state updates to the scene manager (no React re-render needed)
  useEffect(() => {
    managerRef.current?.updateState({
      activeCategoryIndex: state.activeCategoryIndex,
      panelOpen: state.panelOpen,
      navigationTimestamp: performance.now(),
      isMobile,
    });
  }, [state.activeCategoryIndex, state.panelOpen, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
