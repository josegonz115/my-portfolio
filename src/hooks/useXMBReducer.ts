import { useReducer } from 'react';
import type { XMBState, XMBAction, CategoryId, XMBCategory } from '../types/xmb';

function createInitialState(categories: XMBCategory[]): XMBState {
  const activeItemIndex: Record<CategoryId, number> = {
    about: 0,
    projects: 0,
    research: 0,
    resume: 0,
    contact: 0,
  };

  // Parse initial state from URL hash
  const hash = window.location.hash.slice(1); // remove #
  let activeCategoryIndex = 0;

  if (hash) {
    const [catId, itemId] = hash.split('/');
    const catIndex = categories.findIndex(c => c.id === catId);
    if (catIndex !== -1) {
      activeCategoryIndex = catIndex;
      if (itemId) {
        const itemIndex = categories[catIndex].items.findIndex(i => i.id === itemId);
        if (itemIndex !== -1) {
          activeItemIndex[catId as CategoryId] = itemIndex;
        }
      }
    }
  }

  return {
    categories,
    activeCategoryIndex,
    activeItemIndex,
    panelOpen: false,
    selectedItem: null,
    selectedCategoryId: null,
  };
}

function xmbReducer(state: XMBState, action: XMBAction): XMBState {
  const { categories, activeCategoryIndex, activeItemIndex } = state;
  const currentCategory = categories[activeCategoryIndex];
  const currentCatId = currentCategory.id;

  switch (action.type) {
    case 'MOVE_LEFT': {
      if (state.panelOpen) {
        return { ...state, panelOpen: false, selectedItem: null, selectedCategoryId: null };
      }
      const newIndex = Math.max(0, activeCategoryIndex - 1);
      return { ...state, activeCategoryIndex: newIndex };
    }

    case 'MOVE_RIGHT': {
      if (state.panelOpen) {
        return { ...state, panelOpen: false, selectedItem: null, selectedCategoryId: null };
      }
      const newIndex = Math.min(categories.length - 1, activeCategoryIndex + 1);
      return { ...state, activeCategoryIndex: newIndex };
    }

    case 'MOVE_UP': {
      if (state.panelOpen) return state;
      const currentItemIndex = activeItemIndex[currentCatId];
      const newItemIndex = Math.max(0, currentItemIndex - 1);
      return {
        ...state,
        activeItemIndex: { ...activeItemIndex, [currentCatId]: newItemIndex },
      };
    }

    case 'MOVE_DOWN': {
      if (state.panelOpen) return state;
      const currentItemIndex = activeItemIndex[currentCatId];
      const maxIndex = currentCategory.items.length - 1;
      const newItemIndex = Math.min(maxIndex, currentItemIndex + 1);
      return {
        ...state,
        activeItemIndex: { ...activeItemIndex, [currentCatId]: newItemIndex },
      };
    }

    case 'SELECT': {
      const itemIndex = activeItemIndex[currentCatId];
      const item = currentCategory.items[itemIndex];
      if (!item) return state;
      return {
        ...state,
        panelOpen: true,
        selectedItem: item,
        selectedCategoryId: currentCatId,
      };
    }

    case 'BACK': {
      if (!state.panelOpen) return state;
      return { ...state, panelOpen: false, selectedItem: null, selectedCategoryId: null };
    }

    case 'GO_TO_CATEGORY': {
      if (state.panelOpen) {
        return {
          ...state,
          panelOpen: false,
          selectedItem: null,
          selectedCategoryId: null,
          activeCategoryIndex: action.index,
        };
      }
      return { ...state, activeCategoryIndex: action.index };
    }

    case 'GO_TO_ITEM': {
      const catIndex = categories.findIndex(c => c.id === action.categoryId);
      if (catIndex === -1) return state;
      const item = categories[catIndex].items[action.index];
      if (!item) return state;
      return {
        ...state,
        activeCategoryIndex: catIndex,
        activeItemIndex: { ...activeItemIndex, [action.categoryId]: action.index },
        panelOpen: true,
        selectedItem: item,
        selectedCategoryId: action.categoryId,
      };
    }

    default:
      return state;
  }
}

export function useXMBReducer(categories: XMBCategory[]) {
  return useReducer(xmbReducer, categories, createInitialState);
}
