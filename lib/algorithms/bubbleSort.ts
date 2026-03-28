export interface BubbleStep {
  array: number[];
  comparing: [number, number];
  swapping: boolean;
  sortedUntil: number;
}

export const getBubbleSortSteps = (initialArray: number[]): BubbleStep[] => {
  const arr = [...initialArray];
  const steps: BubbleStep[] = [];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Frame: Comparing
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: false,
        sortedUntil: n - i,
      });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // Frame: Swapping
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapping: true,
          sortedUntil: n - i,
        });
      }
    }
  }
  // Final frame: Success
  steps.push({
    array: [...arr],
    comparing: [-1, -1],
    swapping: false,
    sortedUntil: 0,
  });
  return steps;
};
