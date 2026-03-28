export interface SelectionStep {
  array: number[];
  comparing: [number, number]; // [current_index, min_found_index]
  swapping: boolean;
  sortedUntil: number;
}

export const getSelectionSortSteps = (
  initialArray: number[],
): SelectionStep[] => {
  const arr = [...initialArray];
  const steps: SelectionStep[] = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Initial state for this pass
    steps.push({
      array: [...arr],
      comparing: [i, minIdx],
      swapping: false,
      sortedUntil: i,
    });

    for (let j = i + 1; j < n; j++) {
      // Scanning for the minimum
      steps.push({
        array: [...arr],
        comparing: [j, minIdx],
        swapping: false,
        sortedUntil: i,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        // Found a new minimum!
        steps.push({
          array: [...arr],
          comparing: [j, minIdx],
          swapping: false,
          sortedUntil: i,
        });
      }
    }

    if (minIdx !== i) {
      // Perform the swap
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: [...arr],
        comparing: [i, minIdx],
        swapping: true,
        sortedUntil: i + 1,
      });
    }
  }

  // Final sorted state
  steps.push({
    array: [...arr],
    comparing: [-1, -1],
    swapping: false,
    sortedUntil: n,
  });
  return steps;
};
