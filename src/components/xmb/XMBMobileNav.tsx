import type { Dispatch } from 'react';
import { ACCENT, CYBER_FLAGS, FONT_MONO } from '../../config/cyberFlags';
import type { CategoryId, XMBAction, XMBState } from '../../types/xmb';
import { CategorySvgIcon } from './CategorySvgIcon';
import { DetailAbout } from './details/DetailAbout';
import { DetailContact } from './details/DetailContact';
import { DetailProject } from './details/DetailProject';
import { DetailResearch } from './details/DetailResearch';
import { DetailResume } from './details/DetailResume';

interface Props {
  state: XMBState;
  dispatch: Dispatch<XMBAction>;
}

export function XMBMobileNav({ state, dispatch }: Props) {
  const { categories, activeCategoryIndex, activeItemIndex, panelOpen, selectedItem, selectedCategoryId } = state;
  const activeCategory = categories[activeCategoryIndex];
  const activeIdx = activeItemIndex[activeCategory.id];

  const cyber = CYBER_FLAGS.cyberPalette;
  const dim = cyber ? 'rgba(0,212,170,0.3)' : 'rgba(255,255,255,0.3)';
  const dimBorder = cyber ? 'rgba(0,212,170,0.2)' : 'rgba(255,255,255,0.2)';
  const dimText = cyber ? 'rgba(0,212,170,0.35)' : 'rgba(255,255,255,0.35)';
  const dimSub = cyber ? 'rgba(0,212,170,0.2)' : 'rgba(255,255,255,0.2)';
  const activeSub = cyber ? 'rgba(0,212,170,0.5)' : 'rgba(255,255,255,0.5)';
  const thumbBorder = cyber ? 'rgba(0,212,170,0.15)' : 'rgba(255,255,255,0.15)';
  const bgActive = cyber ? 'rgba(0,212,170,0.03)' : 'rgba(255,255,255,0.03)';

  const thumbFilter =
    CYBER_FLAGS.thumbnailTint && cyber
      ? 'saturate(0.3) sepia(0.5) hue-rotate(130deg) contrast(1.3) brightness(0.8)'
      : 'saturate(0) contrast(1.3) brightness(0.8)';

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Category tab bar */}
      <div
        className="flex items-center justify-center gap-0 px-1 py-2 overflow-x-auto shrink-0"
        style={{ borderBottom: `1px solid ${dimBorder}` }}
      >
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => dispatch({ type: 'GO_TO_CATEGORY', index })}
            className="flex flex-col items-center gap-1 px-4 py-2 bg-transparent border-none cursor-pointer shrink-0"
            style={{
              borderBottom: index === activeCategoryIndex ? `2px solid ${ACCENT}` : '2px solid transparent',
              transition: 'border-color 0.3s ease',
            }}
          >
            <CategorySvgIcon name={cat.icon} active={index === activeCategoryIndex} />
            <span
              className="text-[9px] tracking-[0.2em] uppercase"
              style={{
                color: index === activeCategoryIndex ? ACCENT : dim,
                transition: 'color 0.3s ease',
              }}
            >
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {/* Item list or detail panel */}
      {panelOpen && selectedItem && selectedCategoryId ? (
        <div className="flex-1 overflow-y-auto p-4">
          <button
            type="button"
            onClick={() => dispatch({ type: 'BACK' })}
            className="mb-5 flex items-center gap-2 text-[10px] tracking-widest uppercase bg-transparent border-none cursor-pointer"
            style={{ color: cyber ? 'rgba(0,212,170,0.5)' : 'rgba(255,255,255,0.5)', transition: 'color 0.3s ease' }}
          >
            &larr; <span>Back</span>
          </button>
          {selectedCategoryId === 'about' && <DetailAbout item={selectedItem} />}
          {selectedCategoryId === 'projects' && <DetailProject item={selectedItem} />}
          {selectedCategoryId === 'research' && <DetailResearch item={selectedItem} />}
          {selectedCategoryId === 'resume' && <DetailResume item={selectedItem} />}
          {selectedCategoryId === 'contact' && <DetailContact item={selectedItem} />}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto py-1">
          {activeCategory.items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                dispatch({
                  type: 'GO_TO_ITEM',
                  categoryId: activeCategory.id as CategoryId,
                  index,
                })
              }
              className="flex items-center gap-3 w-full px-4 py-3 text-left bg-transparent border-none cursor-pointer"
              style={{
                borderLeft: index === activeIdx ? `2px solid ${ACCENT}` : '2px solid transparent',
                backgroundColor: index === activeIdx ? bgActive : 'transparent',
                transition: 'all 0.3s ease',
              }}
            >
              {item.thumbnail && (
                <div className="w-10 h-10 overflow-hidden shrink-0" style={{ border: `2px solid ${thumbBorder}` }}>
                  <img
                    src={item.thumbnail}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    style={{ filter: thumbFilter }}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex flex-col min-w-0 gap-0.5">
                <span
                  className="text-[12px] font-medium tracking-wide truncate"
                  style={{
                    color: index === activeIdx ? ACCENT : dimText,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.label}
                </span>
                {item.sublabel && (
                  <span
                    className="text-[9px] tracking-wider truncate"
                    style={{
                      fontFamily: FONT_MONO,
                      color: index === activeIdx ? activeSub : dimSub,
                    }}
                  >
                    {item.sublabel}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
