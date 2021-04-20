/**
 * Looks up an entry from local storage based on the given key.
 *
 * Returns the provide `defaultValue` in case the entry
 * does not exist or the look up fails.
 */
export function load<T>(key: string, defaultValue: T): T {
  try {
    return JSON.parse(window.localStorage.getItem(key)) || defaultValue;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return defaultValue;
  }
}

/**
 * Updates a local storage entry with a new value.
 */
export function update<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}
