import type { Dispatch } from 'react';
import type { XMBState, XMBAction } from '../../types/xmb';
import { DetailAbout } from './details/DetailAbout';
import { DetailProject } from './details/DetailProject';
import { DetailResearch } from './details/DetailResearch';
import { DetailResume } from './details/DetailResume';
import { DetailContact } from './details/DetailContact';

interface Props {
  state: XMBState;
  dispatch: Dispatch<XMBAction>;
}

export function XMBDetailPanel({ state, dispatch }: Props) {
  const { panelOpen, selectedItem, selectedCategoryId } = state;

  return (
    <div
      className="absolute right-0 top-0 h-full w-[60%] max-w-2xl xmb-glass overflow-y-auto"
      style={{
        transform: panelOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)',
        borderLeft: '1px solid rgba(200, 164, 78, 0.06)',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200, 164, 78, 0.15), transparent)',
        }}
      />

      {selectedItem && selectedCategoryId && (
        <div
          className="p-8 pt-6"
          style={{
            animation: panelOpen ? 'xmb-fade-in 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s both' : 'none',
          }}
        >
          {/* Close — minimal, tactical */}
          <button
            onClick={() => dispatch({ type: 'BACK' })}
            className="absolute top-5 right-5 bg-transparent border-none cursor-pointer group"
            style={{ transition: 'opacity 0.4s ease' }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-xmb-text-dim/40 group-hover:text-xmb-accent/60" style={{ transition: 'color 0.4s ease' }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {selectedCategoryId === 'about' && <DetailAbout item={selectedItem} />}
          {selectedCategoryId === 'projects' && <DetailProject item={selectedItem} />}
          {selectedCategoryId === 'research' && <DetailResearch item={selectedItem} />}
          {selectedCategoryId === 'resume' && <DetailResume item={selectedItem} />}
          {selectedCategoryId === 'contact' && <DetailContact item={selectedItem} />}
        </div>
      )}
    </div>
  );
}
