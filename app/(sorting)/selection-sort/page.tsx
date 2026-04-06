"use client";

import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { useVisualizer } from '@/hooks/useVisualizer';
import { getSelectionSortSteps, SelectionStep } from '@/lib/algorithms/selectionSort';

// UI Components
import { SortingHeader } from '@/components/sorting/SortingHeader';
import { StatsSidebar } from '@/components/sorting/StatsSidebar';
import { VisualizerStage } from '@/components/sorting/VisualizerStage';
import { GeneratorMenu, GeneratorSettings } from '@/components/sorting/GeneratorMenu';
import { DeepDiveHeader } from '@/components/sorting/DeepDiveHeader';
import { ComplexityCard } from '@/components/sorting/ComplexityCard';
import { CodeViewer } from '@/components/sorting/CodeViewer';
import { StepController } from '@/components/sorting/StepController';
import { MiniVisualizer } from '@/components/sorting/MiniVisualizer';
import { InputSnapshot } from '@/components/sorting/InputSnapshot';

// Utils & State
import { generateRandomArray } from '@/utils/generateRandomArray';
import { useVisualizerStore } from '@/store/use-visualizer-store';
import { ALGORITHM_CODE } from '@/constants/algorithm';

export default function SelectionSortVisualizer() {
  const [dataInput, setDataInput] = useState("45, 12, 50, 23, 5, 31, 18");

  // Audio
  const [playSwapSound] = useSound('/sounds/swap.wav', { volume: 0.25, playbackRate: 1.5 });
  const [playSuccessSound] = useSound('/sounds/found.wav', { volume: 0.5 });

  // Store Selectors
  const speed = useVisualizerStore((state) => state.speed);
  const setIsRunning = useVisualizerStore((state) => state.setIsRunning);
  const isPaused = useVisualizerStore((state) => state.isPaused);
  const setIsPaused = useVisualizerStore((state) => state.setIsPaused);
  const onTogglePause = useVisualizerStore((state) => state.onTogglePause);
  const setupKeyboardShortcuts = useVisualizerStore((state) => state.setupKeyboardShortcuts);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState<GeneratorSettings>({
    count: 10,
    min: 1,
    max: 100,
    includeFloat: false,
    includeNegative: false,
  });

  // Keyboard Setup
  useEffect(() => {
    return setupKeyboardShortcuts();
  }, [setupKeyboardShortcuts]);

  // Hook Engine
  const {
    currentStep,
    isSorting,
    start,
    reset,
    currentStepIndex,
    totalSteps,
    initialStateSnapshot,
    setInitialStateSnapshot,
  } = useVisualizer<SelectionStep>(
    playSwapSound,
    (finalArray) => {
      playSuccessSound();
      const sortedString = finalArray.join(", ");
      setDataInput(sortedString);
    },
    isPaused,
    speed
  );

  // Computed Values
  const currentArray = dataInput
    .split(',')
    .map(num => parseFloat(num.trim()))
    .filter(num => !isNaN(num));

  const displayArray = isSorting && currentStep
    ? currentStep.array
    : (initialStateSnapshot.length > 0 ? initialStateSnapshot : currentArray);

  const [idxA, idxB] = currentStep?.comparing ?? [-1, -1];
  const isSwapping = currentStep?.swapping ?? false;
  const lastSorted = currentStep?.sortedUntil ?? -1; // -1 means none sorted yet

  // Handlers
  const handleStart = () => {
    const numbersToSort = dataInput
      .split(',')
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    if (numbersToSort.length === 0) return;

    reset();

    setTimeout(() => {
      setIsRunning(true);
      setIsPaused(false);
      setInitialStateSnapshot([...numbersToSort]);
      const steps = getSelectionSortSteps(numbersToSort);
      start(steps);
    }, 10);
  };

  const handleGenerate = () => {
    reset();
    const newNumbers = generateRandomArray(settings);
    setDataInput(newNumbers.join(", "));
    setIsMenuOpen(false);
    setIsPaused(false);
  };

  if (!displayArray || displayArray.length === 0) {
    return <div className="h-screen bg-slate-950 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 font-sans text-slate-200 overflow-y-auto scroll-smooth">

      {/* --- FLOOR 1: THE SHOW --- */}
      <section className="h-[100dvh] w-full p-2 sm:p-4 flex flex-col items-center justify-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-6xl h-full max-h-[900px] overflow-hidden flex flex-col relative">

          <SortingHeader
            sortingAlgorithm="Selection Sort"
            dataInput={dataInput}
            setDataInput={setDataInput}
            isSorting={isSorting}
            onStart={handleStart}
            onReset={reset}
            isPaused={isPaused}
            onPause={onTogglePause}
            currentArrayLength={currentArray.length}
            onGenerate={handleGenerate}
            setOpenGenerator={() => setIsMenuOpen(true)}
          />

          {isMenuOpen && (
            <div className="absolute inset-0 z-[200] flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4">
              <div className="absolute inset-0 cursor-pointer" onClick={() => setIsMenuOpen(false)} />
              <div className="relative z-[210] animate-in zoom-in-95 duration-200">
                <GeneratorMenu
                  settings={settings}
                  setSettings={setSettings}
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
              algorithmType='selection'
            />
          </div>
        </div>
      </section>

      {/* --- FLOOR 2: THE NERD LAB --- */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <DeepDiveHeader
          algorithmName="Selection Sort"
          isSorting={isSorting}
          onStart={handleStart}
          onReset={reset}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <ComplexityCard worst="O(n²)" best="O(n²)" space="O(1)" />
            <InputSnapshot data={initialStateSnapshot} />
            <MiniVisualizer
              array={displayArray}
              activeIndices={[idxA, idxB]}
              swappingIndices={isSwapping ? [idxA, idxB] : []}
              maxValue={Math.max(...displayArray)}
            />
            <StepController />
          </div>

          <CodeViewer
            filename="selectionSort.ts"
            lines={ALGORITHM_CODE.selection}
            currentState={{ isSorting, isSwapping, idxA, idxB }}
          />
        </div>
      </section>
    </div>
  );
}