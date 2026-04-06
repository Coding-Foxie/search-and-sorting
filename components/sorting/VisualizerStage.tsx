"use client";

import React from 'react';
import SpeedControl from "./SpeedController";
import { StepController } from "./StepController";
import SuccessNotification from "./SuccessNotification";
import { useVisualizerStore } from '@/store/use-visualizer-store';
import { cn } from '@/lib/utils';

interface VisualizerStageProps {
  displayArray: number[];
  idxA: number;
  idxB: number;
  isSwapping: boolean;
  lastSorted: number;
  isSorting: boolean;
  algorithmType: 'bubble' | 'selection' | 'insertion' | 'merge'; // ✅ Added merge
  range?: [number, number]; // ✅ Added optional range for Merge Sort
}

export const VisualizerStage = ({
  displayArray,
  idxA,
  idxB,
  isSwapping,
  lastSorted,
  isSorting,
  algorithmType,
  range // Destructure range
}: VisualizerStageProps) => {

  const currentStepIndex = useVisualizerStore((state) => state.currentStepIndex);

  const checkIfSortedPart = (index: number) => {
    if (algorithmType === 'bubble') return index >= lastSorted;
    if (algorithmType === 'merge') return false; // Merge sort handles highlights via range
    return index < lastSorted;
  };

  const isFullyComplete =
    !isSorting &&
    currentStepIndex !== -1 &&
    displayArray.length > 0 &&
    ((algorithmType === 'bubble' && lastSorted <= 0) ||
      (algorithmType !== 'bubble' && algorithmType !== 'merge' && lastSorted >= displayArray.length) ||
      (algorithmType === 'merge' && currentStepIndex === -1)); // You can refine this completion logic

  return (
    <div className="lg:col-span-3 bg-slate-950/30 rounded-2xl border border-slate-800/50 p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">

      {/* Array Container */}
      <div className="flex flex-wrap gap-3 justify-center max-w-full">
        {displayArray.map((num, index) => {
          const isActive = index === idxA || index === idxB;
          const isSortedPart = checkIfSortedPart(index);

          // ✅ Logic moved inside map so 'index' is defined
          const isInRange = range
            ? index >= range[0] && index <= range[1]
            : true;

          return (
            <div
              key={index}
              className={cn(
                // 1. BASE STYLES (Keep these consistent)
                "w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl border-2 text-lg font-mono transition-all duration-300 relative",

                // 2. IDLE STATE (When not doing anything)
                !isActive && !isSortedPart && !isFullyComplete && "border-slate-800 bg-slate-900/50 text-slate-400",

                // 3. ACTIVE / COMPARISON STATE
                isActive && !isSwapping && "border-purple-500 bg-purple-500/20 scale-110 z-10 shadow-[0_0_20px_rgba(168,85,247,0.2)] text-purple-300",

                // 4. SWAPPING STATE
                isSwapping && isActive && "border-red-500 bg-red-500/30 scale-125 z-20 shadow-[0_0_25px_rgba(239,68,68,0.4)] text-red-200",

                // 5. THE FIX: SUCCESS STATE
                // We need high contrast green borders and a subtle glow
                isFullyComplete && "border-emerald-500 bg-emerald-500/10 text-emerald-400 opacity-100 shadow-[0_0_15px_rgba(16,185,129,0.15)]",

                // 6. MERGE SORT RANGE DIMMING
                !isInRange && algorithmType === 'merge' && "opacity-20 scale-90 blur-[0.5px]"
              )}
            >
              {num}

              {/* Swap/Write Label */}
              {isSwapping && isActive && (
                <div className="absolute -top-8 bg-red-500 text-[8px] px-2 py-0.5 rounded text-white font-black animate-bounce shadow-lg shadow-red-900/40">
                  {algorithmType === 'merge' ? 'WRITE' : 'SWAP'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Conditional UI Layers */}
      {isFullyComplete && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[300] w-500">
          <SuccessNotification isVisible={isFullyComplete} />
        </div>
      )}

      {/* Controls */}
      <div className="mt-12 w-full flex flex-col items-center gap-4">
        <SpeedControl isDisabled={isFullyComplete} />
        {isSorting && <StepController />}
      </div>
    </div>
  );
};