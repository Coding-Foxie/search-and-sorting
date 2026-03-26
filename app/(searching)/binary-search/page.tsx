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
    <div className="h-[100dvh] w-full bg-slate-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-6xl h-full max-h-[900px] overflow-hidden flex flex-col">

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
              className="w-24 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none transition-all opacity-80 appearance-none"
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
        <div className="flex-1 min-h-0 p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">

          {/* LEFT COLUMN: STATS & MATH */}
          <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
            {/* Step Counter Card */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 shrink-0">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Efficiency Benchmarking</span>
                {foundIndex !== -1 && (
                  <span className="text-[9px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold animate-pulse">
                    OPTIMIZED
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {/* BINARY STEPS (The Hero) */}
                <div>
                  <span className="text-[10px] text-purple-400 font-mono uppercase block mb-1">Binary Search</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-black transition-colors duration-500 ${foundIndex !== -1 ? 'text-green-400' : 'text-white'}`}>
                      {currentStep?.stepNumber ?? 0}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">STEPS</span>
                  </div>
                </div>

                {/* LINEAR STEPS (The Comparison) */}
                <div className={`pt-4 border-t border-slate-800/50 transition-all duration-500 ${foundIndex !== -1 ? 'opacity-100' : 'opacity-40'}`}>
                  <span className="text-[10px] text-slate-500 font-mono uppercase block mb-1">Linear Equivalent</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-xl font-bold transition-colors duration-500 ${foundIndex !== -1 ? 'text-red-500' : 'text-slate-600'}`}>
                      {foundIndex !== -1 ? foundIndex + 1 : '—'}
                    </span>
                    <span className="text-[10px] text-slate-600 font-mono italic">
                      {foundIndex !== -1 ? 'STOPS NEEDED' : ''}
                    </span>
                  </div>

                  {/* SAVINGS BADGE */}
                  {foundIndex !== -1 && (
                    <p className="text-[10px] text-green-500/80 mt-2 font-mono font-bold italic">
                      ✨ {Math.round(((foundIndex + 1 - currentStep!.stepNumber) / (foundIndex + 1)) * 100)}% Faster
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Logic Trace Card */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 shrink-0">
              <span className="text-[10px] text-slate-500 font-mono uppercase block mb-4 tracking-widest">Logic Trace (Indices)</span>

              <div className="font-mono text-sm space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <span className="text-blue-400 font-bold">LOW</span>
                  <span className="text-blue-200 bg-blue-500/20 px-2 py-0.5 rounded">{low === -1 ? '—' : low}</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-lg bg-red-500/5 border border-red-500/10">
                  <span className="text-red-400 font-bold">HIGH</span>
                  <span className="text-red-200 bg-red-500/20 px-2 py-0.5 rounded">{high === -1 ? '—' : high}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <span className="text-purple-400 font-black">MID</span>
                  <span className="text-purple-100 bg-purple-500/40 px-3 py-0.5 rounded shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                    {mid === -1 ? '—' : mid}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: VISUALIZER */}
          <div className="lg:col-span-3 bg-slate-950/30 rounded-2xl border border-slate-800/50 p-4 flex flex-col items-center justify-center relative overflow-hidden">

            <div className="flex flex-wrap gap-2 justify-center max-w-full">
              {currentArray.map((num, index) => {
                const isInactive = (index < low || index > high) && isSearching;
                const isMid = index === mid;
                const isFound = index === foundIndex;

                return (
                  <div
                    key={index}
                    className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl border-2 text-lg font-bold transition-all duration-300 relative
            ${isMid && !isFound
                        ? 'border-purple-400 bg-purple-500/20 scale-110 shadow-[0_0_30px_rgba(168,85,247,0.4)] z-10 animate-pulse'
                        : 'border-slate-800 bg-slate-950'}
            ${isFound
                        ? 'text-white border-green-500 bg-green-500 scale-125 shadow-[0_0_40px_rgba(34,197,94,0.6)] z-20'
                        : ''}
            ${isInactive ? 'opacity-10 grayscale scale-90' : 'opacity-100'}
          `}
                  >
                    <span className={`${isFound ? 'text-slate-350 font-black' : 'text-slate-200'} transition-colors duration-300`}>
                      {num}
                    </span>

                    {/* FLOATING MID BADGE */}
                    {isMid && isSearching && !isFound && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-purple-500 text-[10px] text-white px-2 py-1 rounded-md font-black shadow-lg animate-bounce uppercase tracking-tighter">
                        Mid
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-500 rotate-45" />
                      </div>
                    )}

                    {/* POINTERS */}
                    {index === low && isSearching && !isFound && (
                      <span className="absolute -bottom-6 text-[10px] text-blue-400 font-mono font-bold tracking-widest uppercase">Low</span>
                    )}
                    {index === high && isSearching && !isFound && (
                      <span className="absolute -bottom-6 text-[10px] text-red-400 font-mono font-bold tracking-widest uppercase">High</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* STATUS MESSAGE AREA */}
            <div className="absolute bottom-8 left-0 w-full flex flex-col items-center justify-center pointer-events-none">
              {foundIndex !== -1 ? (
                <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
                  <div className="bg-green-500 text-slate-950 px-6 py-2 rounded-full font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(34,197,94,0.4)] flex items-center gap-2 mb-2">
                    <span>Target Found!</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </div>
                  <p className="text-green-400 font-mono text-[10px] uppercase tracking-widest opacity-80">
                    Index {foundIndex} located in {currentStep?.stepNumber} steps
                  </p>
                </div>
              ) : isSearching ? (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-purple-400 text-xs font-mono animate-pulse uppercase tracking-[0.3em]">
                    Searching Space...
                  </p>
                  {/* Small loading bar for "Searching" vibe */}
                  <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 animate-[loading_1.5s_infinite_linear]" style={{ width: '40%' }} />
                  </div>
                </div>
              ) : (
                <p className="text-slate-600 text-[10px] font-mono uppercase tracking-widest">
                  Ready to Trace
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};