import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const setOrDelete = (params: URLSearchParams, key: string, value: string) => {
  const v = value.trim();
  if (!v || v === "undefined" || v === "null") params.delete(key);
  else params.set(key, v);
};

export function useAnimationSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const PAGE_SIZE = 12;

  const page = Number(searchParams.get("page") ?? 1);
  const skip = (page - 1) * PAGE_SIZE;

  const search = searchParams.get("q") ?? "";
  const synopsis = searchParams.get("synopsis") ?? "";
  const appliedTagsParam = searchParams.get("tags") ?? "";
  const episodesMin = searchParams.get("episodesMin") ?? "";
  const episodesMax = searchParams.get("episodesMax") ?? "";
  const ratingMin = searchParams.get("ratingMin") ?? "";
  const ratingMax = searchParams.get("ratingMax") ?? "";
  const yearMin = searchParams.get("yearMin") ?? "";
  const yearMax = searchParams.get("yearMax") ?? "";
  const sort = searchParams.get("sort") ?? "popularity";

  const creatorsParam = searchParams.get("creators") ?? "";
  const creators = useMemo(
    () =>
      creatorsParam
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    [creatorsParam]
  );

  const appliedTagIds = useMemo(
    () =>
      (appliedTagsParam ?? "")
        .split(",")
        .filter(Boolean)
        .map(Number)
        .filter((n) => Number.isFinite(n) && n > 0),
    [appliedTagsParam]
  );

  const [draftTagIds, setDraftTagIds] = useState<number[]>(appliedTagIds);

  useEffect(() => {
    setDraftTagIds(appliedTagIds);
  }, [appliedTagIds]);

  function toggleDraftTag(tagId: number) {
    setDraftTagIds((prev) => {
      const next = prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId];

      const params = new URLSearchParams(searchParams.toString());

      if (next.length) params.set("tags", next.join(","));
      else params.delete("tags");

      params.set("page", "1");
      setSearchParams(params);

      return next;
    });
  }

  function handleSortChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1");
    setSearchParams(params);
  }

  function handleSearchSubmit(q: string) {
    const params = new URLSearchParams(searchParams.toString());

    setOrDelete(params, "q", q);

    if (creators.length) params.set("creators", creators.join(","));
    else params.delete("creators");

    setOrDelete(params, "synopsis", synopsis);
    setOrDelete(params, "episodesMin", episodesMin);
    setOrDelete(params, "episodesMax", episodesMax);
    setOrDelete(params, "ratingMin", ratingMin);
    setOrDelete(params, "ratingMax", ratingMax);
    setOrDelete(params, "yearMin", yearMin);
    setOrDelete(params, "yearMax", yearMax);

    params.set("page", "1");
    setSearchParams(params);
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());

    const hadFilters =
      params.has("tags") ||
      params.has("creators") ||
      params.has("synopsis") ||
      params.has("q") ||
      params.has("episodesMin") ||
      params.has("episodesMax") ||
      params.has("ratingMin") ||
      params.has("ratingMax") ||
      params.has("yearMin") ||
      params.has("yearMax") ||
      params.has("sort");

    if (!hadFilters) return;

    [
      "tags",
      "creators",
      "synopsis",
      "q",
      "episodesMin",
      "episodesMax",
      "ratingMin",
      "ratingMax",
      "yearMin",
      "yearMax",
      "sort",
    ].forEach((k) => params.delete(k));

    params.set("page", "1");
    setSearchParams(params);
    setDraftTagIds([]);
  }

  return {

    PAGE_SIZE,
    page,
    skip,
  
    searchParams,
    search,
    synopsis,
    appliedTagsParam,
    creators,
    episodesMin,
    episodesMax,
    ratingMin,
    ratingMax,
    yearMin,
    yearMax,
    sort,
    appliedTagIds,

    draftTagIds,
    toggleDraftTag,
    handleSortChange,
    handleSearchSubmit,
    clearFilters,
  };
}