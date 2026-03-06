import type { Range } from "../../../../types/range";
export function buildAnimationSearchParams(
  baseParams: URLSearchParams,
  filters: {
    creatorNameList: string[];
    synopsis: string;
    rangeYear?: Range<number>;
    rangeRating?: Range<number>;
    rangeEpisodes?: Range<number>;
  }
) {
  const params = new URLSearchParams(baseParams.toString());

  if (filters.creatorNameList.length)
    params.set("creators", filters.creatorNameList.join(","));
  else params.delete("creators");

  if (filters.synopsis.trim())
    params.set("synopsis", filters.synopsis);
  else params.delete("synopsis");

  const setRange = (keyMin: string, keyMax: string, range?: Range<number>) => {
    if (range?.min != null) params.set(keyMin, String(range.min));
    else params.delete(keyMin);

    if (range?.max != null) params.set(keyMax, String(range.max));
    else params.delete(keyMax);
  };

  setRange("yearMin", "yearMax", filters.rangeYear);
  setRange("ratingMin", "ratingMax", filters.rangeRating);
  setRange("episodesMin", "episodesMax", filters.rangeEpisodes);

  params.set("page", "1");

  return params;
}