import { useMemo, useState } from "react";
import Select from "./Select";
import SongList from "./SongList";
const GROUP_BY = ["none", "artist", "album"];

const SORT_BY = ["none", "artist", "album"];

const FILTER_BY = ["title", "artist", "album"];

type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
};

const initialSongs: Song[] = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
  },
  {
    id: 2,
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV",
  },
  {
    id: 3,
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
  },
  { id: 4, title: "Imagine", artist: "John Lennon", album: "Imagine" },
  {
    id: 5,
    title: "Sweet Child o' Mine",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction",
  },
  {
    id: 6,
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
  },
  { id: 7, title: "Purple Rain", artist: "Prince", album: "Purple Rain" },
  {
    id: 8,
    title: "Like a Rolling Stone",
    artist: "Bob Dylan",
    album: "Highway 61 Revisited",
  },
  { id: 9, title: "Billie Jean", artist: "Michael Jackson", album: "Thriller" },
  {
    id: 10,
    title: "Another Brick in the Wall",
    artist: "Pink Floyd",
    album: "The Wall",
  },
];

export default function Filter() {
  const [songs, setSongs] = useState<Song[]>(initialSongs);
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
            id="ffilterValue"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-1.5 mt-1 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-200 shadow-lg"
          />
        </div>
      </div>
      <SongList groupedSongs={groupedSongs} />
    </>
  );
}
