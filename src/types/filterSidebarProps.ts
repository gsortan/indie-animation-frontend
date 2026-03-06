import type { Tag } from "./tag";

export type FilterSidebarProps = {
  tags: Tag[];
  tagsLoading:boolean;
  draftTagIds: number[];
  toggleDraftTag: (tagId: number) => void;
  clearFilters: () => void;
  title?: string;
  className?: string;
  onClose?: () => void;
  showHeader?: boolean;
};