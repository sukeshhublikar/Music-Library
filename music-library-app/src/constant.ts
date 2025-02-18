import { Song } from "./components/MusicLibrary";

export const GROUP_BY = ["none", "artist", "album"];

export const SORT_BY = ["none", "artist", "album"];

export const FILTER_BY = ["title", "artist", "album"];

export const initialSongs: Song[] = [
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
