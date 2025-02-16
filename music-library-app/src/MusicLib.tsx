import { useMemo, useState } from "react";
import Select from "./components/Select";
import SongList from "./components/SongList";
import CheckPermission from "./components/Permission";
import { FILTER_BY, GROUP_BY, initialSongs, SORT_BY } from "./constant";

export type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
};

export default function MusicLib() {
  const [songs] = useState<Song[]>(initialSongs);
  const [groupBy, setGroupBy] = useState<"none" | "album" | "artist">("none");
  const [sortBy, setSortBy] = useState<"title" | "artist" | "album">("title");
  const [filterBy, setFilterBy] = useState<"title" | "artist" | "album">(
    "title"
  );
  const [filterValue, setFilterValue] = useState("");
  const filteredAndSortedSongs = useMemo(() => {
    return songs
      .filter((song) =>
        song[filterBy].toLowerCase().includes(filterValue.toLowerCase())
      )
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [songs, filterBy, filterValue, sortBy]);

  const groupedSongs = useMemo(() => {
    if (groupBy === "none") {
      return { "All Songs": filteredAndSortedSongs };
    }

    return filteredAndSortedSongs.reduce((acc, song) => {
      const key = song[groupBy];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(song);
      return acc;
    }, {} as Record<string, Song[]>);
  }, [filteredAndSortedSongs, groupBy]);

  return (
    <>
      <div className=" px-4 py-2 mt-2 flex md:flex-row gap-8 sm:flex-col">
        <Select
          label="Group by"
          items={GROUP_BY}
          value={groupBy}
          onSelect={(value: "none" | "album" | "artist") => setGroupBy(value)}
        />
        <Select
          label="Sort by"
          items={SORT_BY}
          value={sortBy}
          onSelect={(value: "title" | "artist" | "album") => setSortBy(value)}
        />
        <Select
          label="Filter by"
          items={FILTER_BY}
          value={filterBy}
          onSelect={(value: "title" | "artist" | "album") => setFilterBy(value)}
        />
        <div className="">
          <label className="font-bold">Filter Value</label>
          <input
            type="text"
            name="filterValue"
            id="filterValue"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-1.5 mt-1 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-200 shadow-lg"
          />
        </div>
        <CheckPermission role="admin">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-base font-light py-1.5 px-4 rounded-md mt-auto"
            onClick={() => alert("Add Song")}
          >
            Add Song
          </button>
        </CheckPermission>
      </div>
      <SongList groupedSongs={groupedSongs} />
    </>
  );
}
