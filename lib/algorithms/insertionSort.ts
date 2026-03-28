export interface InsertionStep {
  array: number[];
  comparing: [number, number]; // [current_element, element_being_checked]
  swapping: boolean;
  sortedUntil: number;
}

export const getInsertionSortSteps = (
  initialArray: number[],
): InsertionStep[] => {
  const arr = [...initialArray];
  const steps: InsertionStep[] = [];
  const n = arr.length;

  // We start from the second element (index 1)
  for (let i = 1; i < n; i++) {
    let j = i;

    // Initial state: picking up the 'key' element
    steps.push({
      array: [...arr],
      comparing: [j, j - 1],
      swapping: false,
      sortedUntil: i,
    });

    while (j > 0 && arr[j] < arr[j - 1]) {
      // Comparison and Swap logic
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      j--;

      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: true,
        sortedUntil: i,
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
