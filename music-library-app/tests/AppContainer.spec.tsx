import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AppContainer from "../src/AppContainer";

describe("AppContainer", () => {
  it("renders children correctly", () => {
    render(
      <AppContainer>
        <p data-testid="child-element">Hello, World!</p>
      </AppContainer>
    );

    // Check if the child element is rendered inside AppContainer
    expect(screen.getByTestId("child-element")).toBeInTheDocument();
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });

  it("applies correct styles", () => {
    const { container } = render(
      <AppContainer>
        <p>Test Content</p>
      </AppContainer>
    );

    // Check if the AppContainer has the correct Tailwind class
    expect(container.firstChild).toHaveClass("h-full bg-[#f5f8fb]");
  });
});
