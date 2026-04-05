import { ACCENT, CYBER_FLAGS, FONT_MONO } from '../../config/cyberFlags';
import type { XMBItem as XMBItemType } from '../../types/xmb';

interface Props {
  item: XMBItemType;
  isActive: boolean;
  index: number;
  onClick: () => void;
}

export function XMBItem({ item, isActive, index, onClick }: Props) {
  const cyber = CYBER_FLAGS.cyberPalette;

  const activeColor = ACCENT;
  const dimColor = cyber ? 'rgba(0,212,170,0.35)' : 'rgba(255,255,255,0.35)';
  const activeSub = cyber ? 'rgba(0,212,170,0.6)' : 'rgba(255,255,255,0.6)';
  const dimSub = cyber ? 'rgba(0,212,170,0.2)' : 'rgba(255,255,255,0.2)';

  const thumbFilter =
    CYBER_FLAGS.thumbnailTint && cyber
      ? isActive
        ? 'sepia(0.5) hue-rotate(130deg) contrast(1.3) brightness(1.1)'
        : 'sepia(0.5) hue-rotate(130deg) brightness(0.4)'
      : isActive
        ? 'contrast(1.4) brightness(1.1)'
        : 'brightness(0.4)';

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 w-full text-left bg-transparent border-none outline-none cursor-pointer"
      style={{
        transform: isActive ? 'translateX(8px)' : 'translateX(0)',
        transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.3s ease',
        animation: `xmb-item-enter 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) ${index * 60}ms both`,
      }}
    >
      {/* Active indicator bar */}
      <div
        className="shrink-0"
        style={{
          width: isActive ? '3px' : '1px',
          height: '32px',
          backgroundColor: isActive ? activeColor : 'transparent',
          boxShadow: isActive ? `0 0 8px ${cyber ? 'rgba(0,212,170,0.3)' : 'rgba(255,255,255,0.3)'}` : 'none',
          transition: 'all 0.4s ease',
        }}
      />

      {/* Thumbnail */}
      {item.thumbnail && (
        <div
          className="w-11 h-11 rounded-sm overflow-hidden shrink-0"
          style={{
            border: isActive
              ? `2px solid ${activeColor}`
              : `1px solid ${cyber ? 'rgba(0,212,170,0.08)' : 'rgba(255,255,255,0.08)'}`,
            transition: 'border-color 0.4s ease',
          }}
        >
          <img
            src={item.thumbnail}
            alt={item.label}
            className="w-full h-full object-cover"
            style={{
              filter: thumbFilter,
              transition: 'filter 0.4s ease',
            }}
            loading="lazy"
          />
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col min-w-0 gap-0.5">
        <span
          className="text-[15px] font-medium tracking-wide truncate"
          style={{
            color: isActive ? activeColor : dimColor,
            transition: 'color 0.4s ease',
          }}
        >
          {item.label}
        </span>
        {item.sublabel && (
          <span
            className="text-[12px] tracking-wider truncate"
            style={{
              fontFamily: FONT_MONO,
              color: isActive ? activeSub : dimSub,
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
