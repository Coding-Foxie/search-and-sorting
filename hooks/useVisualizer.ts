import { useState, useRef, useCallback, useEffect } from "react";

interface BaseSortStep {
  array: number[];
  swapping: boolean;
}

export const useVisualizer = <T extends BaseSortStep>(
  onSwap?: () => void,
  onComplete?: () => void,
) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [activeSteps, setActiveSteps] = useState<T[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const stepsRef = useRef<T[]>([]);
  const indexRef = useRef<number>(0); // NEW: Track index in a Ref

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const start = useCallback(
    (steps: T[], speed: number) => {
      if (!steps || steps.length === 0) return;

      // 1. Reset everything before starting
      if (timerRef.current) clearInterval(timerRef.current);

      stepsRef.current = steps;
      setActiveSteps(steps);
      indexRef.current = 0; // Start at the beginning
      setIsSorting(true);

      timerRef.current = setInterval(() => {
        // 2. Access the most current steps and current index
        const allSteps = stepsRef.current;
        const i = indexRef.current;

        // 3. Strict Boundary Check
        if (!allSteps || i >= allSteps.length) {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          setIsSorting(false);
          onComplete?.();
          return;
        }

        // 4. Safe access to the frame
        const currentFrame = allSteps[i];
        if (currentFrame?.swapping) {
          onSwap?.();
        }

        // 5. Update UI and increment Ref
        setCurrentStepIndex(i);
        indexRef.current = i + 1;
      }, speed);
    },
    [onSwap, onComplete],
  );

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    indexRef.current = 0;
    setCurrentStepIndex(-1);
    setIsSorting(false);
    setActiveSteps([]);
    stepsRef.current = [];
  }, []);

  const jumpToStep = (index: number) => {
    if (index >= 0 && index < activeSteps.length) {
      setCurrentStepIndex(index);
    }
  };

  return {
    currentStep: activeSteps[currentStepIndex],
    isSorting,
    start,
    reset,
    totalSteps: activeSteps.length,
    currentStepIndex,
    jumpToStep,
  };
};
