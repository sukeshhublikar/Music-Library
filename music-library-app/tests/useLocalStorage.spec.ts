import { act, renderHook } from "@testing-library/react";
import useLocalStorage from "../src/hooks/useLocalStorage";
import { beforeEach, describe, expect, it } from "vitest";

// Mocking window.localStorage
beforeEach(() => {
  // Clear the localStorage before each test to ensure clean state
  window.localStorage.clear();
});

describe("useLocalStorage", () => {
  it("should initialize with value from localStorage", () => {
    // Set up the localStorage with an initial value
    window.localStorage.setItem("testKey", JSON.stringify({ role: "admin" }));

    const { result } = renderHook(() => useLocalStorage("testKey"));

    // Initially, the stored value should be retrieved from localStorage
    expect(result.current[0]()).toEqual({ role: "admin" });
  });

  it("should return empty object if localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("testKey"));

    // When there is no value in localStorage
    expect(result.current[0]()).toEqual({});
  });

  it("should set and get values correctly", () => {
    const { result } = renderHook(() => useLocalStorage("testKey"));

    // Set a new value
    act(() => {
      result.current[1]({ role: "guest" });
    });

    // Check if the value is updated in localStorage and in state
    expect(result.current[0]()).toEqual({ role: "guest" });

    // Retrieve from localStorage directly to verify persistence
    expect(
      JSON.parse(window.localStorage.getItem("testKey") as string)
    ).toEqual({ role: "guest" });
  });

  it("should update value based on a function", () => {
    const { result } = renderHook(() => useLocalStorage("testKey"));

    // Initially set a value
    act(() => {
      result.current[1]({ role: "guest" });
    });

    // Update the value based on the previous state
    act(() => {
      result.current[1]((prevState: any) => ({ ...prevState, role: "admin" }));
    });

    // Check if the updated value is correct
    expect(result.current[0]()).toEqual({ role: "admin" });
  });

  it("should handle errors gracefully when reading or writing to localStorage", () => {
    // Simulate an error by overriding the localStorage methods
    const originalLocalStorage = window.localStorage;
    window.localStorage = {
      getItem: () => {
        throw new Error("Mock error while reading from localStorage");
      },
      setItem: () => {
        throw new Error("Mock error while writing to localStorage");
      },
      clear: () => {},
    } as any;

    const { result } = renderHook(() => useLocalStorage("testKey"));

    expect(result.current[0]()).toEqual({});
    expect(() => {
      act(() => {
        result.current[1]({ role: "admin" });
      });
    }).not.toThrow();

    // Restore the original localStorage
    window.localStorage = originalLocalStorage;
  });
});
