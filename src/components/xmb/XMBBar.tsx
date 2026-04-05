import type { Dispatch } from 'react';
import { CYBER_FLAGS } from '../../config/cyberFlags';
import type { XMBAction, XMBState } from '../../types/xmb';
import { XMBCategoryIcon } from './XMBCategoryIcon';
import { XMBItemList } from './XMBItemList';

interface Props {
  state: XMBState;
  dispatch: Dispatch<XMBAction>;
}

export function XMBBar({ state, dispatch }: Props) {
  const { categories, activeCategoryIndex, activeItemIndex } = state;
  const activeCategory = categories[activeCategoryIndex];

  // Center the active category — each icon is 200px wide
  const offsetX = -(activeCategoryIndex * 200);

  const cyber = CYBER_FLAGS.cyberPalette;
  const dividerColor = cyber ? 'rgba(0,212,170,0.3)' : 'rgba(255,255,255,0.3)';

  return (
    <div className="flex flex-col items-center w-full">
      {/* Horizontal category bar */}
      <div className="relative w-full flex justify-center overflow-visible">
        <div
          className="flex items-center gap-0"
          style={{
            transform: `translateX(${offsetX}px)`,
            transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          {categories.map((category, index) => (
            <XMBCategoryIcon
              key={category.id}
              category={category}
              distance={index - activeCategoryIndex}
              onClick={() => dispatch({ type: 'GO_TO_CATEGORY', index })}
            />
          ))}
        </div>
      </div>

      {/* Horizontal divider */}
      <div
        className="w-full max-w-xl mx-auto mt-1 mb-0"
        style={{
          height: '2px',
          background: `linear-gradient(90deg, transparent 0%, ${dividerColor} 20%, ${dividerColor} 80%, transparent 100%)`,
        }}
      />

      {/* Vertical item list for active category */}
      <div className="w-full max-w-md mx-auto px-4">
        <XMBItemList
          key={activeCategory.id}
          category={activeCategory}
          activeItemIndex={activeItemIndex[activeCategory.id]}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}
