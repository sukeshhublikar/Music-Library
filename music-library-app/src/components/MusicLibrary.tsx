import { useMemo, useState } from "react";

import SongList from "./SongList";
import Filter from "./Filter";
import { initialSongs } from "../constant";

export type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
};

export default function MusicLibrary() {
  const [songs] = useState<Song[]>(initialSongs);
  const [groupBy, setGroupBy] = useState<"none" | "album" | "artist">("none");
  const [sortBy, setSortBy] = useState<"title" | "artist" | "album">("title");
  const [filterBy, setFilterBy] = useState<"title" | "artist" | "album">(
    "title"
  );
  const [filterValue, setFilterValue] = useState("");

  const onChangeFilter = (
    key: "groupBy" | "sortBy" | "filterBy" | "filterValue",
    value: string
  ) => {
    if (key === "groupBy") {
      setGroupBy(value as "none" | "album" | "artist");
    }
    if (key === "sortBy") {
      setSortBy(value as "title" | "artist" | "album");
    }
    if (key === "filterBy") {
      setFilterBy(value as "title" | "artist" | "album");
    }
    if (key === "filterValue") {
      setFilterValue(value);
    }
  };

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
    <div data-testid="music-library">
      <Filter
        onChangeFilter={onChangeFilter}
        values={{ groupBy, sortBy, filterBy, filterValue }}
      />
      <SongList groupedSongs={groupedSongs} />
    </div>
  );
}
