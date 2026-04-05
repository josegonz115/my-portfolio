import { type Dispatch, useCallback, useEffect, useRef } from 'react';
import type { XMBAction, XMBState } from '../types/xmb';

interface SoundCallbacks {
  playNavigate: () => void;
  playSelect: () => void;
  playBack: () => void;
}

export function useXMBNavigation(state: XMBState, dispatch: Dispatch<XMBAction>, sound?: SoundCallbacks) {
  const soundRef = useRef(sound);
  soundRef.current = sound;

  // Keyboard handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const s = soundRef.current;
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          s?.playNavigate();
          dispatch({ type: 'MOVE_LEFT' });
          break;
        case 'ArrowRight':
          e.preventDefault();
          s?.playNavigate();
          dispatch({ type: 'MOVE_RIGHT' });
          break;
        case 'ArrowUp':
          e.preventDefault();
          s?.playNavigate();
          dispatch({ type: 'MOVE_UP' });
          break;
        case 'ArrowDown':
          e.preventDefault();
          s?.playNavigate();
          dispatch({ type: 'MOVE_DOWN' });
          break;
        case 'Enter':
          e.preventDefault();
          s?.playSelect();
          dispatch({ type: 'SELECT' });
          break;
        case 'Escape':
        case 'Backspace':
          e.preventDefault();
          s?.playBack();
          dispatch({ type: 'BACK' });
          break;
      }
    },
    [dispatch],
  );

  // Attach keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Sync URL hash
  useEffect(() => {
    const { categories, activeCategoryIndex, activeItemIndex } = state;
    const cat = categories[activeCategoryIndex];
    if (!cat) return;
    const itemIndex = activeItemIndex[cat.id];
    const item = cat.items[itemIndex];
    const hash = item ? `#${cat.id}/${item.id}` : `#${cat.id}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
  }, [state]);
}
