import { useCallback, useEffect, useRef, useState } from "react";

export function useTimeTravel<T>(store) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const snapshotsRef = useRef<T[]>([store.state]);

  const undo = useCallback(() => {
    const isFirstIndex = currentIndex === 0;
    if (isFirstIndex) return;

    const nextIndex = currentIndex - 1;
    setCurrentIndex(nextIndex);
    store.root = snapshotsRef.current[nextIndex];
  }, [currentIndex, store]);

  const redo = useCallback(() => {
    const lastIndex = snapshotsRef.current.length - 1;
    const isLastIndex = currentIndex === lastIndex;
    if (isLastIndex) return;

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    store.root = snapshotsRef.current[nextIndex];
  }, [currentIndex, store]);

  useEffect(() => {
    store.subscribe((nextState) => {
      snapshotsRef.current.push(nextState);
      setCurrentIndex(snapshotsRef.current.length - 1);
    });
  }, [store]);

  return {
    undo,
    redo
  };
}
