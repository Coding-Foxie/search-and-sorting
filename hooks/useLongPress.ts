import { useRef, useCallback } from "react";

export const useLongPress = (callback: () => void, ms = 500) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    timerRef.current = setTimeout(() => {
      callback();
      timerRef.current = null; // Mark as "Long Press Triggered"
    }, ms);
  }, [callback, ms]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      callback(); // Still trigger if it was just a short click
      timerRef.current = null;
    }
  }, [callback]);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop, // Safety: stop if the mouse leaves the button
    onTouchStart: start, // Support for mobile!
    onTouchEnd: stop,
  };
};
