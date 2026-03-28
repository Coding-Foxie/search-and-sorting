interface GeneratorSettings {
  count: number;
  min: number;
  max: number;
  includeFloat: boolean;
  includeNegative: boolean;
}

export const generateRandomArray = (
  // We use Partial and default to an empty object to prevent the 'undefined' crash
  settings: Partial<GeneratorSettings> = {},
) => {
  
  const {
    count = 7,
    min = 0,
    max = 99,
    includeFloat = false,
    includeNegative = false,
  } = settings;

  return Array.from({ length: count }, () => {
    // Logic for range calculation
    const actualMin = includeNegative ? -Math.abs(max) : min;
    const range = max - actualMin;

    const num = Math.random() * range + actualMin;

    return includeFloat ? Number(num.toFixed(2)) : Math.floor(num);
  });
};
