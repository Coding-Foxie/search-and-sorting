import { useState, useRef, useCallback, useEffect } from "react";
import { useVisualizerStore } from "@/store/use-visualizer-store";

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
  // --- Local Hook State ---
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [activeSteps, setActiveSteps] = useState<T[]>([]);
  const [initialStateSnapshot, setInitialStateSnapshot] = useState<number[]>(
    [],
  );

  // --- Zustand Store Sync Setters ---
  const setCurrentStep = useVisualizerStore((s) => s.setCurrentStep);
  const setTotalSteps = useVisualizerStore((s) => s.setTotalSteps);

  const stepsRef = useRef<T[]>([]);
  const onCompleteRef = useRef(onComplete);

  // Keep the completion callback up to date
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // --- SYNC WITH ZUSTAND STORE ---
  // This is what makes your StepController and Progress Bar work!
  useEffect(() => {
    setCurrentStep(currentStepIndex);
    setTotalSteps(activeSteps.length);
  }, [currentStepIndex, activeSteps.length, setCurrentStep, setTotalSteps]);

  // --- THE ANIMATION ENGINE ---
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

        // Check if we just finished the last step
        if (nextIndex === activeSteps.length - 1) {
          // 1. Tell the UI we are done
          setIsCompleted(true);
          // 2. Stop the timer
          setIsSorting(false);
          // 3. Trigger the callback to update dataInput in your page
          onCompleteRef.current?.(activeSteps[nextIndex].array);
        }
      }, speed);
    }
    return () => clearTimeout(timer);
  }, [isSorting, isPaused, currentStepIndex, activeSteps, speed, onSwap]);

  // --- CONTROL ACTIONS ---
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

  const clearCompleted = useCallback(() => {
    setIsCompleted(false);
  }, []);

  const start = useCallback((steps: T[]) => {
    if (!steps || steps.length === 0) return;
    setIsCompleted(false);
    stepsRef.current = steps;
    setActiveSteps(steps);
    setCurrentStepIndex(0);
    setIsSorting(true);
  }, []);

  const reset = useCallback(() => {
    setCurrentStepIndex(-1);
    setIsSorting(false);
    setIsCompleted(false);
    setActiveSteps([]);
    setInitialStateSnapshot([]);
    stepsRef.current = [];

    // Clear the store values immediately on reset
    setCurrentStep(-1);
    setTotalSteps(0);
  }, [setCurrentStep, setTotalSteps]);

  return {
    // Current frame data
    currentStep: activeSteps[currentStepIndex],
    isSorting,
    currentStepIndex,
    isCompleted,
    totalSteps: activeSteps.length,

    // Initial data for reset/comparison
    initialStateSnapshot,
    setInitialStateSnapshot,

    // Methods
    start,
    reset,
    clearCompleted,
    stepForward,
    stepBackward,
  };
};
