import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";

type SearchBarProps = {
  placeHolderMsg: string;
  onSubmitSearch: (q: string) => void;
  initialQ?: string;
};

export default function SearchBar({
  placeHolderMsg,
  onSubmitSearch,
  initialQ = "",
}: SearchBarProps) {
  const [q, setQ] = useState(initialQ);

  useEffect(() => {
    setQ(initialQ);
  }, [initialQ]);

  function onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmitSearch(q);
  }

  return (
    <form onSubmit={onSubmit} className="w-full  max-w-[30rem]">
      <div className="flex  ">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeHolderMsg}
          className="w-full h-12 px-4 text-lg bg-black text-white placeholder-gray-400 border border-gray-700 rounded-l-md outline-none"
        />

        <button
          aria-label="Search"
          type="submit"
          className="cursor-pointer h-12 w-14 flex items-center justify-center bg-gray-800 text-white rounded-r-md hover:bg-gray-700 transition"
        >
          <MdSearch size={20} />
        </button>
      </div>
    </form>
  );
}
