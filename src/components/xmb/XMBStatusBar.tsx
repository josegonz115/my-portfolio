import { useEffect, useState } from 'react';
import { ACCENT, CYBER_FLAGS, FONT_HEADER, FONT_MONO } from '../../config/cyberFlags';

interface Props {
  panelOpen: boolean;
  muted: boolean;
  onToggleMute?: () => void;
}

export function XMBStatusBar({ panelOpen, muted, onToggleMute }: Props) {
  const [time, setTime] = useState(getTimeString());
  const cyber = CYBER_FLAGS.cyberPalette;

  // Dim/bright helpers for inline colors
  const mid = cyber ? 'rgba(0,212,170,0.5)' : 'rgba(255,255,255,0.5)';
  const bright = cyber ? 'rgba(0,212,170,0.7)' : 'rgba(255,255,255,0.7)';
  const dimFaint = cyber ? 'rgba(0,212,170,0.3)' : 'rgba(255,255,255,0.3)';

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeString()), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-5 md:px-7 py-4 md:py-5 z-20" style={{ fontFamily: FONT_MONO }}>
      {/* Left: nav hints */}
      <div
        className="flex-1 flex items-center gap-5 text-[11px] md:text-[13px] tracking-widest uppercase"
        style={{ color: mid }}
      >
        <span className="hidden md:flex items-center gap-4">
          {panelOpen ? (
            <>
              <span style={{ color: mid }}>[</span>
              <span style={{ color: bright }}>ESC</span>
              <span style={{ color: mid }}>]</span>
              <span style={{ color: mid }} className="ml-1">
                CLOSE
              </span>
            </>
          ) : (
            <>
              <span style={{ color: mid }}>&larr; &rarr;</span>
              <span style={{ color: mid }}>NAV</span>
              <span style={{ color: dimFaint }} className="mx-1">
                |
              </span>
              <span style={{ color: bright }}>ENTER</span>
              <span style={{ color: mid }}>SELECT</span>
            </>
          )}
        </span>
      </div>

      {/* Center: name */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-[22px] md:text-[26px]"
          style={{
            fontFamily: FONT_HEADER,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: ACCENT,
            animation: CYBER_FLAGS.textFlicker ? 'cyber-flicker 4s infinite' : 'none',
          }}
        >
          Jose Gonzalez
        </span>
        <span className="text-[12px] md:text-[14px] tracking-[0.4em] uppercase" style={{ color: mid }}>
          Software Engineer
        </span>
      </div>

      {/* Right: clock + mute */}
      <div
        className="flex-1 flex items-center justify-end gap-5 text-[11px] md:text-[13px] tracking-wider"
        style={{ color: mid }}
      >
        {onToggleMute && (
          <button
            type="button"
            onClick={onToggleMute}
            className="bg-transparent border-none cursor-pointer p-0"
            style={{ color: mid, transition: 'color 0.3s ease' }}
            title={muted ? 'Unmute' : 'Mute'}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = bright;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = mid;
            }}
          >
            {muted ? (
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        )}
        <span className="font-mono" style={{ color: mid }}>
          {time}
        </span>
      </div>
    </div>
  );
}

function getTimeString(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
