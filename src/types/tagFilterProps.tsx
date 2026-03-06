import type { Tag } from "./tag"

export type TagFilterProps ={ 
  tags : Tag[];
  draftTagIds : number[];
  toggleDraftTag: (id: number) => void;

}