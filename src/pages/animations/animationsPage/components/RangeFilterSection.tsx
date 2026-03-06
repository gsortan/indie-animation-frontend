        
        import RangeFilter from "./RangeFIlter"
       import type { RangeFilterSectionProps } from "../../../../types/RangeFilterSectionProps"


        export default function RangeFilterSection({setRangeEpisodes, setRangeRating, currentYear, setRangeYear} : RangeFilterSectionProps)
        {
        return(<><div className="space-y-3">
          <RangeFilter
            filterName="Episodes:"
            stepperValue={1}
            setRangeFilter={setRangeEpisodes}
          />
          <RangeFilter
            filterName="Rating:"
            stepperValue={0.1}
            maxRange={5}
            setRangeFilter={setRangeRating}
          />
          <RangeFilter
            filterName="Year:"
            stepperValue={1}
            maxRange={currentYear}
            setRangeFilter={setRangeYear}
          />
        </div></>)
        }