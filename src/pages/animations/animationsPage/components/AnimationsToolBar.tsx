import SearchBar from "../../../../components/SearchBar";
import SortDropdown from "./SortDropdown";
import { FaTable, FaThLarge } from "react-icons/fa";

type Props = {
  search: string;
  sort: string;
  view: "grid" | "table";
  onSearch: (q: string) => void;
  onSort: (value: string) => void;
  onOpenMobileFilters: () => void;
  changeTableView: () => void;
  changeGridView: () => void;
};

export default function AnimationsToolbar({
  search,
  sort,
  view,
  onSearch,
  onSort,
  onOpenMobileFilters,
  changeTableView,
  changeGridView,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <SearchBar
        placeHolderMsg="Browse indie animations..."
        onSubmitSearch={onSearch}
        initialQ={search}
      />

      <SortDropdown value={sort} onChange={onSort} />

      <button
        type="button"
        className="lg2:hidden w-20 h-10 px-2 text-white bg-gray-700 rounded-md hover:bg-gray-600"
        onClick={onOpenMobileFilters}
      >
        Filters
      </button>

      <div className="flex items-center gap-2 mr-4">
        <button
          type="button"
          onClick={changeTableView}
          aria-label="table view"
          title="Table view"
          className={`w-10 h-10 flex cursor-pointer items-center justify-center rounded-md transition ${
            view === "table"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          <FaTable />
        </button>

        <button
          type="button"
          onClick={changeGridView}
          aria-label="grid view"
          title="Grid view"
          className={`w-10 h-10 cursor-pointer flex items-center justify-center rounded-md transition ${
            view === "grid"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          <FaThLarge />
        </button>
      </div>
    </div>
  );
}
