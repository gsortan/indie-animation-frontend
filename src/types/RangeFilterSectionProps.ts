import type { Range } from "./range";

export type RangeFilterSectionProps = {
  setRangeEpisodes: (v: Range<number>) => void;
  currentYear: number;
  setRangeRating: (v: Range<number>) => void;
  setRangeYear: (v: Range<number>) => void;
};
