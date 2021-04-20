import Arbor from "arbor-store";
import { useEffect, useMemo } from "react";

import { useTimeTravel } from "./useTimeTravel";
import { load, update } from "../storages/localStorage";

export function useArbor<T>(
  initialValue: T,
  { persist = true, storageKey = "arbor.state" } = {}
) {
  const value = useMemo(
    () => (persist ? load(storageKey, initialValue) : initialValue),
    [initialValue, persist, storageKey]
  );

  const store = useMemo(() => new Arbor(value), [value]);
  const { undo, redo } = useTimeTravel(store);

  useEffect(() => {
    return store.subscribe((nextState) => {
      update(storageKey, nextState);
    });
  }, [storageKey, store]);

  return {
    store,
    undo,
    redo
  };
}
