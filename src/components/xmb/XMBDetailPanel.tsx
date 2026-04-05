import { type Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { ACCENT, BG_DARK } from '../../config/cyberFlags';
import type { XMBAction, XMBState } from '../../types/xmb';
import { DetailAbout } from './details/DetailAbout';
import { DetailContact } from './details/DetailContact';
import { DetailProject } from './details/DetailProject';
import { DetailResearch } from './details/DetailResearch';
import { DetailResume } from './details/DetailResume';

interface Props {
  state: XMBState;
  dispatch: Dispatch<XMBAction>;
  onBack?: () => void;
}

export function XMBDetailPanel({ state, dispatch, onBack }: Props) {
  const { panelOpen, selectedItem, selectedCategoryId } = state;
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [showTopBorder, setShowTopBorder] = useState(true);
  const [showBottomBorder, setShowBottomBorder] = useState(false);

  const borderColor = ACCENT;

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
      className="absolute right-0 top-0 h-full w-[75%]"
      style={{
        backgroundColor: BG_DARK,
        borderLeft: `3px solid ${borderColor}`,
        transform: panelOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-10 pointer-events-none transition-opacity duration-200"
        style={{ backgroundColor: borderColor, opacity: showTopBorder ? 1 : 0 }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-10 pointer-events-none transition-opacity duration-200"
        style={{ backgroundColor: borderColor, opacity: showBottomBorder ? 1 : 0 }}
      />

      {selectedItem && selectedCategoryId && (
        <>
          {/* Desktop back button: outside detail panel boundary */}
          <button
            type="button"
            onClick={() => {
              onBack?.();
              dispatch({ type: 'BACK' });
            }}
            className="absolute top-6 left-0 z-20 flex items-center gap-2 px-4 py-2.5 text-[12px] tracking-[0.22em] uppercase border-2 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            style={{
              transform: 'translateX(calc(-100% - 12px))',
              borderColor: ACCENT,
              color: ACCENT,
              backgroundColor: BG_DARK,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = ACCENT;
              el.style.color = BG_DARK;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = BG_DARK;
              el.style.color = ACCENT;
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Back</span>
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
