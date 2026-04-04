import type { Dispatch } from 'react';
import type { CategoryId, XMBAction, XMBCategory } from '../../types/xmb';
import { XMBItem } from './XMBItem';

interface Props {
  category: XMBCategory;
  activeItemIndex: number;
  dispatch: Dispatch<XMBAction>;
}

export function XMBItemList({ category, activeItemIndex, dispatch }: Props) {
  if (category.items.length === 0) return null;

  return (
    <div className="flex flex-col mt-8 h-[50vh] overflow-y-auto">
      {category.items.map((item, index) => (
        <XMBItem
          key={item.id}
          item={item}
          isActive={index === activeItemIndex}
          index={index}
          onClick={() =>
            dispatch({
              type: 'GO_TO_ITEM',
              categoryId: category.id as CategoryId,
              index,
            })
          }
        />
      ))}
    </div>
  );
}
