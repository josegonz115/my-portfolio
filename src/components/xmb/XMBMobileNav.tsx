import type { Dispatch } from 'react';
import type { XMBState, XMBAction, CategoryId } from '../../types/xmb';
import { CategorySvgIcon } from './CategorySvgIcon';
import { DetailAbout } from './details/DetailAbout';
import { DetailProject } from './details/DetailProject';
import { DetailResearch } from './details/DetailResearch';
import { DetailResume } from './details/DetailResume';
import { DetailContact } from './details/DetailContact';

interface Props {
  state: XMBState;
  dispatch: Dispatch<XMBAction>;
}

export function XMBMobileNav({ state, dispatch }: Props) {
  const { categories, activeCategoryIndex, activeItemIndex, panelOpen, selectedItem, selectedCategoryId } = state;
  const activeCategory = categories[activeCategoryIndex];
  const activeIdx = activeItemIndex[activeCategory.id];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Category tab bar */}
      <div className="flex items-center justify-center gap-1 px-2 py-3 overflow-x-auto shrink-0 border-b border-xmb-border">
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            onClick={() => dispatch({ type: 'GO_TO_CATEGORY', index })}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded transition-all bg-transparent border-none cursor-pointer shrink-0 ${
              index === activeCategoryIndex ? 'bg-xmb-highlight' : ''
            }`}
          >
            <CategorySvgIcon name={cat.icon} active={index === activeCategoryIndex} />
            <span className={`text-[10px] ${index === activeCategoryIndex ? 'text-xmb-accent' : 'text-xmb-text-dim'}`}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {/* Item list or detail panel */}
      {panelOpen && selectedItem && selectedCategoryId ? (
        <div className="flex-1 overflow-y-auto p-4">
          <button
            onClick={() => dispatch({ type: 'BACK' })}
            className="mb-4 flex items-center gap-1 text-xs text-xmb-accent bg-transparent border-none cursor-pointer"
          >
            &larr; Back
          </button>
          {selectedCategoryId === 'about' && <DetailAbout item={selectedItem} />}
          {selectedCategoryId === 'projects' && <DetailProject item={selectedItem} />}
          {selectedCategoryId === 'research' && <DetailResearch item={selectedItem} />}
          {selectedCategoryId === 'resume' && <DetailResume item={selectedItem} />}
          {selectedCategoryId === 'contact' && <DetailContact item={selectedItem} />}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto py-2">
          {activeCategory.items.map((item, index) => (
            <button
              key={item.id}
              onClick={() =>
                dispatch({
                  type: 'GO_TO_ITEM',
                  categoryId: activeCategory.id as CategoryId,
                  index,
                })
              }
              className={`
                flex items-center gap-3 w-full px-4 py-3 text-left bg-transparent border-none cursor-pointer
                transition-colors
                ${index === activeIdx ? 'bg-xmb-highlight border-l-2 border-l-xmb-accent' : 'border-l-2 border-l-transparent'}
              `}
            >
              {item.thumbnail && (
                <div className="w-10 h-10 rounded overflow-hidden shrink-0">
                  <img src={item.thumbnail} alt={item.label} className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className={`text-sm truncate ${index === activeIdx ? 'text-xmb-accent' : 'text-xmb-text'}`}>
                  {item.label}
                </span>
                {item.sublabel && (
                  <span className="text-xs text-xmb-text-dim truncate">{item.sublabel}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
