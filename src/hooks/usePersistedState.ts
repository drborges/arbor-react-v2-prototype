import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

import { load, update } from "../storages/localStorage";

/**
 * Provides a version of `useState` backed by LocalStorage
 * in order to provide persistence capabilities across browser
 * refreshes.
 *
 * State is automatically initialized from LocalStorage based
 * on the provided `key`.
 *
 * Whenever the state changes, the LocalStorage entry is updated
 * with the new value.
 */
export default function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(load(key, initialValue));

  useEffect(() => update(key, value), [key, value]);

  return useMemo(() => [value, setValue], [value, setValue]);
}
