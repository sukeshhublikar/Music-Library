import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CheckPermission from "../src/components/Permission";

// Mocking useLocalStorage hook
vi.mock("../hooks/useLocalStorage", () => ({
  __esModule: true,
  default: () => [() => ({ role: "admin" })], // Mocked hook returning an object with role 'admin'
}));

describe("CheckPermission Component", () => {
  it("should render children when user role matches", () => {
    render(
      <CheckPermission role="admin">
        <button>Delete</button>
      </CheckPermission>
    );
    console.log("sws");
    screen.debug();
    // Check if the button (child) is rendered
    //expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should not render children when user role does not match", () => {
   
    vi.mock("../hooks/useLocalStorage", () => ({
      __esModule: true,
      default: () => [() => ({ role: "user" })], // Mocked hook returning an object with role 'guest'
    }));

    render(
      <CheckPermission role="admin">
        <button>Delete</button>
      </CheckPermission>
    );

    // Check if the button is not rendered
    expect(screen.queryByText("Delete")).toBeNull();
  });
});
