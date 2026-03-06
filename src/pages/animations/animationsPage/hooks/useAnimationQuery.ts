import { useEffect, useState } from "react";
import axios from "axios";
import type { Animation } from "../../../../types/animation";

const isValid = (v: string) => {
  const t = v.trim();
  return t !== "" && t !== "undefined" && t !== "null";
};

type Args = {
  API_URL: string;
  skip: number;
  PAGE_SIZE: number;
  search: string;
  creators: string[];
  synopsis: string;
  appliedTagsParam: string;
  episodesMin: string;
  episodesMax: string;
  ratingMin: string;
  ratingMax: string;
  yearMin: string;
  yearMax: string;
  sort: string;
  searchParamsKey: string; 
}

export function useAnimationsQuery({
  API_URL,
  skip,
  PAGE_SIZE,
  search,
  creators,
  synopsis,
  appliedTagsParam,
  episodesMin,
  episodesMax,
  ratingMin,
  ratingMax,
  yearMin,
  yearMax,
  sort,
  searchParamsKey,
}: Args) {
  const [count, setCount] = useState(0);
  const [anims, setAnims] = useState<Animation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    async function fetchAnimation() {
      try {
        setIsLoading(true);

        const queryParams: Record<string, any> = { skip, take: PAGE_SIZE };

        if (search.trim()) queryParams.searchTerm = search.trim();
        if (creators.length) queryParams.creators = creators.join(",");
        if (synopsis.trim()) queryParams.synopsis = synopsis.trim();
        if (appliedTagsParam) queryParams.tags = appliedTagsParam;

        if (isValid(episodesMin)) queryParams.episodesMin = episodesMin.trim();
        if (isValid(episodesMax)) queryParams.episodesMax = episodesMax.trim();

        if (isValid(ratingMin)) queryParams.ratingMin = ratingMin.trim();
        if (isValid(ratingMax)) queryParams.ratingMax = ratingMax.trim();

        if (isValid(yearMin)) queryParams.yearMin = yearMin.trim();
        if (isValid(yearMax)) queryParams.yearMax = yearMax.trim();

        if (sort) queryParams.sort = sort;

        const res = await axios.get(`${API_URL}/animations/searchAnimation`, {
          params: queryParams,
        });

        setAnims(res.data.animations);
        setCount(res.data.count);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setHasFetched(true);
      }
    }

    fetchAnimation();
  }, [API_URL, skip, PAGE_SIZE, searchParamsKey]); 

  return { anims, count, isLoading, hasFetched };
}