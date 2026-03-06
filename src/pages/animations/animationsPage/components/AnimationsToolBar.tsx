import SearchBar from "../../../../components/SearchBar";
import SortDropdown from "./SortDropdown";

type Props = {
  search: string;
  sort: string;
  onSearch: (q: string) => void;
  onSort: (value: string) => void;
  onOpenMobileFilters: () => void;
};

export default function AnimationsToolbar({
  search,
  sort,
  onSearch,
  onSort,
  onOpenMobileFilters,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <SearchBar
        placeHolderMsg="Browse indie animations..."
        onSubmitSearch={onSearch}
        initialQ={search}
      />
      <SortDropdown value={sort} onChange={onSort} />
      <button
        className="lg2:hidden w-20 p-2 h-10 text-white bg-gray-700 rounded-md hover:bg-gray-600"
        onClick={onOpenMobileFilters}
      >
        Filters
      </button>
    </div>
  );
}