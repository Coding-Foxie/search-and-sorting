import { useState, useRef, useCallback, useEffect } from "react";

interface BaseSortStep {
  array: number[];
  swapping: boolean;
}

export const useVisualizer = <T extends BaseSortStep>(
  onSwap?: () => void,
  onComplete?: () => void,
  isPaused: boolean = false, // Added isPaused
  speed: number = 400, // Added speed to the hook
) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [activeSteps, setActiveSteps] = useState<T[]>([]);

  const stepsRef = useRef<T[]>([]);

  // THE ENGINE: This effect drives the animation
  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Only run if sorting, NOT paused, and we have steps left
    if (isSorting && !isPaused && currentStepIndex < activeSteps.length - 1) {
      timer = setTimeout(() => {
        const nextIndex = currentStepIndex + 1;
        const nextFrame = activeSteps[nextIndex];

        if (nextFrame?.swapping) {
          onSwap?.();
        }

        setCurrentStepIndex(nextIndex);

        // Check if we just finished the last step
        if (nextIndex === activeSteps.length - 1) {
          setIsSorting(false);
          onComplete?.();
        }
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [
    isSorting,
    isPaused,
    currentStepIndex,
    activeSteps,
    speed,
    onSwap,
    onComplete,
  ]);

  const start = useCallback((steps: T[]) => {
    if (!steps || steps.length === 0) return;
    stepsRef.current = steps;
    setActiveSteps(steps);
    setCurrentStepIndex(0);
    setIsSorting(true);
  }, []);

  const reset = useCallback(() => {
    setCurrentStepIndex(-1);
    setIsSorting(false);
    setActiveSteps([]);
    stepsRef.current = [];
  }, []);

  return {
    currentStep: activeSteps[currentStepIndex],
    isSorting,
    start,
    reset,
    totalSteps: activeSteps.length,
    currentStepIndex,
  };
};
