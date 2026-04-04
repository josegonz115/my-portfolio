import { type Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import type { XMBAction, XMBState } from '../../types/xmb';
import { DetailAbout } from './details/DetailAbout';
import { DetailContact } from './details/DetailContact';
import { DetailProject } from './details/DetailProject';
import { DetailResearch } from './details/DetailResearch';
import { DetailResume } from './details/DetailResume';

interface Props {
  state: XMBState;
  dispatch: Dispatch<XMBAction>;
}

export function XMBDetailPanel({ state, dispatch }: Props) {
  const { panelOpen, selectedItem, selectedCategoryId } = state;
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [showTopBorder, setShowTopBorder] = useState(true);
  const [showBottomBorder, setShowBottomBorder] = useState(false);

  const updateScrollBorders = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      setShowTopBorder(true);
      setShowBottomBorder(false);
      return;
    }

    const maxScrollTop = scroller.scrollHeight - scroller.clientHeight;
    const hasOverflow = maxScrollTop > 1;
    const atTop = scroller.scrollTop <= 1;
    const atBottom = maxScrollTop - scroller.scrollTop <= 1;

    setShowTopBorder(!hasOverflow || atTop);
    setShowBottomBorder(hasOverflow && atBottom);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!panelOpen || !selectedItem || !selectedCategoryId || !scroller) {
      setShowTopBorder(true);
      setShowBottomBorder(false);
      return;
    }

    const rafId = requestAnimationFrame(() => {
      updateScrollBorders();
    });

    const resizeObserver = new ResizeObserver(() => {
      updateScrollBorders();
    });
    resizeObserver.observe(scroller);
    const content = scroller.firstElementChild;
    if (content instanceof HTMLElement) {
      resizeObserver.observe(content);
    }

    window.addEventListener('resize', updateScrollBorders);
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateScrollBorders);
    };
  }, [panelOpen, selectedItem, selectedCategoryId, updateScrollBorders]);

  return (
    <div
      className="absolute right-0 top-0 h-full w-[60%] max-w-2xl bg-black border-l-[3px] border-white"
      style={{
        transform: panelOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
    >
      {/* Top accent line — solid white */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-white z-10 pointer-events-none transition-opacity duration-200"
        style={{ opacity: showTopBorder ? 1 : 0 }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white z-10 pointer-events-none transition-opacity duration-200"
        style={{ opacity: showBottomBorder ? 1 : 0 }}
      />

      {selectedItem && selectedCategoryId && (
        <>
          {/* Close — bold X */}
          <button
            type="button"
            onClick={() => dispatch({ type: 'BACK' })}
            className="absolute top-5 right-5 z-20 bg-transparent border-none cursor-pointer group"
            style={{ transition: 'opacity 0.3s ease' }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-white/40 group-hover:text-white"
              style={{ transition: 'color 0.3s ease' }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div ref={scrollerRef} onScroll={updateScrollBorders} className="relative z-0 h-full overflow-y-auto">
            <div
              className="p-8 pt-6"
              style={{
                animation: panelOpen ? 'xmb-fade-in 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.15s both' : 'none',
              }}
            >
              {selectedCategoryId === 'about' && <DetailAbout item={selectedItem} />}
              {selectedCategoryId === 'projects' && <DetailProject item={selectedItem} />}
              {selectedCategoryId === 'research' && <DetailResearch item={selectedItem} />}
              {selectedCategoryId === 'resume' && <DetailResume item={selectedItem} />}
              {selectedCategoryId === 'contact' && <DetailContact item={selectedItem} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
