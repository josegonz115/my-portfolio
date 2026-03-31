import { useState, useEffect } from 'react';

interface Props {
  panelOpen: boolean;
  muted: boolean;
  onToggleMute?: () => void;
}

export function XMBStatusBar({ panelOpen, muted, onToggleMute }: Props) {
  const [time, setTime] = useState(getTimeString());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeString()), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-3 text-xs text-xmb-text-dim z-20">
      {/* Left: nav hints */}
      <div className="flex items-center gap-4">
        <span className="hidden md:inline">
          {panelOpen ? (
            <>
              <kbd className="px-1.5 py-0.5 rounded border border-xmb-border text-xmb-accent text-[10px]">ESC</kbd>
              <span className="ml-1.5">Close</span>
            </>
          ) : (
            <>
              <kbd className="px-1.5 py-0.5 rounded border border-xmb-border text-xmb-accent text-[10px]">&larr; &rarr;</kbd>
              <span className="ml-1.5">Navigate</span>
              <span className="mx-2 text-xmb-border">|</span>
              <kbd className="px-1.5 py-0.5 rounded border border-xmb-border text-xmb-accent text-[10px]">ENTER</kbd>
              <span className="ml-1.5">Select</span>
            </>
          )}
        </span>
      </div>

      {/* Center: title */}
      <span className="text-xmb-accent font-medium tracking-widest uppercase text-[11px]">
        Jose Gonzalez
      </span>

      {/* Right: clock + mute toggle */}
      <div className="flex items-center gap-3">
        {onToggleMute && (
          <button
            onClick={onToggleMute}
            className="bg-transparent border-none cursor-pointer text-xmb-text-dim hover:text-xmb-accent transition-colors p-0"
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? (
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        )}
        <span className="font-mono">{time}</span>
      </div>
    </div>
  );
}

function getTimeString(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
