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
    <div className="flex items-center justify-between px-6 py-4 z-20" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      {/* Left: nav hints — codec-style */}
      <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase text-xmb-text-dim">
        <span className="hidden md:flex items-center gap-3">
          {panelOpen ? (
            <>
              <span className="text-xmb-accent/50">[</span>
              <span className="text-xmb-text-dim">ESC</span>
              <span className="text-xmb-accent/50">]</span>
              <span className="text-xmb-text-dim/60 ml-1">CLOSE</span>
            </>
          ) : (
            <>
              <span className="text-xmb-accent/40">&larr; &rarr;</span>
              <span className="text-xmb-text-dim/60">NAV</span>
              <span className="text-xmb-border mx-1">|</span>
              <span className="text-xmb-accent/40">ENTER</span>
              <span className="text-xmb-text-dim/60">SELECT</span>
            </>
          )}
        </span>
      </div>

      {/* Center: name — minimal, weighted */}
      <div className="flex flex-col items-center gap-0.5">
        <span
          className="text-[11px] font-light tracking-[0.3em] uppercase text-xmb-text/70"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Jose Gonzalez
        </span>
        <span className="text-[8px] tracking-[0.4em] uppercase text-xmb-accent-dim/50">
          Software Engineer
        </span>
      </div>

      {/* Right: freq/clock + mute — codec readout */}
      <div className="flex items-center gap-4 text-[10px] tracking-wider">
        {onToggleMute && (
          <button
            onClick={onToggleMute}
            className="bg-transparent border-none cursor-pointer p-0 text-xmb-text-dim/50 hover:text-xmb-accent/70"
            style={{ transition: 'color 0.5s ease' }}
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? (
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        )}
        <span className="text-xmb-accent-dim/60 font-mono">{time}</span>
      </div>
    </div>
  );
}

function getTimeString(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
