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
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 w-full text-left bg-transparent border-none outline-none cursor-pointer"
      style={{
        transform: isActive ? 'translateX(8px)' : 'translateX(0)',
        transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.3s ease',
        animation: `xmb-item-enter 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) ${index * 60}ms both`,
      }}
    >
      {/* Active indicator — thick white bar */}
      <div
        className="shrink-0"
        style={{
          width: isActive ? '3px' : '1px',
          height: '28px',
          backgroundColor: isActive ? '#ffffff' : 'transparent',
          boxShadow: isActive ? '0 0 8px rgba(255,255,255,0.3)' : 'none',
          transition: 'all 0.4s ease',
        }}
      />

      {/* Thumbnail */}
      {item.thumbnail && (
        <div
          className="w-9 h-9 rounded-sm overflow-hidden shrink-0"
          style={{
            border: isActive ? '2px solid #fff' : '1px solid rgba(255,255,255,0.08)',
            transition: 'border-color 0.4s ease',
          }}
        >
          <img
            src={item.thumbnail}
            alt={item.label}
            className="w-full h-full object-cover"
            style={{
              filter: isActive ? 'saturate(0) contrast(1.4) brightness(1.1)' : 'saturate(0) brightness(0.4)',
              transition: 'filter 0.4s ease',
            }}
            loading="lazy"
          />
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col min-w-0 gap-0.5">
        <span
          className="text-[13px] font-medium tracking-wide truncate"
          style={{
            color: isActive ? '#ffffff' : 'rgba(255,255,255,0.35)',
            transition: 'color 0.4s ease',
          }}
        >
          {item.label}
        </span>
        {item.sublabel && (
          <span
            className="text-[10px] tracking-wider truncate"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)',
              transition: 'color 0.4s ease',
            }}
          >
            {item.sublabel}
          </span>
        )}
      </div>
    </button>
  );
}
