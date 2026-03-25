import { useState, useEffect } from "react";
import {
  getBinarySearchSteps,
  SearchStep,
} from "@/lib/algorithms/binarySearch";

export const useBinarySearch = (
  array: number[],
  target: number,
  playTick: () => void,
  playSuccess: () => void,
  playError: () => void,
) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const start = () => {
    const calculatedSteps = getBinarySearchSteps(array, target);
    setSteps(calculatedSteps);
    setCurrentStepIndex(0);
    setIsSearching(true);
  };

  const reset = () => {
    setIsSearching(false);
    setCurrentStepIndex(-1);
    setSteps([]);
  };

  useEffect(() => {
    if (
      isSearching &&
      currentStepIndex !== -1 &&
      currentStepIndex < steps.length
    ) {
      const timer = setTimeout(() => {
        const isLastStep = currentStepIndex === steps.length - 1;
        const foundMatch = steps[currentStepIndex].value === target;

        if (foundMatch) {
          playSuccess();
          setIsSearching(false);
        } else if (isLastStep) {
          playError();
          setIsSearching(false);
        } else {
          playTick();
          setCurrentStepIndex((prev) => prev + 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [
    currentStepIndex,
    isSearching,
    steps,
    target,
    playTick,
    playSuccess,
    playError,
  ]);

  return {
    currentStep: steps[currentStepIndex] || null,
    isSearching,
    start,
    reset,
    foundIndex:
      steps[currentStepIndex]?.value === target
        ? steps[currentStepIndex].mid
        : -1,
  };
};
