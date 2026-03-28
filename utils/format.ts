// utils/format.ts
export const formatDSANumber = (val: number | null): string => {
  if (val === null) return "--";
  // If it's a float, show 2 decimals. If it's an integer, show as is.
  return Number.isInteger(val) ? val.toString() : val.toFixed(2);
};
