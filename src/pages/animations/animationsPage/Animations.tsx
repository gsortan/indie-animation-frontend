import { useState } from "react";
import PaginationRounded from "../../../components/PaginationRounded";
import FilterSidebar from "./components/FilterSideBar";

import { useAnimationSearchParams } from "./hooks/useAnimationSearchParams";
import { useAnimationsQuery } from "./hooks/useAnimationQuery";
import { useTags } from "./hooks/useTags";

import AnimationsToolbar from "./components/AnimationsToolBar";
import AnimationsGrid from "./components/AnimationsGrid";
import TableView from "./components/TableView";
import { AnimationsGridSkeleton } from "./components/AnimationGridSkeleton";
import { TableViewSkeleton } from "./components/TableViewSkeleton";

export default function AnimationsPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const sp = useAnimationSearchParams();
  const { tags, isLoading: tagsLoading } = useTags(API_URL);

  const { anims, count, isLoading, hasFetched } = useAnimationsQuery({
    API_URL,
    skip: sp.skip,
    PAGE_SIZE: sp.PAGE_SIZE,
    search: sp.search,
    creators: sp.creators,
    synopsis: sp.synopsis,
    appliedTagsParam: sp.appliedTagsParam,
    episodesMin: sp.episodesMin,
    episodesMax: sp.episodesMax,
    ratingMin: sp.ratingMin,
    ratingMax: sp.ratingMax,
    yearMin: sp.yearMin,
    yearMax: sp.yearMax,
    sort: sp.sort,
    searchParamsKey: sp.searchParams.toString(),
  });

  const showNoResults = hasFetched && !isLoading && anims.length === 0;

  return (
    <div className="mt-4">
      <h1 className="text-4xl font-bold text-blue-400 ml-8">
        Browse Animation catalogue
      </h1>

      <div
        className={`${showMobileFilters ? "block" : "hidden"} lg2:hidden mt-4`}
      >
        <div className="flex items-center bg-zinc-900 justify-between px-4 py-3">
          <p className="text-lg text-white font-semibold">Filters</p>
          <button
            className="text-sm text-white text-gray-600 hover:text-gray-900"
            onClick={() => setShowMobileFilters(false)}
          >
            Close
          </button>
        </div>

        <FilterSidebar
          tags={tags}
          tagsLoading={tagsLoading}
          draftTagIds={sp.draftTagIds}
          toggleDraftTag={sp.toggleDraftTag}
          clearFilters={sp.clearFilters}
          className="w-full"
          onClose={() => setShowMobileFilters(false)}
          showHeader={false}
        />
      </div>

      <div className={`${showMobileFilters ? "hidden lg2:flex" : "flex"} mt-4`}>
        <aside className="hidden lg2:block">
          <FilterSidebar
            tags={tags}
            tagsLoading={tagsLoading}
            draftTagIds={sp.draftTagIds}
            toggleDraftTag={sp.toggleDraftTag}
            clearFilters={sp.clearFilters}
          />
        </aside>

        <main className="flex-1 min-w-0 ml-8 space-y-4 min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[65vh]">
          <AnimationsToolbar
            search={sp.search}
            sort={sp.sort}
            onSearch={sp.handleSearchSubmit}
            onSort={sp.handleSortChange}
            onOpenMobileFilters={() => setShowMobileFilters(true)}
            view={sp.view}
            changeTableView={() => sp.handleViewChange("table")}
            changeGridView={() => sp.handleViewChange("grid")}
          />

          {isLoading && !hasFetched ? (
            sp.view === "table" ? (
              <TableViewSkeleton />
            ) : (
              <AnimationsGridSkeleton />
            )
          ) : showNoResults ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                No results found
              </h2>
            </div>
          ) : (
            <>
              {sp.view === "table" ? (
                <TableView anims={anims} />
              ) : (
                <AnimationsGrid anims={anims} />
              )}

              <div className="mb-4">
                <PaginationRounded
                  totalCount={count}
                  PAGE_SIZE={sp.PAGE_SIZE}
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
