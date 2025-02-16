import { useState, useCallback } from "react";

function useLocalStorage<T>(key: string) {
  // State to store the current value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from localStorage
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return {};
    }
  });

  // Getter function to retrieve the latest value
  const getStoredValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
      return {};
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return {};
    }
  }, [key]);

  // Setter function to update localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        setStoredValue(newValue);
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [getStoredValue, setValue] as const;
}

export default useLocalStorage;
