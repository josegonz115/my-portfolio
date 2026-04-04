import type { Dispatch } from 'react';
import type { XMBState, XMBAction } from '../../types/xmb';
import { XMBBackground } from './XMBBackground';
import { XMBBar } from './XMBBar';
import { XMBDetailPanel } from './XMBDetailPanel';
import { XMBStatusBar } from './XMBStatusBar';
import { XMBMobileNav } from './XMBMobileNav';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface SoundControls {
  muted: boolean;
  toggleMute: () => void;
}

interface Props {
  state: XMBState;
  dispatch: Dispatch<XMBAction>;
  sound?: SoundControls;
}

export function XMBLayout({ state, dispatch, sound }: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div className="relative w-full h-screen overflow-hidden select-none" tabIndex={0}>
      {/* Cinematic background canvas */}
      <XMBBackground state={state} />

      {/* Vignette overlay */}
      <div className="vignette" />

      {/* Halftone overlay — manga screentone */}
      <div className="halftone-overlay" />

      <div className="relative z-10 flex flex-col w-full h-full">
        <XMBStatusBar
          panelOpen={state.panelOpen}
          muted={sound?.muted ?? false}
          onToggleMute={sound?.toggleMute}
        />

        {isDesktop ? (
          <div className="flex-1 flex items-center relative overflow-hidden">
            {/* XMB Bar — shifts left with cinematic easing when panel opens */}
            <div
              className="w-full"
              style={{
                transform: state.panelOpen ? 'translateX(-35%)' : 'translateX(0)',
                opacity: state.panelOpen ? 0.15 : 1,
                transition: 'transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.6s ease',
              }}
            >
              <XMBBar state={state} dispatch={dispatch} />
            </div>

            {/* Detail panel slides in from right */}
            <XMBDetailPanel state={state} dispatch={dispatch} />
          </div>
        ) : (
          <XMBMobileNav state={state} dispatch={dispatch} />
        )}
      </div>
    </div>
  );
}
