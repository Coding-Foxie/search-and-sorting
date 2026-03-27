"use client";

import React, { useState } from 'react';
import useSound from 'use-sound';
import { useBubbleSort } from '@/hooks/useBubbleSort';
import { SortingHeader } from '@/components/sorting/SortingHeader';
import { StatsSidebar } from '@/components/sorting/StatsSidebar';
import { VisualizerStage } from '@/components/sorting/VisualizerStage';
import { generateRandomArray } from '@/utils/generateRandomArray';

export default function BubbleSortVisualizer() {
  const [dataInput, setDataInput] = useState("45, 12, 50, 23, 5, 31, 18");
  const [speed, setSpeed] = useState(400);
  const [playSwapSound] = useSound('/sounds/swap.wav', { volume: 0.25, playbackRate: 1.5 });
  const [playSuccessSound] = useSound('/sounds/found.wav', { volume: 0.5 });

  const currentArray = dataInput
    .split(',')
    .map(num => parseInt(num.trim()))
    .filter(num => !isNaN(num));

  const { currentStep, isSorting, start, reset } = useBubbleSort(
    currentArray,
    playSwapSound,
    playSuccessSound,
    speed
  );

  const handleRandomize = () => {
    const newArray = generateRandomArray(7); // Generates 7 random numbers
    setDataInput(newArray);
    reset(); // Reset the visualizer state when new data comes in
  };

  const displayArray = currentStep ? currentStep.array : currentArray;
  const [idxA, idxB] = currentStep?.comparing ?? [-1, -1];
  const isSwapping = currentStep?.swapping ?? false;
  const lastSorted = currentStep?.sortedUntil ?? currentArray.length;

  return (
    <div className="h-[100dvh] w-full bg-slate-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden font-sans text-slate-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-6xl h-full max-h-[900px] overflow-hidden flex flex-col">

        <SortingHeader
          sortingAlgorithm="Bubble Sort"
          dataInput={dataInput}
          setDataInput={setDataInput}
          isSorting={isSorting}
          onStart={start}
          onReset={reset}
          currentArrayLength={currentArray.length}
          speed={speed}
          setSpeed={setSpeed}
          onRandomize={handleRandomize}
        />

        <div className="flex-1 min-h-0 p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
          <StatsSidebar isSorting={isSorting} isSwapping={isSwapping} idxA={idxA} idxB={idxB} />
          <VisualizerStage
            displayArray={displayArray}
            idxA={idxA}
            idxB={idxB}
            isSwapping={isSwapping}
            lastSorted={lastSorted}
            isSorting={isSorting}
          />
        </div>
      </div>
    </div>
  );
}