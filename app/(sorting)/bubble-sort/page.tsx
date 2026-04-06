"use client";

import React, { useEffect, useMemo, useState } from 'react';
import useSound from 'use-sound';
import { getBubbleSortSteps, BubbleStep } from '@/lib/algorithms/bubbleSort';

import { useVisualizer } from '@/hooks/useVisualizer';
import { SortingHeader } from '@/components/sorting/SortingHeader';
import { StatsSidebar } from '@/components/sorting/StatsSidebar';
import { VisualizerStage } from '@/components/sorting/VisualizerStage';
import { generateRandomArray } from '@/utils/generateRandomArray';
import { GeneratorMenu } from '@/components/sorting/GeneratorMenu';
import { ComplexityCard } from '@/components/sorting/ComplexityCard';
import { DeepDiveHeader } from '@/components/sorting/DeepDiveHeader';
import { CodeViewer } from '@/components/sorting/CodeViewer';
import { MiniVisualizer } from '@/components/sorting/MiniVisualizer';
import { InputSnapshot } from '@/components/sorting/InputSnapshot';
import { StepController } from '@/components/sorting/StepController';
import { useVisualizerStore } from '@/store/use-visualizer-store';
import { ALGORITHM_CODE } from '@/constants/algorithm';

export default function BubbleSortVisualizer() {
  const [dataInput, setDataInput] = useState("45, 12, 50, 23, 5, 31, 18");

  const speed = useVisualizerStore((state) => state.speed);

  const setIsPaused = useVisualizerStore((state) => state.setIsPaused);

  const setIsRunning = useVisualizerStore((state) => state.setIsRunning);

  const [playSwapSound] = useSound('/sounds/swap.wav', { volume: 0.25, playbackRate: 1.5 });
  const [playSuccessSound] = useSound('/sounds/found.wav', { volume: 0.5 });

  const isPaused = useVisualizerStore((state) => state.isPaused);
  const onTogglePause = useVisualizerStore((state) => state.onTogglePause);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const setupKeyboardShortcuts = useVisualizerStore((state) => state.setupKeyboardShortcuts);

  useEffect(() => {
    return setupKeyboardShortcuts();
  }, [setupKeyboardShortcuts]);

  const {
    currentStep,
    isSorting,
    isCompleted,
    clearCompleted, // Ensure this is returned from your hook
    start,
    reset,
    currentStepIndex,
    totalSteps,
    initialStateSnapshot,
    setInitialStateSnapshot,
  } = useVisualizer<BubbleStep>(
    playSwapSound,
    (finalArray) => {
      // 1. Update the "Source of Truth" string
      setDataInput(finalArray.join(", "));
      playSuccessSound();
    },
    isPaused,
    speed
  );

  // --- THE FIX FOR #2 & THE ACCESS ERROR ---
  // This runs AFTER the hook is fully declared
  useEffect(() => {
    if (isCompleted) {
      // This clears the "Old" data so the boxes stay sorted 
      // and match the new dataInput exactly.
      setInitialStateSnapshot([]);
    }
  }, [isCompleted, setInitialStateSnapshot]);

  const currentArray = useMemo(() => {
    return dataInput
      .split(',')
      .map(num => {
        const parsed = parseFloat(num.trim());
        return isNaN(parsed) ? 0 : parsed;
      })
      .filter(n => n !== 0);
  }, [dataInput]);

  // 2. Determine exactly what the boxes show
  const displayArray =
    (isSorting || isCompleted) && currentStep
      ? currentStep.array
      : currentArray;

  const [idxA, idxB] = currentStep?.comparing ?? [-1, -1];
  const isSwapping = currentStep?.swapping ?? false;
  const lastSorted = currentStep?.sortedUntil ?? currentArray.length;

  const handleStart = () => {
    const numbersToSort = dataInput
      .split(',')
      .map(n => {
        const p = parseFloat(n.trim());
        return isNaN(p) ? 0 : p;
      })
      .filter(n => n !== 0);

    if (numbersToSort.length === 0) return;

    // 1. Reset everything first
    reset();

    // 2. Set the snapshot IMMEDIATELY
    setInitialStateSnapshot([...numbersToSort]);

    // 3. Start the process
    const steps = getBubbleSortSteps(numbersToSort);
    start(steps);
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    onTogglePause();
  };

  const [genSettings, setGenSettings] = useState({
    count: 6,
    min: 0,
    max: 100,
    includeFloat: false,
    includeNegative: false
  });

  const handleGenerate = () => {
    reset();
    const newArray = generateRandomArray(genSettings);
    setDataInput(newArray.join(", "));
    setIsMenuOpen(false);
  };

  if (!displayArray || displayArray.length === 0) {
    console.log("Debug: currentArray is empty", currentArray);
  }

  return (
    // Changed overflow-hidden to overflow-y-auto to allow scrolling to the Nerd Layer
    <div className="min-h-screen w-full bg-slate-950 font-sans text-slate-200 overflow-y-auto scroll-smooth">

      {/* --- FLOOR 1: THE SHOW (Visualizer) --- */}
      <section className="h-[100dvh] w-full p-2 sm:p-4 flex flex-col items-center justify-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-6xl h-full max-h-[900px] overflow-hidden flex flex-col relative">

          <SortingHeader
            sortingAlgorithm="Bubble Sort"
            dataInput={dataInput}
            setDataInput={(val) => {
              setDataInput(val);
              clearCompleted();
              setInitialStateSnapshot([]);
            }}
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

          <div className="flex-1 min-h-0 p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 min-h-0 overflow-y-auto">
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
            </div>
            <div className="lg:col-span-3 min-h-0 relative">
              <VisualizerStage
                displayArray={displayArray}
                idxA={idxA}
                idxB={idxB}
                isSwapping={isSwapping}
                lastSorted={lastSorted}
                isSorting={isSorting}
                algorithmType='bubble'
              />
            </div>
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

            <StepController />
          </div>

          {/* Pseudo-code Layer */}
          <CodeViewer filename="bubbleSort.js" lines={ALGORITHM_CODE.bubble} currentState={{ isSorting, isSwapping, idxA, idxB }} />
        </div>
      </section>
    </div>
  );
}

