import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MusicLibrary from "../src/components/MusicLibrary"; 

describe("MusicLibrary Component", () => {
  it("renders without crashing", () => {
    render(<MusicLibrary />);
    expect(screen.getByText(/All Songs/i)).toBeInTheDocument();
  });

  it("filters songs based on title input", async () => {
    render(<MusicLibrary />);
    const input = await screen.getByTestId("filter-value");
    fireEvent.change(input, { target: { value: "Song A" } });
    expect(screen.getByDisplayValue(/Song A/i)).toBeInTheDocument();
  });

  it("sorts songs by artist", async () => {
    render(<MusicLibrary />);
    // const select = screen.getByRole("button");
    //   screen.debug(select);
    const select = await screen.getByTestId("Group by");
    fireEvent.click(select);
    fireEvent.click(screen.getAllByRole("option")[1]);
    expect(screen.getByText(/artist/i)).toBeInTheDocument();
  });

  it("groups songs by album", async () => {
    render(<MusicLibrary />);
    const select = await screen.getByTestId("Group by");
    fireEvent.click(select);
    fireEvent.click(screen.getAllByRole("option")[2]);
    screen.debug();
    expect(screen.getByText(/album/i)).toBeInTheDocument();
  });
});
