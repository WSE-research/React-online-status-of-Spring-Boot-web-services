import { useEffect, useState } from "react";

/**
 * @template T
 * @param {Storage} storage
 * @param {string} key
 * @param {T} defaultValue
 * @returns {[T, (param: T) => void]}
 *
 */
export const useStorage = (
  storage,
  key,
  defaultValue,
  checkIntervalMs = 10000
) => {
  const [stateValue, setStateValue] = useState(defaultValue);
  useEffect(() => {
    try {
      const parsedStorageValue = JSON.parse(storage.getItem(key));
      setStateValue(parsedStorageValue);
    } catch (_error) {}

    const intervalTimer = setInterval(() => {
      try {
        const parsedStorageValue = JSON.parse(storage.getItem(key));
        if (stateValue !== parsedStorageValue)
          setStateValue(parsedStorageValue);
      } catch (_error) {}
    }, checkIntervalMs);

    // @ts-ignore
    return () => clearInterval(intervalTimer);
  }, []);
  const setStorageValue = (value) => {
    if (storage.getItem(key) !== JSON.stringify(value))
      storage.setItem(key, JSON.stringify(value));
    if (stateValue !== value) setStateValue(value);
  };

  return [stateValue, setStorageValue];
};

export const useLocalStorage = (key, defaultValue, checkIntervalMs = 10000) =>
  useStorage(localStorage, key, defaultValue, checkIntervalMs);
export const useSessionStorage = (key, defaultValue, checkIntervalMs = 10000) =>
  useStorage(sessionStorage, key, defaultValue, checkIntervalMs);
