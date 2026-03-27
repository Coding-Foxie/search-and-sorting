import { useState } from "react";
import { BubbleStep } from "./useBubbleSort";

export const useVisualizer = (
  steps: BubbleStep[],
  speed: number,
  onSwap?: () => void,
) => {
  const [index, setIndex] = useState(-1);
  const [isActive, setIsActive] = useState(false);

  const play = () => {
    setIsActive(true);
    let i = 0;
    const timer = setInterval(() => {
      if (i >= steps.length - 1) {
        clearInterval(timer);
        setIsActive(false);
        return;
      }
      if (steps[i].swapping) onSwap?.();
      setIndex(i);
      i++;
    }, speed);
  };

  return {
    currentStep: steps[index],
    isActive,
    play,
    reset: () => setIndex(-1),
  };
};
