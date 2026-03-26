import { useState, useCallback, useRef } from "react";

interface SearchStep {
  low: number;
  high: number;
  mid: number;
  stepNumber: number;
}

export function useBinarySearch(
  array: number[],
  target: number,
  onTick?: () => void,
  onSuccess?: () => void,
  onError?: () => void,
) {
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [stepIndex, setStepIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [foundIndex, setFoundIndex] = useState(-1);

  // Use a ref to keep track of the auto-play timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Generate all steps at once
  const generateSteps = useCallback(() => {
    const newSteps: SearchStep[] = [];
    let low = 0;
    let high = array.length - 1;
    let count = 0;

    while (low <= high) {
      count++;
      const mid = Math.floor((low + high) / 2);
      newSteps.push({ low, high, mid, stepNumber: count });

      if (array[mid] === target) break;
      if (array[mid] < target) low = mid + 1;
      else high = mid - 1;
    }
    return newSteps;
  }, [array, target]);

  // 2. Manual Navigation
  const next = () => {
    setStepIndex((prev) => {
      const nextIdx = Math.min(prev + 1, steps.length - 1);
      if (onTick) onTick();

      // Check if this new step is the solution
      if (steps[nextIdx] && array[steps[nextIdx].mid] === target) {
        setFoundIndex(steps[nextIdx].mid);
        if (onSuccess) onSuccess();
      }
      return nextIdx;
    });
  };

  const prev = () => {
    setFoundIndex(-1); // Hide success highlight when going back
    setStepIndex((prev) => Math.max(prev - 1, 0));
    if (onTick) onTick();
  };

  // 3. Auto-Play Logic
  const startAuto = async () => {
    const generated = generateSteps();
    setSteps(generated);
    setFoundIndex(-1);
    setIsSearching(true);

    // Play through steps
    for (let i = 0; i < generated.length; i++) {
      setStepIndex(i);
      if (onTick) onTick();

      if (array[generated[i].mid] === target) {
        setFoundIndex(generated[i].mid);
        if (onSuccess) onSuccess();
        setIsSearching(false);
        return;
      }

      await new Promise((r) => setTimeout(r, 800));
    }

    setIsSearching(false);
    if (onError) onError();
  };

  const reset = () => {
    setSteps([]);
    setStepIndex(-1);
    setIsSearching(false);
    setFoundIndex(-1);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return {
    currentStep: steps[stepIndex] || null,
    isSearching,
    start: startAuto,
    next,
    prev,
    reset,
    foundIndex,
    canNext: stepIndex < steps.length - 1,
    canPrev: stepIndex > 0,
  };
}
