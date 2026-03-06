import type { Range } from "../../../../types/range";

const toNum = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

const toRange = (minStr: string, maxStr: string): Range<number> | undefined => {
  const min = minStr ? toNum(minStr) : undefined;
  const max = maxStr ? toNum(maxStr) : undefined;
  return min != null || max != null ? { min, max } : undefined;
};

export function useAnimationFilters(
  urlCreators: string[],
  urlSynopsis: string,
  urlYearMax: string,
  urlYearMin: string,
  urlRatingMax: string,
  urlRatingMin: string,
  urlEpisodesMax: string,
  urlEpisodesMin: string,
) {
  return {
    creatorNameList: urlCreators,
    synopsis: urlSynopsis,
    rangeYear: toRange(urlYearMin, urlYearMax),
    rangeRating: toRange(urlRatingMin, urlRatingMax),
    rangeEpisodes: toRange(urlEpisodesMin, urlEpisodesMax),
  };
}