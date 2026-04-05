import { CYBER_FLAGS, FONT_HEADER } from '../../config/cyberFlags';
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

  const cyber = CYBER_FLAGS.cyberPalette;
  const pulseAnim = cyber
    ? 'cyber-pulse 2.5s ease-in-out infinite'
    : 'xmb-menace 2.5s ease-in-out infinite';
  const floatAnim = cyber ? 'cyber-float 3s ease-in-out infinite' : 'xmb-float 3s ease-in-out infinite';
  const glowClass = cyber ? 'cyber-glow' : 'xmb-glow';
  const symbol = cyber ? '>_' : '\u30B4';

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-3 cursor-pointer shrink-0 bg-transparent border-none outline-none"
      style={{
        transform: `scale(${scale})`,
        opacity,
        width: '240px',
        transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s ease',
      }}
    >
      {/* Icon container with ring */}
      <div
        className="relative w-24 h-24 flex items-center justify-center"
        style={{ transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
      >
        {/* Pulse ring for active */}
        {isActive && (
          <div
            className="absolute inset-[-10px] rounded-full border-2"
            style={{
              borderColor: cyber ? 'rgba(0,212,170,0.4)' : 'rgba(255,255,255,0.4)',
              animation: pulseAnim,
            }}
          />
        )}

        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={
            isActive
              ? {
                  border: cyber ? '2px solid rgba(0,212,170,0.6)' : '2px solid rgba(255,255,255,0.6)',
                  boxShadow: cyber ? '0 0 15px rgba(0,212,170,0.15)' : '0 0 15px rgba(255,255,255,0.15)',
                }
              : {
                  border: cyber ? '1px solid rgba(0,212,170,0.1)' : '1px solid rgba(255,255,255,0.1)',
                }
          }
        />

        <CategorySvgIcon name={category.icon} active={isActive} />

        {/* Floating symbol on active */}
        {isActive && (
          <span
            className="absolute -top-2 -right-3 text-[13px] font-bold select-none"
            style={{
              animation: floatAnim,
              fontFamily: cyber ? "'Share Tech Mono', monospace" : 'sans-serif',
              color: cyber ? 'rgba(0,212,170,0.25)' : 'rgba(255,255,255,0.2)',
            }}
          >
            {symbol}
          </span>
        )}
      </div>

      {/* Label */}
      <span
        className={`text-[15px] font-bold tracking-[0.3em] uppercase transition-all duration-400 ${
          isActive ? `${glowClass}` : ''
        }`}
        style={{
          fontFamily: FONT_HEADER,
          color: isActive ? (cyber ? '#00d4aa' : '#ffffff') : cyber ? 'rgba(0,212,170,0.3)' : 'rgba(255,255,255,0.3)',
        }}
      >
        {category.label}
      </span>
    </button>
  );
}
