import { VisualizerState } from "@/store/use-visualizer-store";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const waitForPause = async (
  getState: () => VisualizerState,
): Promise<void> => {
  // Now, TypeScript knows exactly what 'isPaused' is!
  while (getState().isPaused) {
    await sleep(100);
  }
};
