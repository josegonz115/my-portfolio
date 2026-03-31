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
      className={`
        absolute right-0 top-0 h-full w-[60%] max-w-2xl
        xmb-glass border-l border-xmb-border
        transition-transform duration-350 ease-out
        overflow-y-auto
        ${panelOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      {selectedItem && selectedCategoryId && (
        <div
          className="p-8 animate-[xmb-fade-in_0.3s_ease-out_0.1s_both]"
        >
          {/* Close button */}
          <button
            onClick={() => dispatch({ type: 'BACK' })}
            className="absolute top-4 right-4 text-xmb-text-dim hover:text-xmb-accent transition-colors bg-transparent border-none cursor-pointer text-lg"
          >
            &times;
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
