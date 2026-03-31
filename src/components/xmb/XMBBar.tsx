import type { Dispatch } from 'react';
import type { XMBState, XMBAction } from '../../types/xmb';
import { XMBCategoryIcon } from './XMBCategoryIcon';
import { XMBItemList } from './XMBItemList';

interface Props {
  state: XMBState;
  dispatch: Dispatch<XMBAction>;
}

export function XMBBar({ state, dispatch }: Props) {
  const { categories, activeCategoryIndex, activeItemIndex } = state;
  const activeCategory = categories[activeCategoryIndex];

  // Calculate offset to center the active category
  // Each category is 120px wide, we shift so the active one is centered
  const offsetX = -(activeCategoryIndex * 120);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Horizontal category bar */}
      <div className="relative w-full flex justify-center overflow-visible">
        <div
          className="flex items-center gap-0 transition-transform duration-400 ease-out"
          style={{
            transform: `translateX(${offsetX}px)`,
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

      {/* Vertical item list for active category */}
      <div className="w-full max-w-sm mx-auto px-4">
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
