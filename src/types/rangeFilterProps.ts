import type { Range } from "./range"

export type RangeFilterProps = {
  filterName: string;            
  stepperValue: number;
  minRange?:number;
  maxRange?: number;
  setRangeFilter: (range: Range<number>) => void;
};