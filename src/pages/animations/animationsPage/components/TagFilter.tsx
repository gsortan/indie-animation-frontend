import type { TagFilterProps } from "../../../../types/tagFilterProps";

type Props = TagFilterProps & {
  tagsLoading?: boolean;
};

export default function TagFilter({
  tags,
  tagsLoading,
  draftTagIds,
  toggleDraftTag,
}: Props) {
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-4">
      <div className="max-h-[320px] overflow-y-auto pr-1">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">

          {tagsLoading ? (
            <div className="text-sm text-gray-500">Loading tags...</div>
          ) : (
            tags.map((tag) => {
              const isSelected = draftTagIds.includes(tag.id);

              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleDraftTag(tag.id)}
                  className={[
                    "px-3 py-2 text-xs rounded-full cursor-pointer transition border",
                    "whitespace-nowrap overflow-hidden text-ellipsis",
                    isSelected
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50",
                  ].join(" ")}
                  title={tag.tagName}
                >
                  {tag.tagName}
                </button>
              );
            })
          )}

        </div>
      </div>
    </div>
  );
}