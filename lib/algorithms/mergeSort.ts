// lib/algorithms/mergeSort.ts

export interface MergeStep {
  array: number[];
  comparing: [number, number];
  swapping: boolean;
  range: [number, number]; // [start, end] of the current sub-section being merged
}

export const getMergeSortSteps = (inputArray: number[]): MergeStep[] => {
  const steps: MergeStep[] = [];
  const array = [...inputArray];

  function merge(start: number, mid: number, end: number) {
    // 1. Create temporary copies of the sub-arrays
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);

    let i = 0; // Pointer for left sub-array
    let j = 0; // Pointer for right sub-array
    let k = start; // Pointer for main array

    // 2. Main Merge Loop
    while (i < left.length && j < right.length) {
      // Comparison Step
      steps.push({
        array: [...array],
        comparing: [start + i, mid + 1 + j],
        swapping: false,
        range: [start, end],
      });

      if (left[i] <= right[j]) {
        array[k] = left[i];
        i++;
      } else {
        array[k] = right[j];
        j++;
      }

      // Write/Swap Step
      steps.push({
        array: [...array],
        comparing: [k, k],
        swapping: true,
        range: [start, end],
      });
      k++;
    }

    // 3. THE "LEFTOVERS" - Handle remaining elements in left
    while (i < left.length) {
      array[k] = left[i];
      steps.push({
        array: [...array],
        comparing: [k, k],
        swapping: true,
        range: [start, end],
      });
      i++;
      k++;
    }

    // 4. THE "LEFTOVERS" - Handle remaining elements in right
    while (j < right.length) {
      array[k] = right[j];
      steps.push({
        array: [...array],
        comparing: [k, k],
        swapping: true,
        range: [start, end],
      });
      j++;
      k++;
    }
  }

  function sort(start: number, end: number) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);

    sort(start, mid);
    sort(mid + 1, end);
    merge(start, mid, end);
  }

  sort(0, array.length - 1);
  return steps;
};
