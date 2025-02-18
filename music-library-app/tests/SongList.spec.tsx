import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SongList from "../src/components/SongList"; 
// import CheckPermission from "../src/components/Permission"; 

// Mock CheckPermission Component to simulate different roles
vi.mock("../src/components/Permission", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
  },
}));

describe("SongList Component", () => {
  const mockGroupedSongs = {
    Pop: [
      { id: 1, title: "Song 1", artist: "Artist 1", album: "Album 1" },
      { id: 2, title: "Song 2", artist: "Artist 2", album: "Album 2" },
    ],
    Rock: [{ id: 3, title: "Song 3", artist: "Artist 3", album: "Album 3" }],
  };

  it("should render grouped songs correctly", () => {
    render(<SongList groupedSongs={mockGroupedSongs} />);

    // Check if song groups are rendered
    expect(screen.getByText("Pop")).toBeInTheDocument();
    expect(screen.getByText("Rock")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button")[0]);

    // Check if song titles are rendered within groups
    expect(screen.getByText("Song 1")).toBeInTheDocument();
    expect(screen.getByText("Song 2")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button")[0]);
    fireEvent.click(screen.getAllByRole("button")[1]);

    expect(screen.getByText("Song 3")).toBeInTheDocument();
  });

  it("should expand and collapse the group on button click", () => {
    render(<SongList groupedSongs={mockGroupedSongs} />);

    const popGroupButton = screen.getByText("Pop");
    const rockGroupButton = screen.getByText("Rock");

    // Initially, group panels should be collapsed
    expect(screen.queryByText("Album 1")).toBeNull();
    expect(screen.queryByText("Album 3")).toBeNull();

    // Expand "Pop" group
    fireEvent.click(popGroupButton);
    expect(screen.getByText("by Artist 1 (Album 1)")).toBeInTheDocument();

    // Expand "Rock" group
    fireEvent.click(rockGroupButton);
    expect(screen.getByText("by Artist 3 (Album 3)")).toBeInTheDocument();
    // Collapse "Pop" group
    fireEvent.click(popGroupButton);
    expect(screen.queryByText("by Artist 1 Album 1")).toBeNull();
  });

  it("should display Delete button for admin role", () => {
    // Mock CheckPermission to simulate 'admin' role
    render(
      <SongList
        groupedSongs={{
          Pop: [
            { id: 1, title: "Song 1", artist: "Artist 1", album: "Album 1" },
          ],
        }}
      />
    );
    const popGroupButton = screen.getByText("Pop");
    fireEvent.click(popGroupButton);
    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toBeInTheDocument();
  });

  it("should not display Delete button for non-admin role", () => {
    // Mock CheckPermission to simulate a non-admin role (e.g., user)
    vi.mock(".../src/components/Permission", () => ({
      __esModule: true,
      default: ({
        role,
        children,
      }: {
        role: string;
        children: React.ReactNode;
      }) => {
        if (role !== "admin") {
          return <div>{children}</div>;
        }
        return <div></div>;
      },
    }));

    render(
      <SongList
        groupedSongs={{
          Pop: [
            { id: 1, title: "Song 1", artist: "Artist 1", album: "Album 1" },
          ],
        }}
      />
    );

    const deleteButton = screen.queryByText("Delete");
    expect(deleteButton).toBeNull();
  });

  it("should trigger delete action when delete button is clicked", () => {
    // Mock the alert function
    const alertMock = vi.fn();
    global.alert = alertMock;

    render(
      <SongList
        groupedSongs={{
          Pop: [
            { id: 1, title: "Song 1", artist: "Artist 1", album: "Album 1" },
          ],
        }}
      />
    );
    const popGroupButton = screen.getByText("Pop");
    fireEvent.click(popGroupButton);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(alertMock).toHaveBeenCalledWith("Delete");
  });
});
