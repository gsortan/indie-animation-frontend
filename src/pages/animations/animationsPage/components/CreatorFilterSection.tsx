import type { CreatorFilterProps } from "../../../../types/creatorFilterProps";
import { Input } from "@heroui/react";

export default function CreatorFilterSection({creatorName,setCreatorName,creatorNameList,setCreatorList}:CreatorFilterProps)
{

    function handleAddCreator(e: React.SubmitEvent) {
      e.preventDefault();
      const v = creatorName.trim();
      if (!v) return;
      setCreatorList((prev) => [...prev, v]);
      setCreatorName("");
    }

  return(<> 
  <form onSubmit={handleAddCreator} className="space-y-2">
          <Input
            label="Creator Name(s)"
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
            variant="bordered"
            classNames={{
              inputWrapper: "border-slate-600 bg-white",
            }}
          />
        </form>

        <div className="h-[10rem] overflow-y-auto bg-white p-2 border border-gray-300 rounded-lg">
          <div className="flex flex-wrap gap-2">
            {creatorNameList.map((name, index) => (
              <button
                key={`${name}-${index}`}
                type="button"
                onClick={() =>
                  setCreatorList((prev) => prev.filter((_, i) => i !== index))
                }
                className=" cursor-pointer px-3 py-1 whitespace-nowrap text-sm text-white bg-gray-500 hover:bg-gray-400 rounded-full"
              >
                {name} <span className="ml-1 font-bold leading-none">×</span>
              </button>
            ))}
            {creatorNameList.length === 0 && (
              <p className="text-sm">No creators added</p>
            )}
          </div>
        </div></>)
}