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
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center p-2 sm:p-4 font-sans text-slate-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col">

        {/* HEADER & INPUTS (Top Bar) */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent uppercase tracking-tighter">
            InnoTrace: Binary
          </h1>

          <div className="flex flex-1 max-w-2xl gap-3">
            <input
              type="text"
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              disabled={isSearching}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none transition-all opacity-80"
              placeholder="Data: 10, 20, 30..."
            />
            <input
              type="number"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              disabled={isSearching}
              className="w-24 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none transition-all opacity-80"
            />
          </div>

          <div className="flex gap-2">
            <button onClick={startSearch} disabled={isSearching} className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl font-bold text-sm transition-transform active:scale-95 disabled:opacity-20">
              {isSearching ? '...' : 'RUN'}
            </button>
            <button onClick={resetDemo} disabled={isSearching} className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-xl font-bold text-sm border border-slate-700">
              RESET
            </button>
          </div>
        </div>

        {/* MAIN DASHBOARD GRID */}
        <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* LEFT COLUMN: STATS & MATH */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-500 font-mono uppercase block mb-1">Binary Steps</span>
              {/* Change the span in your Left Column to this: */}
              <span className="text-3xl font-black text-purple-400">
                {currentStep?.stepNumber ?? 0}
              </span>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono uppercase block mb-1">Vs. Linear</span>
                <span className="text-xl font-bold text-slate-500">{foundIndex !== -1 ? foundIndex + 1 : '—'}</span>
              </div>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 flex-1">
              <span className="text-[10px] text-slate-500 font-mono uppercase block mb-4">Logic Trace</span>
              <div className="font-mono text-xs space-y-2">
                <div className="flex justify-between"><span>Low:</span> <span className="text-blue-400">{low}</span></div>
                <div className="flex justify-between"><span>High:</span> <span className="text-red-400">{high}</span></div>
                <div className="flex justify-between pt-2 border-t border-slate-800"><span>Mid:</span> <span className="text-purple-400 font-bold">{mid}</span></div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: VISUALIZER */}
          <div className="lg:col-span-3 bg-slate-950/30 rounded-2xl border border-slate-800/50 p-8 flex flex-col items-center justify-center relative overflow-hidden">

            <div className="flex flex-wrap gap-2 justify-center max-w-full">
              {currentArray.map((num, index) => {
                const isInactive = (index < low || index > high) && isSearching;
                const isMid = index === mid;
                const isFound = index === foundIndex;

                return (
                  <div
                    key={index}
                    className={`w-12 h-12 flex items-center justify-center rounded-lg border text-sm font-mono transition-all duration-300 relative
                    ${isMid && !isFound ? 'border-purple-400 bg-purple-400/10 scale-110 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'border-slate-800 bg-slate-900'}
                    ${isFound ? 'border-green-500 bg-green-500 text-slate-950 scale-110' : ''}
                    ${isInactive ? 'opacity-10 grayscale scale-90' : 'opacity-100'}
                  `}
                  >
                    {num}
                    {index === low && isSearching && !isFound && <div className="absolute -top-1 w-full h-1 bg-blue-500 rounded-full" />}
                    {index === high && isSearching && !isFound && <div className="absolute -bottom-1 w-full h-1 bg-red-500 rounded-full" />}
                  </div>
                );
              })}
            </div>

            {/* STATUS MESSAGE */}
            <div className="absolute bottom-6 left-0 w-full text-center">
              {foundIndex !== -1 ? (
                <p className="text-green-400 text-sm font-bold tracking-widest uppercase">Target Found at Index {foundIndex}</p>
              ) : isSearching ? (
                <p className="text-purple-400 text-xs font-mono animate-pulse uppercase">Searching Space...</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};