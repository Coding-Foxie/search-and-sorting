"use client";

import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { getBubbleSortSteps, BubbleStep } from '@/lib/algorithms/bubbleSort';

import { useVisualizer } from '@/hooks/useVisualizer';
import { SortingHeader } from '@/components/sorting/SortingHeader';
import { StatsSidebar } from '@/components/sorting/StatsSidebar';
import { VisualizerStage } from '@/components/sorting/VisualizerStage';
import { generateRandomArray } from '@/utils/generateRandomArray';
import { ChevronDown, Code2, Terminal } from 'lucide-react';
// import { useLongPress } from '@/hooks/useLongPress';
import { GeneratorMenu } from '@/components/sorting/GeneratorMenu';

export default function BubbleSortVisualizer() {
  const [dataInput, setDataInput] = useState("45, 12, 50, 23, 5, 31, 18");
  const [speed, setSpeed] = useState(400);

  const [playSwapSound] = useSound('/sounds/swap.wav', { volume: 0.25, playbackRate: 1.5 });
  const [playSuccessSound] = useSound('/sounds/found.wav', { volume: 0.5 });

  const [isNerdMode, setIsNerdMode] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    currentStep,
    isSorting,
    start,
    reset,
    currentStepIndex,
    totalSteps
  } = useVisualizer<BubbleStep>(
    playSwapSound,
    playSuccessSound,
    isPaused,
    speed
  );

  const currentArray = dataInput
    .split(',')
    .map(num => parseFloat(num.trim()))
    .filter(num => !isNaN(num));

  const displayArray = isSorting && currentStep
    ? currentStep.array
    : currentArray;
  const [idxA, idxB] = currentStep?.comparing ?? [-1, -1];
  const isSwapping = currentStep?.swapping ?? false;
  const lastSorted = currentStep?.sortedUntil ?? currentArray.length;

  const handleStart = () => {
    // Always reset before starting a new run to clear "Sorted" highlights
    reset();

    // Use the CURRENT text in the input box to build the steps
    const numbersToSort = dataInput
      .split(',')
      .map(num => parseFloat(num.trim()))
      .filter(num => !isNaN(num));

    const steps = getBubbleSortSteps(numbersToSort);
    start(steps);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const [genSettings, setGenSettings] = useState({
    count: 8,
    min: 10,
    max: 100,
    includeFloat: true,
    includeNegative: false
  });

  const handleGenerate = () => {
    reset(); // Kill any active sorting immediately
    const newArray = generateRandomArray(genSettings);
    setDataInput(newArray.join(", "));
    setIsPaused(false);
    setIsMenuOpen(false);
  };

  const isFullyComplete =
    !isSorting &&
    currentStepIndex !== -1 &&
    displayArray.length > 0 &&
    (
      (algorithmType === 'bubble' && lastSorted <= 0) ||
      (algorithmType !== 'bubble' && lastSorted >= displayArray.length)
    );

  // 2. The "Sync-Back" Effect lives here!
  useEffect(() => {
    if (isFullyComplete) {
      const sortedString = displayArray.join(", ");
      // We update the dataInput state here because it's defined in this file
      if (dataInput !== sortedString) {
        setDataInput(sortedString);
      }
    }
  }, [isFullyComplete, displayArray, dataInput]);

  return (
    // Changed overflow-hidden to overflow-y-auto to allow scrolling to the Nerd Layer
    <div className="min-h-screen w-full bg-slate-950 font-sans text-slate-200 overflow-y-auto scroll-smooth">

      {/* --- FLOOR 1: THE SHOW (Visualizer) --- */}
      <section className="h-[100dvh] w-full p-2 sm:p-4 flex flex-col items-center justify-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-6xl h-full max-h-[900px] overflow-hidden flex flex-col relative">

          <SortingHeader
            sortingAlgorithm="Bubble Sort"
            // isNerdMode={isNerdMode}
            // onToggleNerd={() => setIsNerdMode(!isNerdMode)}
            dataInput={dataInput}
            setDataInput={setDataInput}
            isSorting={isSorting}
            onStart={handleStart}
            onReset={reset}
            isPaused={isPaused}
            onPause={handlePause}
            currentArrayLength={currentArray.length}
            speed={speed}
            setSpeed={setSpeed}
            onGenerate={handleGenerate}
            setOpenGenerator={() => setIsMenuOpen(true)}
          />

          {/* --- THE GENERATOR MENU OVERLAY --- */}
          {isMenuOpen && (
            <div className="absolute inset-0 z-[200] flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4">
              {/* Clickable Backdrop to close */}
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* The actual menu component */}
              <div className="relative z-[210] animate-in zoom-in-95 duration-200">
                <GeneratorMenu
                  settings={genSettings}
                  setSettings={setGenSettings}
                  onGenerate={handleGenerate}
                />
              </div>
            </div>
          )}

          <div className="flex-1 min-h-0 p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
            <StatsSidebar
              isSorting={isSorting}
              isSwapping={isSwapping}
              idxA={idxA}
              idxB={idxB}
              valA={idxA !== -1 ? displayArray[idxA] : null}
              valB={idxB !== -1 ? displayArray[idxB] : null}
            />
            <VisualizerStage
              displayArray={displayArray}
              idxA={idxA}
              idxB={idxB}
              isSwapping={isSwapping}
              lastSorted={lastSorted}
              isSorting={isSorting}
              currentStepIndex={currentStepIndex}
              algorithmType='bubble'
            />
          </div>

          {/* Nerd Mode Navigation Hint */}
          {isNerdMode && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-blue-500/50 pointer-events-none">
              <span className="text-[9px] uppercase tracking-[0.2em] mb-1">Nerd Lab Access</span>
              <ChevronDown size={14} />
            </div>
          )}
        </div>
      </section>

      {/* --- FLOOR 2: THE NERD LAB (Algorithm Logic) --- */}
      {isNerdMode && (
        <section className="w-full max-w-6xl mx-auto px-4 py-12 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Terminal size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Algorithm Deep-Dive</h2>
              <p className="text-xs text-slate-500 font-mono">Exploring: Bubble Sort</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Logic & Complexity Card */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                  <Code2 size={16} className="text-blue-400" />
                  Complexity Analysis
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Time Complexity (Worst)</span>
                    <span className="text-red-400 font-mono">O(n²)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Time Complexity (Best)</span>
                    <span className="text-green-400 font-mono">O(n)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Space Complexity</span>
                    <span className="text-blue-400 font-mono">O(1)</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-tighter">Current Progress</h3>
                <div className="text-3xl font-mono font-bold text-blue-500">
                  {Math.round(((currentStepIndex + 1) / totalSteps) * 100) || 0}%
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Step {currentStepIndex + 1} of {totalSteps} total operations
                </p>
              </div>
            </div>

            {/* Pseudo-code Layer */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-1 overflow-hidden shadow-2xl">
              <div className="bg-slate-950/50 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase">bubbleSort.ts</span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/20" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                  <div className="w-2 h-2 rounded-full bg-green-500/20" />
                </div>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-slate-400">
                {/* We can map an array of code lines here later for highlighting */}
                <p className="opacity-50">{"function bubbleSort(arr) {"}</p>
                <p className="pl-4 opacity-50">{"  for (let i = 0; i < n; i++) {"}</p>
                <p className={`pl-8 transition-colors ${isSwapping ? 'text-blue-400 bg-blue-500/5' : ''}`}>
                  {"    if (arr[j] > arr[j + 1]) {"}
                </p>
                <p className={`pl-12 transition-colors ${isSwapping ? 'text-red-400 bg-red-500/5 font-bold' : ''}`}>
                  {"      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];"}
                </p>
                <p className="pl-8 opacity-50">{"    }"}</p>
                <p className="pl-4 opacity-50">{"  }"}</p>
                <p className="opacity-50">{"}"}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
