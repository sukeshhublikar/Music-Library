import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Select from "../src/components/Select";
describe("Select Component", () => {
  const mockOnSelect = vi.fn();
  const items = ["Option 1", "Option 2", "Option 3"];

  it("renders correctly with label and default value", () => {
    const { getByText } = render(
      <Select
        label="Choose an option"
        items={items}
        value="Option 1"
        onSelect={mockOnSelect}
      />
    );

    expect(getByText("Choose an option")).toBeInTheDocument();
    expect(getByText("Option 1")).toBeInTheDocument();
  });

  it("opens dropdown and displays all options", async () => {
    render(
      <Select
        label="Choose an option"
        items={items}
        value=""
        onSelect={mockOnSelect}
      />
    );

    const button = screen.getByRole("button");
    await userEvent.click(button); // Open dropdown

    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("selects an option when clicked", async () => {
    render(
      <Select
        label="Choose an option"
        items={items}
        value="Option 1"
        onSelect={mockOnSelect}
      />
    );

    const button = screen.getByRole("button");
    await userEvent.click(button); // Open dropdown

    const option = screen.getByText("Option 2");
    await userEvent.click(option); // Select an option

    expect(mockOnSelect).toHaveBeenCalledWith("Option 2");
  });
});
