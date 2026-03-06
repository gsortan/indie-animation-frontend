import { useEffect, useState } from "react";

import type { RangeFilterProps } from "../../../../types/rangeFilterProps";

export default function RangeFilter({
  filterName,
  stepperValue,
  minRange = 0,
  maxRange = Infinity,
  setRangeFilter,
}: RangeFilterProps) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    const min = Number(start);
    const max = Number(end);

    setRangeFilter({
      min: Number.isFinite(min) && min > 0 ? min : undefined,
      max: Number.isFinite(max) && max > 0 ? max : undefined,
    });
  }, [start, end]);

  function clamp(value: number, min: number, max: number) {
    console.log(value);
    if (isNaN(value)) return min;
    return Math.min(Math.max(value, min), max);
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-white">{filterName}</p>
        <div className="flex gap-4">
          <input
            aria-label="Year filter"
            type="number"
            min={minRange}
            step={stepperValue}
            max={maxRange}
            value={start}
            onChange={(e) => setStart(e.target.value)}
            onBlur={(e) => {
              const clamped = clamp(Number(e.target.value), 0, maxRange);
              setStart(String(clamped));
            }}
            className="border h-8 p-2 bg-white w-full"
          />
          <p className="text-white">-</p>
          <input
            aria-label="Year filter"
            type="number"
            min={minRange}
            step={stepperValue}
            max={maxRange}
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            onBlur={(e) => {
              const clamped = clamp(Number(e.target.value), 0, maxRange);
              setEnd(String(clamped));
            }}
            className="border h-8 p-2 bg-white w-full"
          />
        </div>
      </div>
    </>
  );
}
