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
      className={`
        flex items-center gap-3 px-4 py-2 w-full text-left rounded-sm
        transition-all duration-300 cursor-pointer bg-transparent border-none outline-none
        ${isActive ? 'translate-x-2' : 'translate-x-0'}
      `}
      style={{
        animation: `xmb-item-enter 0.3s ease-out ${index * 50}ms both`,
      }}
    >
      {/* Active indicator bar */}
      <div
        className={`w-0.5 h-8 rounded-full transition-all duration-300 shrink-0 ${
          isActive ? 'bg-xmb-accent shadow-[0_0_8px_var(--color-xmb-glow)]' : 'bg-transparent'
        }`}
      />

      {/* Thumbnail */}
      {item.thumbnail && (
        <div className="w-10 h-10 rounded overflow-hidden shrink-0 bg-xmb-highlight">
          <img
            src={item.thumbnail}
            alt={item.label}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col min-w-0">
        <span
          className={`text-sm font-medium truncate transition-colors duration-300 ${
            isActive ? 'text-xmb-accent' : 'text-xmb-text'
          }`}
        >
          {item.label}
        </span>
        {item.sublabel && (
          <span className="text-xs text-xmb-text-dim truncate">{item.sublabel}</span>
        )}
      </div>
    </button>
  );
}
