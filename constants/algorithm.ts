// constants/algorithms.ts
import { CodeLine } from "@/types/sorting";

export const ALGORITHM_CODE: Record<string, CodeLine[]> = {
  bubble: [
    { code: "function bubbleSort(arr) {", indent: 0, isActive: () => false },
    {
      code: "  for (let i = 0; i < n; i++) {",
      indent: 0,
      isActive: (s) => s.isSorting,
    },
    {
      code: "    if (arr[j] > arr[j + 1]) {",
      indent: 0,
      isActive: (s) => s.isSorting && !s.isSwapping,
    },
    {
      code: "      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];",
      indent: 0,
      isActive: (s) => s.isSwapping,
      color: "bg-red-500/10 text-red-400 border-l-2 border-red-500",
    },
    { code: "    }", indent: 0, isActive: () => false },
    { code: "  }", indent: 0, isActive: () => false },
    { code: "}", indent: 0, isActive: () => false },
  ],
  selection: [
    { code: "function selectionSort(arr) {", indent: 0, isActive: () => false },
    {
      code: "  for (let i = 0; i < n - 1; i++) {",
      indent: 0,
      isActive: (s) => s.isSorting,
    },
    {
      code: "    let minIdx = i;",
      indent: 0,
      isActive: (s) => s.isSorting && !s.isSwapping,
    },
    {
      code: "    if (arr[j] < arr[minIdx]) minIdx = j;",
      indent: 0,
      isActive: (s) => s.isSorting && !s.isSwapping,
    },
    {
      code: "    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];",
      indent: 0,
      isActive: (s) => s.isSwapping,
      color: "bg-red-500/10 text-red-400 border-l-2 border-red-500",
    },
    { code: "  }", indent: 0, isActive: () => false },
    { code: "}", indent: 0, isActive: () => false },
  ],
  insertion: [
    { code: "function insertionSort(arr) {", indent: 0, isActive: () => false },
    {
      code: "  for (let i = 1; i < n; i++) {",
      indent: 0,
      isActive: (s) => s.isSorting,
    },
    {
      code: "    let key = arr[i];",
      indent: 1,
      isActive: (s) => s.isSorting && !s.isSwapping,
    },
    {
      code: "    while (j >= 0 && arr[j] > key) {",
      indent: 1,
      isActive: (s) => s.isSorting && s.isSwapping,
    },
    {
      code: "      arr[j + 1] = arr[j];",
      indent: 2,
      isActive: (s) => s.isSwapping,
      color: "bg-red-500/10 text-red-400 border-l-2 border-red-500",
    },
    { code: "    }", indent: 1, isActive: () => false },
    { code: "  }", indent: 0, isActive: () => false },
  ],
  merge: [
    {
      code: "function mergeSort(arr, start, end) {",
      indent: 0,
      isActive: (s) => s.isSorting,
    },
    {
      code: "  if (start >= end) return;",
      indent: 0,
      isActive: (s) => s.isSorting && s.range && s.range[0] === s.range[1],
    },
    {
      code: "  const mid = Math.floor((start + end) / 2);",
      indent: 0,
      isActive: (s) => s.isSorting,
    },
    {
      code: "  mergeSort(arr, start, mid);",
      indent: 1,
      isActive: (s) => s.isSorting && !s.isSwapping,
    },
    {
      code: "  mergeSort(arr, mid + 1, end);",
      indent: 1,
      isActive: (s) => s.isSorting && !s.isSwapping,
    },
    {
      code: "  merge(arr, start, mid, end);",
      indent: 1,
      isActive: (s) => s.isSwapping,
    },
    {
      code: "}",
      indent: 0,
      isActive: (s) => false,
    },
  ],
  linear: [
    {
      code: "function linearSearch(arr, target) {",
      indent: 0,
      isActive: (s) => s.isSorting,
    },
    {
      code: "  for (let i = 0; i < arr.length; i++) {",
      indent: 0,
      isActive: (s) => s.isSorting && s.idxA >= 0 && s.idxA < 7, // Adjust '7' to your array length
    },
    {
      code: "    if (arr[i] === target) {",
      indent: 1,
      isActive: (s) => s.isSorting && s.idxA >= 0 && !s.isSwapping, // Using 'isSwapping' as 'isFound' flag
    },
    {
      code: "      return i; // Found!",
      indent: 2,
      isActive: (s) => s.idxA !== -1 && s.isCompleted, // Highlight when successful
    },
    {
      code: "    }",
      indent: 1,
      isActive: () => false,
    },
    {
      code: "  }",
      indent: 0,
      isActive: () => false,
    },
    {
      code: "  return -1; // Not Found",
      indent: 0,
      isActive: (s) => s.isCompleted && s.idxA === -1,
    },
  ],
  binary: [
    {
      code: "function binarySearch(arr, target) {",
      indent: 0,
      isActive: (s) => s.isSorting,
    },
    {
      code: "  let low = 0, high = arr.length - 1;",
      indent: 0,
      isActive: (s) => s.isSorting && s.currentStepIndex === 0,
    },
    {
      code: "  while (low <= high) {",
      indent: 0,
      isActive: (s) => s.isSorting && !s.isCompleted,
    },
    {
      code: "    const mid = Math.floor((low + high) / 2);",
      indent: 1,
      isActive: (s) => s.idxMid !== -1, // Use a custom 'idxMid' state
    },
    {
      code: "    if (arr[mid] === target) return mid;",
      indent: 2,
      isActive: (s) => s.idxMid !== -1 && s.isCompleted,
    },
    {
      code: "    if (arr[mid] < target) low = mid + 1;",
      indent: 2,
      isActive: (s) => s.isSorting && s.direction === "right", // Track direction
    },
    {
      code: "    else high = mid - 1;",
      indent: 2,
      isActive: (s) => s.isSorting && s.direction === "left",
    },
    {
      code: "  }",
      indent: 0,
      isActive: () => false,
    },
    {
      code: "  return -1;",
      indent: 0,
      isActive: (s) => s.isCompleted && s.foundIndex === -1,
    },
  ],
};
