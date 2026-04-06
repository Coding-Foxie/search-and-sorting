import { create } from "zustand";

export interface VisualizerState {
  // --- Data ---
  mode: "auto" | "manual";
  speed: number;
  isRunning: boolean;
  isPaused: boolean;
  currentStepIndex: number;
  totalSteps: number;

  // --- Actions ---
  setMode: (mode: "auto" | "manual") => void;
  setSpeed: (speed: number) => void;
  setIsRunning: (running: boolean) => void;
  setIsPaused: (isPaused: boolean) => void; // Added type here
  togglePause: () => void; // Interface says 0 arguments

  // Progress Actions
  setCurrentStep: (index: number) => void;
  setTotalSteps: (total: number) => void;

  // Note: This returns a cleanup function (void => void)
  setupKeyboardShortcuts: () => () => void;

  // Playback Logic
  onTogglePause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
}

export const useVisualizerStore = create<VisualizerState>((set, get) => ({
  // Initial States
  mode: "auto",
  speed: 400,
  isRunning: false,
  isPaused: false,
  currentStepIndex: -1,
  totalSteps: 0,

  // Simple Setters
  setMode: (mode) => set({ mode }),
  setSpeed: (speed) => set({ speed }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setIsPaused: (isPaused) => set({ isPaused }),

  // FIXED: Removed 'isPaused' parameter because toggle doesn't need it
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),

  setCurrentStep: (currentStepIndex) => set({ currentStepIndex }),
  setTotalSteps: (totalSteps) => set({ totalSteps }),

  // Logic Functions
  onTogglePause: () => set((state) => ({ isPaused: !state.isPaused })),

  onStepForward: () => {
    set((state) => ({
      currentStepIndex: Math.min(state.currentStepIndex + 1, state.totalSteps),
    }));
  },

  onStepBackward: () => {
    set((state) => ({
      currentStepIndex: Math.max(state.currentStepIndex - 1, 0),
    }));
  },

  setupKeyboardShortcuts: () => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Use get() which is provided by the create function
      const { isRunning, onTogglePause, onStepForward, onStepBackward } = get();

      if (!isRunning) return;

      if (e.code === "Space") {
        e.preventDefault();
        onTogglePause();
      } else if (e.code === "ArrowRight") {
        onStepForward();
      } else if (e.code === "ArrowLeft") {
        onStepBackward();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  },
}));
