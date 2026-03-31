import type { XMBItem as XMBItemType } from '../../types/xmb';

interface Props {
  item: XMBItemType;
  isActive: boolean;
  index: number;
  onClick: () => void;
}

export function XMBItem({ item, isActive, index, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 w-full text-left bg-transparent border-none outline-none cursor-pointer"
      style={{
        transform: isActive ? 'translateX(6px)' : 'translateX(0)',
        transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s ease',
        animation: `xmb-item-enter 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) ${index * 70}ms both`,
      }}
    >
      {/* Active indicator — thin amber bar */}
      <div
        className="w-px h-7 shrink-0"
        style={{
          backgroundColor: isActive ? 'var(--color-xmb-accent)' : 'transparent',
          boxShadow: isActive ? '0 0 6px var(--color-xmb-glow)' : 'none',
          transition: 'background-color 0.5s ease, box-shadow 0.5s ease',
        }}
      />

      {/* Thumbnail */}
      {item.thumbnail && (
        <div
          className="w-9 h-9 rounded-sm overflow-hidden shrink-0"
          style={{
            border: isActive ? '1px solid var(--color-xmb-accent-dim)' : '1px solid rgba(255,255,255,0.04)',
            transition: 'border-color 0.5s ease',
          }}
        >
          <img
            src={item.thumbnail}
            alt={item.label}
            className="w-full h-full object-cover"
            style={{
              filter: isActive ? 'saturate(0.8) brightness(1)' : 'saturate(0.3) brightness(0.6)',
              transition: 'filter 0.5s ease',
            }}
            loading="lazy"
          />
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col min-w-0 gap-0.5">
        <span
          className="text-[13px] font-light tracking-wide truncate"
          style={{
            color: isActive ? 'var(--color-xmb-text-bright)' : 'var(--color-xmb-text-dim)',
            transition: 'color 0.5s ease',
          }}
        >
          {item.label}
        </span>
        {item.sublabel && (
          <span
            className="text-[10px] tracking-wider truncate font-mono"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: isActive ? 'var(--color-xmb-accent-dim)' : 'var(--color-xmb-text-dim)',
              opacity: isActive ? 0.8 : 0.4,
              transition: 'color 0.5s ease, opacity 0.5s ease',
            }}
          >
            {item.sublabel}
          </span>
        )}
      </div>
    </button>
  );
}
