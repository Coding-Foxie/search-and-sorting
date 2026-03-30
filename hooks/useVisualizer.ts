import { useState, useRef, useCallback, useEffect } from "react";

interface BaseSortStep {
  array: number[];
  swapping: boolean;
}

export const useVisualizer = <T extends BaseSortStep>(
  onSwap?: () => void,
  onComplete?: (array: number[]) => void,
  isPaused: boolean = false,
  speed: number = 400,
) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [activeSteps, setActiveSteps] = useState<T[]>([]);

  // 🌟 ADD THIS LINE: Define the snapshot state here
  const [initialStateSnapshot, setInitialStateSnapshot] = useState<number[]>(
    [],
  );

  const stepsRef = useRef<T[]>([]);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // THE ENGINE
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (
      isSorting &&
      !isPaused &&
      activeSteps.length > 0 &&
      currentStepIndex < activeSteps.length - 1
    ) {
      timer = setTimeout(() => {
        const nextIndex = currentStepIndex + 1;
        const nextFrame = activeSteps[nextIndex];

        if (nextFrame?.swapping) {
          onSwap?.();
        }

        setCurrentStepIndex(nextIndex);

        if (nextIndex === activeSteps.length - 1) {
          setIsSorting(false);
          onCompleteRef.current?.(activeSteps[nextIndex].array);
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
    // onComplete,
  ]);

  const stepForward = useCallback(() => {
    if (currentStepIndex < activeSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }, [currentStepIndex, activeSteps.length]);

  const stepBackward = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

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
    // ✅ This now works because the state is defined above!
    setInitialStateSnapshot([]);
    stepsRef.current = [];
  }, []);

  return {
    currentStep: activeSteps[currentStepIndex],
    isSorting,
    start,
    reset,
    totalSteps: activeSteps.length,
    currentStepIndex,
    // 🌟 ADD THESE: Return them so your Page can use them
    initialStateSnapshot,
    setInitialStateSnapshot,
    stepForward,
    stepBackward,
  };
};
