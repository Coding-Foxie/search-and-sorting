"use client";

import React from 'react';
import { useVisualizerStore } from "@/store/use-visualizer-store";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

export const StepController = () => {

  const {
    currentStepIndex,
    totalSteps,
    isPaused,
    onStepForward,
    onStepBackward,
    onTogglePause
  } = useVisualizerStore();

  // Safety check: if totalSteps is 0 or less, don't crash the progress bar logic
  const progressPercent = totalSteps > 1
    ? (currentStepIndex / (totalSteps - 1)) * 100
    : 0;

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {/* Progress Bar (Tiny & Subtle) */}
      <div className="w-full max-w-[200px] h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Backward Button */}
        <button
          onClick={onStepBackward}
          disabled={currentStepIndex <= 0}
          className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={onTogglePause}
          className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all active:scale-95"
        >
          {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
        </button>

        {/* Forward Button */}
        <button
          onClick={onStepForward}
          disabled={currentStepIndex >= totalSteps - 1}
          className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
        Instruction {currentStepIndex + 1} of {totalSteps}
      </span>
    </div>
  );
};