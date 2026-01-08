
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { THEMES } from '../constants';
import type { Theme } from '../types';

function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (key === 'mosqueAppTheme' && item) {
        // For themes, we store the ID and retrieve the full object
        const foundTheme = THEMES.find(t => t.id === JSON.parse(item));
        return (foundTheme || initialValue) as T;
      }
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        let itemToSet = valueToStore;
        // For themes, we only store the ID to avoid stale data
        // Added 'unknown' cast to avoid TypeScript overlap error
        if (key === 'mosqueAppTheme' && typeof valueToStore === 'object' && valueToStore !== null && 'id' in valueToStore) {
            itemToSet = (valueToStore as unknown as Theme).id as unknown as T;
        }
        window.localStorage.setItem(key, JSON.stringify(itemToSet));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storedValue, setValue];
}

export default useLocalStorage;