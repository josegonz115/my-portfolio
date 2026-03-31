import type { XMBCategory } from '../../types/xmb';
import { CategorySvgIcon } from './CategorySvgIcon';

interface Props {
  category: XMBCategory;
  distance: number;
  onClick: () => void;
}

export function XMBCategoryIcon({ category, distance, onClick }: Props) {
  const isActive = distance === 0;
  const absDistance = Math.abs(distance);

  const scale = isActive ? 1 : absDistance === 1 ? 0.65 : 0.45;
  const opacity = isActive ? 1 : absDistance === 1 ? 0.35 : 0.12;

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 cursor-pointer shrink-0 bg-transparent border-none outline-none"
      style={{
        transform: `scale(${scale})`,
        opacity,
        width: '140px',
        transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s ease',
      }}
    >
      {/* Icon container with subtle ring */}
      <div
        className="relative w-16 h-16 flex items-center justify-center"
        style={{
          transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        {/* Pulse ring for active */}
        {isActive && (
          <div
            className="absolute inset-[-4px] rounded-full border border-xmb-accent/20"
            style={{ animation: 'xmb-breathe 3s ease-in-out infinite' }}
          />
        )}

        {/* Outer ring */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-600 ${
            isActive
              ? 'border border-xmb-accent/30 shadow-[0_0_20px_rgba(200,164,78,0.08)]'
              : 'border border-transparent'
          }`}
        />

        <CategorySvgIcon name={category.icon} active={isActive} />
      </div>

      {/* Label — uppercase, letter-spaced, sparse */}
      <span
        className={`text-[10px] font-light tracking-[0.25em] uppercase transition-all duration-500 ${
          isActive ? 'text-xmb-accent xmb-glow' : 'text-xmb-text-dim'
        }`}
      >
        {category.label}
      </span>
    </button>
  );
}
