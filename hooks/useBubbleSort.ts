import { useState, useCallback, useRef } from "react";

export interface BubbleStep {
  array: number[];
  comparing: [number, number];
  swapping: boolean;
  sortedUntil: number;
}

export const useBubbleSort = (
  initialArray: number[],
  onSwap?: () => void,
  onComplete?: () => void,
  speed: number = 400
) => {
  const [steps, setSteps] = useState<BubbleStep[]>([]);
  const [currentStepIndex, setStepIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Use a ref for the timer

  const generateSteps = useCallback(() => {
    const arr = [...initialArray]; // FIXED: Use const
    const tempSteps: BubbleStep[] = []; // FIXED: Use const
    const n = arr.length; // FIXED: Use const

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        tempSteps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapping: false,
          sortedUntil: n - i,
        });

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          tempSteps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: true,
            sortedUntil: n - i,
          });
        }
      }
    }

    tempSteps.push({
      array: [...arr],
      comparing: [-1, -1],
      swapping: false,
      sortedUntil: 0,
    });

    return tempSteps;
  }, [initialArray]);

  const start = () => {
    const allSteps = generateSteps();
    setSteps(allSteps);
    setIsSorting(true);

    let index = 0;
    timerRef.current = setInterval(() => {
      if (index >= allSteps.length - 1) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsSorting(false);
        onComplete?.();
        return;
      }

      if (allSteps[index].swapping) onSwap?.();
      setStepIndex(index);
      index++;
    }, speed);
  };

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStepIndex(-1);
    setIsSorting(false);
  };

  return {
    currentStep: steps[currentStepIndex] || {
      array: initialArray,
      comparing: [-1, -1],
      swapping: false,
      sortedUntil: initialArray.length,
    },
    isSorting,
    start,
    reset,
  };
};
