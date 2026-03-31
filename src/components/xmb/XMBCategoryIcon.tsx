import type { XMBCategory } from '../../types/xmb';
import { CategorySvgIcon } from './CategorySvgIcon';

interface Props {
  category: XMBCategory;
  distance: number; // 0 = active, positive = right, negative = left
  onClick: () => void;
}

export function XMBCategoryIcon({ category, distance, onClick }: Props) {
  const isActive = distance === 0;
  const absDistance = Math.abs(distance);

  const scale = isActive ? 1 : absDistance === 1 ? 0.7 : 0.5;
  const opacity = isActive ? 1 : absDistance === 1 ? 0.5 : 0.25;

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 transition-all duration-400 ease-out cursor-pointer shrink-0 bg-transparent border-none outline-none"
      style={{
        transform: `scale(${scale})`,
        opacity,
        width: '120px',
      }}
    >
      <div className={`w-14 h-14 flex items-center justify-center rounded-lg transition-all duration-400 ${isActive ? 'xmb-icon-glow' : ''}`}>
        <CategorySvgIcon name={category.icon} active={isActive} />
      </div>
      <span
        className={`text-xs font-medium tracking-wider uppercase transition-all duration-400 ${
          isActive ? 'text-xmb-accent xmb-glow' : 'text-xmb-text-dim'
        }`}
      >
        {category.label}
      </span>
    </button>
  );
}
