"use client";

import React, { useState } from 'react';
import useSound from 'use-sound';
import { useBinarySearch } from '@/hooks/useBinarySearch';

export default function BinarySearchVisualizer() {
  const [dataInput, setDataInput] = useState("5, 12, 18, 23, 31, 45, 50");
  const [goalInput, setGoalInput] = useState("31");

  const [playTick] = useSound('/sounds/move.wav', { volume: 0.4 });
  const [playSuccess] = useSound('/sounds/found.wav', { volume: 0.6 });
  const [playError] = useSound('/sounds/error.wav', { volume: 0.5 });

  // 1. Prep the data (Sorted for Binary Search)
  const currentArray = dataInput
    .split(',')
    .map(n => parseInt(n.trim()))
    .filter(n => !isNaN(n))
    .sort((a, b) => a - b);

  const currentTarget = parseInt(goalInput);

  // 2. Connect to the custom hook
  const { currentStep, isSearching, start, reset, foundIndex } = useBinarySearch(
    currentArray,
    currentTarget,
    playTick,
    playSuccess,
    playError
  );

  // 3. Destructure pointers for cleaner JSX logic
  const low = currentStep?.low ?? -1;
  const high = currentStep?.high ?? -1;
  const mid = currentStep?.mid ?? -1;

  const startSearch = () => {
    if (isSearching) return;
    start();
  };

  const resetDemo = () => {
    reset();
  };

  return (
    <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="p-8 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Binary Search Visualizer
        </h1>

        {/* INPUT SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-slate-950/50 p-6 rounded-xl border border-slate-800/50">
          <div>
            <label className="block text-xs font-mono text-purple-400 mb-2 uppercase tracking-widest">
              Input Data (Comma Separated)
            </label>
            <input
              type="text"
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              disabled={isSearching}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-purple-500 outline-none transition-all disabled:opacity-50"
              placeholder="e.g. 5, 10, 15..."
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-purple-400 mb-2 uppercase tracking-widest">
              Goal / Target
            </label>
            <input
              type="text"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              disabled={isSearching}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:border-purple-500 outline-none transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* VISUALIZER ARRAY */}
        <div className="flex flex-wrap gap-3 justify-center mb-10 min-h-[80px] items-center">
          {currentArray.map((num, index) => {
            // Logic for active search area
            const isInactive = (index < low || index > high) && isSearching;
            const isMid = index === mid;
            const isFound = index === foundIndex;

            return (
              <div
                key={`${num}-${index}`}
                className={`w-14 h-14 flex items-center justify-center rounded-xl border-2 transition-all duration-500 text-lg font-bold relative
                  ${isMid && !isFound ? 'border-purple-400 scale-110 bg-slate-800 shadow-[0_0_20px_rgba(192,132,252,0.3)]' : 'border-slate-800 bg-slate-950'}
                  ${isFound ? 'border-green-500 bg-green-500/20 scale-110 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : ''}
                  ${isInactive ? 'opacity-20 grayscale scale-90' : 'opacity-100'}
                `}
              >
                {num}
                {/* Visual Pointers */}
                {index === low && isSearching && !isFound && (
                  <span className="absolute -bottom-6 text-[9px] text-blue-400 font-bold tracking-tighter">LOW</span>
                )}
                {index === high && isSearching && !isFound && (
                  <span className="absolute -bottom-6 text-[9px] text-red-400 font-bold tracking-tighter">HIGH</span>
                )}
              </div>
            );
          })}
        </div>

        {/* CONTROLS */}
        <div className="flex justify-center gap-4">
          <button
            onClick={startSearch}
            disabled={isSearching}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-full transition-all active:scale-95"
          >
            {isSearching ? 'Calculating Mid...' : 'Run Search'}
          </button>
          <button
            onClick={resetDemo}
            disabled={isSearching}
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 font-bold rounded-full border border-slate-700"
          >
            Reset
          </button>
        </div>

        {/* STATUS BAR */}
        <div className="mt-8 text-center h-4">
          {foundIndex !== -1 && (
            <p className="text-green-400 font-bold animate-pulse">
              Match found at index {foundIndex}!
            </p>
          )}
          {!isSearching && low > high && foundIndex === -1 && currentStep !== null && (
            <p className="text-red-400 font-bold italic">
              Target {currentTarget} not found in the set.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}