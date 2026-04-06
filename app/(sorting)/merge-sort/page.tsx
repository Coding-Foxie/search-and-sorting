"use client";

import React, { useEffect, useMemo, useState } from 'react';
import useSound from 'use-sound';
import { getMergeSortSteps, MergeStep } from '@/lib/algorithms/mergeSort';

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

export default function MergeSortVisualizer() {
  const [dataInput, setDataInput] = useState("45, 12, 50, 23, 5, 31, 18");

  // --- Store Selectors ---
  const speed = useVisualizerStore((state) => state.speed);
  const isPaused = useVisualizerStore((state) => state.isPaused);
  const setIsPaused = useVisualizerStore((state) => state.setIsPaused);
  const setIsRunning = useVisualizerStore((state) => state.setIsRunning);
  const onTogglePause = useVisualizerStore((state) => state.onTogglePause);
  const setupKeyboardShortcuts = useVisualizerStore((state) => state.setupKeyboardShortcuts);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [playSwapSound] = useSound('/sounds/swap.wav', { volume: 0.25, playbackRate: 1.5 });
  const [playSuccessSound] = useSound('/sounds/found.wav', { volume: 0.5 });

  useEffect(() => {
    return setupKeyboardShortcuts();
  }, [setupKeyboardShortcuts]);

  const {
    currentStep,
    isSorting,
    isCompleted,
    clearCompleted,
    start,
    reset,
    currentStepIndex,
    totalSteps,
    initialStateSnapshot,
    setInitialStateSnapshot,
  } = useVisualizer<MergeStep>(
    playSwapSound,
    (finalArray) => {
      setDataInput(finalArray.join(", "));
      playSuccessSound();
    },
    isPaused,
    speed
  );

  // --- THE SYNC FIX ---
  // This clears the snapshot when sorting finishes so the UI stays locked to the final sorted array.
  useEffect(() => {
    if (isCompleted) {
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

  // --- DISPLAY LOGIC FIX ---
  const displayArray =
    (isSorting || isCompleted) && currentStep
      ? currentStep.array
      : currentArray; // 👈 Fallback to raw input if not sorting/completed

  const [idxA, idxB] = currentStep?.comparing ?? [-1, -1];
  const isSwapping = currentStep?.swapping ?? false;
  const activeRange = currentStep?.range;

  const handleStart = () => {
    if (currentArray.length === 0) return;

    reset();

    // Use a small timeout to ensure state reset propagates
    setTimeout(() => {
      setIsRunning(true);
      setIsPaused(false);
      setInitialStateSnapshot([...currentArray]);
      const steps = getMergeSortSteps(currentArray);
      start(steps);
    }, 10);
  };

  const [genSettings, setGenSettings] = useState({
    count: 8,
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

  return (
    <div className="min-h-screen w-full bg-slate-950 font-sans text-slate-200 overflow-y-auto scroll-smooth">
      <section className="h-[100dvh] w-full p-2 sm:p-4 flex flex-col items-center justify-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-6xl h-full max-h-[900px] overflow-hidden flex flex-col relative">

          <SortingHeader
            sortingAlgorithm="Merge Sort"
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
              lastSorted={0}
              isSorting={isSorting}
              algorithmType='merge'
              range={activeRange}
            />
          </div>
        </div>
      </section>

      {/* Layer 2: Nerd Lab */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <DeepDiveHeader
          algorithmName="Merge Sort"
          isSorting={isSorting}
          onStart={handleStart}
          onReset={reset}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <ComplexityCard worst="O(n log n)" best="O(n log n)" space="O(n)" />

            <InputSnapshot data={initialStateSnapshot} />

            <MiniVisualizer
              array={displayArray}
              activeIndices={[idxA, idxB]}
              swappingIndices={isSwapping ? [idxA, idxB] : []}
              maxValue={Math.max(...displayArray, 1)}
            />

            <StepController />
          </div>

          <CodeViewer
            filename="mergeSort.ts"
            lines={ALGORITHM_CODE.merge}
            currentState={{ isSorting, isSwapping, idxA, idxB }}
          />
        </div>
      </section>
    </div>
  );
}