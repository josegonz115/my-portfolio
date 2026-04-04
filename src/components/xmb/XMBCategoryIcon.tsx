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
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-3 cursor-pointer shrink-0 bg-transparent border-none outline-none"
      style={{
        transform: `scale(${scale})`,
        opacity,
        width: '160px',
        transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s ease',
      }}
    >
      {/* Icon container with manga ring */}
      <div
        className="relative w-16 h-16 flex items-center justify-center"
        style={{ transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
      >
        {/* Menacing pulse ring for active */}
        {isActive && (
          <div
            className="absolute inset-[-6px] rounded-full border-2 border-white/40"
            style={{ animation: 'xmb-menace 2.5s ease-in-out infinite' }}
          />
        )}

        {/* Outer ring — bold manga border */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isActive ? 'border-2 border-white/60 shadow-[0_0_15px_rgba(255,255,255,0.15)]' : 'border border-white/10'
          }`}
        />

        <CategorySvgIcon name={category.icon} active={isActive} />

        {/* Floating ゴ menacing symbol on active */}
        {isActive && (
          <span
            className="absolute -top-2 -right-3 text-[11px] text-white/20 font-bold select-none"
            style={{
              animation: 'xmb-float 3s ease-in-out infinite',
              fontFamily: 'sans-serif',
            }}
          >
            ゴ
          </span>
        )}
      </div>

      {/* Label — bold, dramatic */}
      <span
        className={`text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-400 ${
          isActive ? 'text-white xmb-glow' : 'text-white/30'
        }`}
        style={{ fontFamily: "'Bebas Neue', 'Inter', sans-serif" }}
      >
        {category.label}
      </span>
    </button>
  );
}
