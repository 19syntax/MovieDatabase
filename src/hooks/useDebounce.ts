import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debounceValue;
}
