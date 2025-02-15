import { Disclosure } from "@headlessui/react";

type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
};

type SongListProps = {
  groupedSongs: Record<string, Song[]>;
};

export default function SongList({ groupedSongs }: SongListProps) {
  return (
    <div className="w-full">
      {Object.entries(groupedSongs).map(([group, songs]) => (
        <div className="w-full px-4 mb-2">
          <div className=" w-full rounded-2xl bg-white p-2">
            <Disclosure key={group}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-[#eef3f8] px-4 py-2 text-left text-sm font-medium  hover:bg-[#eef3f8] focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                    <span>{group} </span>
                    <span className="pointer-events-none   right-0 flex items-center pr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 9l6 6l6 -6" />
                      </svg>
                    </span>
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                    <ul className="space-y-2">
                      {songs.map((song) => (
                        <li key={song.id} className="bg-secondary p-2 rounded">
                          <span className="font-semibold">{song.title}</span> by{" "}
                          {song.artist} ({song.album})
                        </li>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      ))}
    </div>
  );
}
