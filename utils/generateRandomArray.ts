export const generateRandomArray = (size = 7, min = 5, max = 99) => {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  ).join(", ");
};
