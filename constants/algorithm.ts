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
};
