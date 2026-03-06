import { Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RangeFilterSection from "./RangeFilterSection";
import type { Range } from "../../../../types/range";
import type { FilterSidebarProps } from "../../../../types/filterSidebarProps";
import TagFilter from "./TagFilter";
import { useAnimationFilters } from "../hooks/useAnimationFilters";
import { buildAnimationSearchParams } from "../utils/buildAnimationSearchParams";
import CreatorFilterSection from "./CreatorFilterSection";

export default function FilterSidebar({
  tags = [],
  tagsLoading,
  draftTagIds,
  toggleDraftTag,
  clearFilters,
  title = "Filters",
  className = "",
  onClose,
  showHeader = true,
}: FilterSidebarProps) {
  const [creatorName, setCreatorName] = useState("");
  const [creatorNameList, setCreatorList] = useState<string[]>([]);
  const [synopsis, setSynopsis] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [rangeYear, setRangeYear] = useState<Range<number>>();
  const [rangeRating, setRangeRating] = useState<Range<number>>();
  const [rangeEpisodes, setRangeEpisodes] = useState<Range<number>>();

  const currentYear = new Date().getFullYear();

const creatorsStr = searchParams.get("creators") ?? "";
const urlCreators = creatorsStr
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
  const urlSynopsis = searchParams.get("synopsis") ?? "";

  const urlYearMin = searchParams.get("yearMin") ?? "";
  const urlYearMax = searchParams.get("yearMax") ?? "";
  const urlRatingMin = searchParams.get("ratingMin") ?? "";
  const urlRatingMax = searchParams.get("ratingMax") ?? "";
  const urlEpisodesMin = searchParams.get("episodesMin") ?? "";
  const urlEpisodesMax = searchParams.get("episodesMax") ?? "";

  const {
    rangeYear: urlRangeYear,
    rangeRating: urlRangeRating,
    rangeEpisodes: urlRangeEpisodes,
  } = useAnimationFilters(
    urlCreators,
    urlSynopsis,
    urlYearMax,
    urlYearMin,
    urlRatingMax,
    urlRatingMin,
    urlEpisodesMax,
    urlEpisodesMin,
  );

  useEffect(() => {
  setCreatorList(urlCreators);
  setSynopsis(urlSynopsis);
  setRangeYear(urlRangeYear);
  setRangeRating(urlRangeRating);
  setRangeEpisodes(urlRangeEpisodes);
}, [
  creatorsStr,
  urlSynopsis,
  urlYearMin,
  urlYearMax,
  urlRatingMin,
  urlRatingMax,
  urlEpisodesMin,
  urlEpisodesMax,
]);


  function handleApply() {
    const newParams = buildAnimationSearchParams(searchParams, {
      creatorNameList,
      synopsis,
      rangeYear,
      rangeRating,
      rangeEpisodes,
    });

    setSearchParams(newParams);
    onClose?.();
  }

  function handleClearLocal() {
    const params = new URLSearchParams(searchParams.toString());
    [
      "creators",
      "synopsis",
      "yearMin",
      "yearMax",
      "ratingMin",
      "ratingMax",
      "episodesMin",
      "episodesMax",
    ].forEach((k) => params.delete(k));
    setSearchParams(params);

    setCreatorName("");
    setCreatorList([]);
    setSynopsis("");
    setRangeYear(undefined);
    setRangeRating(undefined);
    setRangeEpisodes(undefined);
  }

  function handleClearAll() {
    handleClearLocal();
    clearFilters();
  }

  return (
    <aside
      className={["w-[340px] bg-zinc-900 rounded-md", className].join(" ")}
    >
      {showHeader && (
        <div className="px-4 py-3">
          <p className="text-lg text-white font-semibold">{title}</p>
        </div>
      )}

      <div className="overflow-y-auto px-4 space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white">Tags</p>
        </div>

        <TagFilter
          tags={tags}
          draftTagIds={draftTagIds}
          toggleDraftTag={toggleDraftTag}
          tagsLoading={tagsLoading}
        />
        <CreatorFilterSection
          creatorName={creatorName}
          setCreatorName={setCreatorName}
          creatorNameList={creatorNameList}
          setCreatorList={setCreatorList}
        />

        <Input
          label="Synopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          variant="bordered"
          classNames={{
            inputWrapper: "border-slate-600 bg-white",
          }}
        />

        <RangeFilterSection
          setRangeEpisodes={setRangeEpisodes}
          setRangeRating={setRangeRating}
          currentYear={currentYear}
          setRangeYear={setRangeYear}
        />
      </div>

      <div className="px-4 py-3 flex gap-2">
        <button
          onClick={handleClearAll}
          className="w-30 h-10 rounded-md border cursor-pointer border-slate-500 bg-gray-600 text-slate-300 hover:bg-slate-800 transition"
        >
          Clear
        </button>

        <button
          onClick={handleApply}
          className="w-30 h-10 cursor-pointer rounded-md bg-blue-600 text-white hover:bg-blue-500 transition"
        >
          Apply
        </button>
      </div>
    </aside>
  );
}
