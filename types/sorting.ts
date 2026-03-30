// types/sorting.ts
export interface CodeLine {
  code: string;
  indent: number;
  // A function that determines if this line should be "active" based on current state
  isActive: (state: {
    isSorting: boolean;
    isSwapping: boolean;
    [key: string]: any;
  }) => boolean;
  color?: string; // Optional: for special highlights (like red for swaps)
}
