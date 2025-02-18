import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MusicApp from "../src/MusicApp";

// Mock the child components
vi.mock("./AppContainer", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-container">{children}</div>
  ),
}));
vi.mock("./components/MusicLibrary", () => ({
  default: () => <div data-testid="music-library">Music Library</div>,
}));

describe("MusicApp Component", () => {
  it("renders AppContainer and MusicLibrary", () => {
    render(<MusicApp />);

    // Check if AppContainer is present
    expect(screen.getByTestId("app-container")).toBeInTheDocument();

    // Check if MusicLibrary is rendered inside it
    expect(screen.getByTestId("music-library")).toBeInTheDocument();
  });
});
