import SpeedControl from "./SpeedAdjustot";
import { StepController } from "./StepController";
import SuccessNotification from "./SuccessNotification";

interface VisualizerStageProps {
  displayArray: number[];
  idxA: number;
  idxB: number;
  isSwapping: boolean;
  lastSorted: number;
  isSorting: boolean;
  speed: number;
  currentStepIndex: number;
  algorithmType: 'bubble' | 'selection' | 'insertion';
  totalSteps: number;      // Added this
  isPaused: boolean;       // Added this
  setSpeed: (val: number) => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onTogglePause: () => void;
}


export const VisualizerStage = ({
  displayArray, idxA, idxB, isSwapping, lastSorted, isSorting, speed, currentStepIndex, algorithmType, totalSteps, isPaused, setSpeed, onStepForward, onStepBackward, onTogglePause
}: VisualizerStageProps) => {


  // Logic to determine if a specific index is part of the "Sorted Wall"
  const checkIfSortedPart = (index: number) => {
    if (algorithmType === 'bubble') {
      // Bubble sort: sorted until the end (decrements from length to 0)
      return index >= lastSorted;
    } else {
      // Selection/Insertion: sorted from the start (increments from 0 to length)
      return index < lastSorted;
    }
  };

  // Determine if the entire array is finished
  const isFullyComplete =
    !isSorting &&                // 1. Must not be currently sorting
    currentStepIndex !== -1 &&   // 2. Must have actually completed at least one step
    displayArray.length > 0 &&   // 3. Must have data
    (
      (algorithmType === 'bubble' && lastSorted <= 0) ||
      (algorithmType !== 'bubble' && lastSorted >= displayArray.length)
    );

  return (
    <div className="lg:col-span-3 bg-slate-950/30 rounded-2xl border border-slate-800/50 p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="flex flex-wrap gap-3 justify-center max-w-full">
        {displayArray.map((num, index) => {
          const isActive = index === idxA || index === idxB;
          const isSortedPart = checkIfSortedPart(index);

          return (
            <div
              key={index}
              className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl border-2 text-lg font-bold transition-all duration-300 relative
                ${isActive && !isSwapping ? 'border-purple-500 bg-purple-500/20 scale-110 z-10 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-slate-800 bg-slate-950'}
                ${isSwapping && isActive ? 'border-red-500 bg-red-500/40 scale-125 z-20 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.5)]' : ''}
                ${isSortedPart && !isActive ? 'border-blue-500/40 bg-blue-500/10 text-blue-400/60' : 'text-slate-200'}
                ${isFullyComplete ? 'border-green-500 bg-green-500/20 text-green-400 !opacity-100' : ''}
              `}
            >
              {num}
              {isSwapping && isActive && (
                <div className="absolute -top-8 bg-red-500 text-[8px] px-2 py-0.5 rounded text-white font-black animate-bounce">SWAP</div>
              )}
            </div>
          );
        })}
      </div>

      {isFullyComplete && (
        <SuccessNotification isVisible={isFullyComplete} />
      )}

      <SpeedControl
        speed={speed}
        setSpeed={setSpeed}
        isDisabled={isFullyComplete}
      />

      {isSorting && (
        <StepController
          current={currentStepIndex}
          total={totalSteps}
          isPaused={isPaused}
          onStepForward={onStepForward}
          onStepBackward={onStepBackward}
          onTogglePause={onTogglePause}
        />
      )}


    </div>
  );
};