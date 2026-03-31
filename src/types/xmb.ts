export type CategoryId = 'about' | 'projects' | 'research' | 'resume' | 'contact';

export interface XMBItem {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
  thumbnail?: string;
  data: Record<string, unknown>;
}

export interface XMBCategory {
  id: CategoryId;
  label: string;
  icon: string;
  items: XMBItem[];
}

export interface XMBState {
  categories: XMBCategory[];
  activeCategoryIndex: number;
  activeItemIndex: Record<CategoryId, number>;
  panelOpen: boolean;
  selectedItem: XMBItem | null;
  selectedCategoryId: CategoryId | null;
}

export type XMBAction =
  | { type: 'MOVE_LEFT' }
  | { type: 'MOVE_RIGHT' }
  | { type: 'MOVE_UP' }
  | { type: 'MOVE_DOWN' }
  | { type: 'SELECT' }
  | { type: 'BACK' }
  | { type: 'GO_TO_CATEGORY'; index: number }
  | { type: 'GO_TO_ITEM'; categoryId: CategoryId; index: number };
