import Select from "./Select";
import { FILTER_BY, GROUP_BY, SORT_BY } from "../constant";

export default function Filter({
  onChangeFilter,
  values,
}: {
  onChangeFilter: (
    key: "groupBy" | "sortBy" | "filterBy" | "filterValue",
    value: string | "none" | "album" | "artist" | "title"
  ) => void;
  values: {
    groupBy: string;
    sortBy: string;
    filterBy: string;
    filterValue: string;
  };
}) {
  const { groupBy, sortBy, filterBy, filterValue } = values;
  return (
    <>
      <div className=" px-4 py-2 mt-2 flex flex-row gap-8 flex-wrap">
        <Select
          label="Group by"
          items={GROUP_BY}
          value={groupBy}
          onSelect={(value) =>
            onChangeFilter("groupBy", value as "none" | "artist" | "album")
          }
        />
        <Select
          label="Sort by"
          items={SORT_BY}
          value={sortBy}
          onSelect={(value) =>
            onChangeFilter("sortBy", value as "title" | "artist" | "album")
          }
        />
        <Select
          label="Filter by"
          items={FILTER_BY}
          value={filterBy}
          onSelect={(value) =>
            onChangeFilter("filterBy", value as "title" | "artist" | "album")
          }
        />
        <div className="">
          <label className="font-bold" aria-label="Filter Value">
            Filter Value
          </label>
          <input
            type="text"
            name="filterValue"
            data-testid="filter-value"
            value={filterValue}
            onChange={(e) => onChangeFilter("filterValue", e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-1.5 mt-1 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-200 shadow-lg"
          />
        </div>
      </div>
    </>
  );
}
