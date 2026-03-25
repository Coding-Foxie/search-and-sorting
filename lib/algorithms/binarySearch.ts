export interface SearchStep {
  low: number;
  high: number;
  mid: number;
  value: number;
}

export const getBinarySearchSteps = (
  array: number[],
  target: number,
): SearchStep[] => {
  const steps: SearchStep[] = [];
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({ low, high, mid, value: array[mid] });

    if (array[mid] === target) break;
    if (array[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return steps;
};
