"use client";

import React, { useState } from 'react';
import useSound from 'use-sound';
import { getBubbleSortSteps, BubbleStep } from '@/lib/algorithms/bubbleSort';

import { useVisualizer } from '@/hooks/useVisualizer';
import { SortingHeader } from '@/components/sorting/SortingHeader';
import { StatsSidebar } from '@/components/sorting/StatsSidebar';
import { VisualizerStage } from '@/components/sorting/VisualizerStage';
import { generateRandomArray } from '@/utils/generateRandomArray';
// import { useLongPress } from '@/hooks/useLongPress';
import { GeneratorMenu } from '@/components/sorting/GeneratorMenu';
import { ComplexityCard } from '@/components/sorting/ComplexityCard';
import { DeepDiveHeader } from '@/components/sorting/DeepDiveHeader';
import { CodeLine } from '@/types/sorting';
import { CodeViewer } from '@/components/sorting/CodeViewer';
import { MiniVisualizer } from '@/components/sorting/MiniVisualizer';
import { InputSnapshot } from '@/components/sorting/InputSnapshot';
import { StepController } from '@/components/sorting/StepController';

export default function BubbleSortVisualizer() {
  const [dataInput, setDataInput] = useState("45, 12, 50, 23, 5, 31, 18");
  const [speed, setSpeed] = useState(400);

  const [playSwapSound] = useSound('/sounds/swap.wav', { volume: 0.25, playbackRate: 1.5 });
  const [playSuccessSound] = useSound('/sounds/found.wav', { volume: 0.5 });

  const [isPaused, setIsPaused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const bubbleSortCode: CodeLine[] = [
    { code: "function bubbleSort(arr) {", indent: 0, isActive: () => false },
    { code: "for (let i = 0; i < n; i++) {", indent: 1, isActive: (s) => s.isSorting },
    {
      code: "if (arr[j] > arr[j + 1]) {",
      indent: 2,
      isActive: (s) => s.isSorting && !s.isSwapping
    },
    {
      code: "[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];",
      indent: 3,
      isActive: (s) => s.isSwapping,
      color: "bg-red-500/10 text-red-400 border-l-2 border-red-500" // Custom Swap Style
    },
    { code: "}", indent: 2, isActive: () => false },
    { code: "}", indent: 1, isActive: () => false },
    { code: "}", indent: 0, isActive: () => false },
  ];

  const {
    currentStep,
    isSorting,
    start,
    reset,
    currentStepIndex,
    totalSteps,
    initialStateSnapshot,
    setInitialStateSnapshot,
    stepForward,
    stepBackward
  } = useVisualizer<BubbleStep>(
    // 1. First Argument: The Swap Sound
    playSwapSound,

    // 2. Second Argument: The Completion Callback
    (finalArray) => {
      // Play the success sound here manually
      playSuccessSound();

      // Sync the input box with the finished sort result
      const sortedString = finalArray.join(", ");
      setDataInput(sortedString);
    },

    // 3. Third & Fourth: State & Speed
    isPaused,
    speed
  );

  const currentArray = dataInput
    .split(',')
    .map(num => parseFloat(num.trim()))
    .filter(num => !isNaN(num));

  const displayArray = isSorting && currentStep
    ? currentStep.array
    : (initialStateSnapshot.length > 0 ? initialStateSnapshot : currentArray);

  const [idxA, idxB] = currentStep?.comparing ?? [-1, -1];
  const isSwapping = currentStep?.swapping ?? false;
  const lastSorted = currentStep?.sortedUntil ?? currentArray.length;

  const handleStart = () => {
    const numbersToSort = dataInput
      .split(',')
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    if (numbersToSort.length === 0) return;

    if (numbersToSort.length > 20) {
      alert("Whoa! Limit input to 20 numbers.");
      return;
    }

    reset();
    setIsPaused(false); // 🌟 PRO TIP: Always unpause when starting fresh!
    setInitialStateSnapshot([...numbersToSort]);

    const steps = getBubbleSortSteps(numbersToSort);
    start(steps);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const [genSettings, setGenSettings] = useState({
    count: 6,
    min: 0,
    max: 100,
    includeFloat: false,
    includeNegative: false
  });

  const handleGenerate = () => {
    reset(); // Kill any active sorting immediately
    const newArray = generateRandomArray(genSettings);
    setDataInput(newArray.join(", "));
    setIsPaused(false);
    setIsMenuOpen(false);
  };

  return (
    // Changed overflow-hidden to overflow-y-auto to allow scrolling to the Nerd Layer
    <div className="min-h-screen w-full bg-slate-950 font-sans text-slate-200 overflow-y-auto scroll-smooth">

      {/* --- FLOOR 1: THE SHOW (Visualizer) --- */}
      <section className="h-[100dvh] w-full p-2 sm:p-4 flex flex-col items-center justify-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-6xl h-full max-h-[900px] overflow-hidden flex flex-col relative">

          <SortingHeader
            sortingAlgorithm="Bubble Sort"
            dataInput={dataInput}
            setDataInput={setDataInput}
            isSorting={isSorting}
            onStart={handleStart}
            onReset={reset}
            isPaused={isPaused}
            onPause={handlePause}
            currentArrayLength={currentArray.length}
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

          <div className="flex-1 min-h-0 p-4 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
            <StatsSidebar
              isSorting={isSorting}
              isSwapping={isSwapping}
              idxA={idxA}
              idxB={idxB}
              valA={idxA !== -1 ? displayArray[idxA] : null}
              valB={idxB !== -1 ? displayArray[idxB] : null}
              currentStepIndex={currentStepIndex}
              totalSteps={totalSteps}
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
              totalSteps={totalSteps}
              isPaused={isPaused}
              speed={speed}
              setSpeed={setSpeed}
              onStepForward={stepForward}
              onStepBackward={stepBackward}
              onTogglePause={handlePause}
            />
          </div>
        </div>
      </section>

      {/* --- FLOOR 2: THE NERD LAB (Algorithm Logic) --- */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <DeepDiveHeader
          algorithmName="Bubble Sort"
          isSorting={isSorting}
          onStart={handleStart}
          onReset={reset}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Logic & Complexity Card */}
          <div className="lg:col-span-1 space-y-6">
            <ComplexityCard worst="O(n²)" best="O(n)" space="O(1)" />

            <InputSnapshot data={initialStateSnapshot} />

            <MiniVisualizer
              array={displayArray}
              activeIndices={[idxA, idxB]}
              swappingIndices={isSwapping ? [idxA, idxB] : []}
              maxValue={Math.max(...displayArray)}
            />

            <StepController
              current={currentStepIndex}
              total={totalSteps}
              isPaused={isPaused}
              onStepForward={stepForward}
              onStepBackward={stepBackward}
              onTogglePause={handlePause}
            />
          </div>

          {/* Pseudo-code Layer */}
          <CodeViewer filename="bubbleSort.js" lines={bubbleSortCode} currentState={{ isSorting, isSwapping, idxA, idxB }} />
        </div>
      </section>
    </div>
  );
}

