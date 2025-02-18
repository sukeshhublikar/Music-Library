import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Filter from "../src/components/Filter"; 
import { FILTER_BY, GROUP_BY, SORT_BY } from "../src/constant";

describe("Filter Component", () => {
  const mockOnChangeFilter = vi.fn();

  const mockValues = {
    groupBy: "none",
    sortBy: "title",
    filterBy: "title",
    filterValue: "",
  };

  it("renders filter inputs and dropdowns", () => {
    render(<Filter onChangeFilter={mockOnChangeFilter} values={mockValues} />);

    expect(screen.getByText(/Group by/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getByText(/Filter by/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Filter Value/i)).toBeInTheDocument();
  });

  it("updates groupBy when changed", async () => {
    render(<Filter onChangeFilter={mockOnChangeFilter} values={mockValues} />);
    const groupBySelect = await screen.getByTestId("Group by");
    fireEvent.click(groupBySelect);
    fireEvent.click(screen.getByText(GROUP_BY[1])); // Select a value from the dropdown
    expect(mockOnChangeFilter).toHaveBeenCalledWith("groupBy", GROUP_BY[1]);
  });

  it("updates sortBy when changed", async () => {
    render(<Filter onChangeFilter={mockOnChangeFilter} values={mockValues} />);
    const sortBySelect = await screen.getByTestId("Sort by");
    fireEvent.click(sortBySelect);
    fireEvent.click(screen.getByText(SORT_BY[1])); // Select a value from the dropdown
    expect(mockOnChangeFilter).toHaveBeenCalledWith("sortBy", SORT_BY[1]);
  });

  it("updates filterBy when changed", async () => {
    render(<Filter onChangeFilter={mockOnChangeFilter} values={mockValues} />);
    const filterBySelect = await screen.getByTestId("Filter by");

    fireEvent.click(filterBySelect);
    fireEvent.click(screen.getByText(FILTER_BY[1])); // Select a value from the dropdown
    expect(mockOnChangeFilter).toHaveBeenCalledWith("filterBy", FILTER_BY[1]);
  });

  it("updates filterValue when user types", () => {
    render(<Filter onChangeFilter={mockOnChangeFilter} values={mockValues} />);

    const filterInput = screen.getByTestId("filter-value");
    fireEvent.change(filterInput, { target: { value: "Rock" } });

    expect(mockOnChangeFilter).toHaveBeenCalledWith("filterValue", "Rock");
  });
});
