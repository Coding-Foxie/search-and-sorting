"use client";

import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';

const LinearSearchDemo = () => {
  const [array] = useState([12, 45, 8, 23, 5, 17, 31]);
  const [target] = useState(23);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [foundIndex, setFoundIndex] = useState(-1);

  // 1. Initialize sounds
  const [playTick] = useSound('/sounds/move.wav', { volume: 0.4 });
  const [playSuccess] = useSound('/sounds/found.wav', { volume: 0.6 });
  const [playError] = useSound('/sounds/error.wav', { volume: 0.5 });

  const startSearch = () => {
    setIsSearching(true);
    setFoundIndex(-1);
    setCurrentIndex(0);
  };

  const resetDemo = () => {
    setIsSearching(false);
    setFoundIndex(-1);
    setCurrentIndex(-1);
  };

  useEffect(() => {
    if (!isSearching) return;

    const timer = setTimeout(() => {
      if (array[currentIndex] === target) {
        setFoundIndex(currentIndex);
        setIsSearching(false);
        playSuccess();
      }
      else if (currentIndex === array.length - 1) {
        setIsSearching(false);
        setCurrentIndex(array.length);
        playError();
      }
      else {
        setCurrentIndex((prev) => prev + 1);
        playTick();
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [currentIndex, isSearching, array, target, playTick, playSuccess, playError]);

  return (
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center overflow-hidden p-4">
      <div className="p-10 bg-slate-900 text-white rounded-2xl shadow-2xl font-sans w-full max-w-3xl border border-slate-800 text-center">

        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Linear Search Visualizer
          </h1>
          <p className="text-slate-500 font-mono text-sm mt-2 italic">Search Target: {target}</p>
        </div>

        {/* THE ARRAY DISPLAY */}
        <div className="flex gap-3 justify-center mb-12">
          {array.map((num, index) => (
            <div
              key={index}
              className={`w-14 h-14 flex items-center justify-center rounded-xl border-2 transition-all duration-300 text-lg font-bold
                  ${index === currentIndex && index !== foundIndex ? 'border-yellow-400 scale-110 bg-slate-800 shadow-[0_0_15px_rgba(250,204,21,0.4)]' : ''}
                  ${index === foundIndex ? 'border-green-500 bg-green-500/20 scale-110 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'border-slate-800 bg-slate-950'}
                  ${index < currentIndex && index !== foundIndex ? 'opacity-20 grayscale' : 'opacity-100'}
                `}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="flex justify-center gap-4">
            <button
              onClick={startSearch}
              disabled={isSearching}
              className="px-10 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-full transition-all active:scale-95 shadow-lg shadow-blue-900/20"
            >
              {isSearching ? 'Searching...' : 'Start Demo'}
            </button>

            <button
              onClick={resetDemo}
              disabled={isSearching}
              className="px-10 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-full border border-slate-700 transition-all active:scale-95"
            >
              Reset
            </button>
          </div>

          {/* STATUS MESSAGE */}
          <div className="h-6">
            {foundIndex !== -1 && (
              <p className="text-green-400 font-bold animate-bounce tracking-wide">
                ✔ Success! Match found at index {foundIndex}
              </p>
            )}
            {!isSearching && currentIndex === array.length && foundIndex === -1 && (
              <p className="text-red-400 font-bold">✘ Value not found in list</p>
            )}
          </div>
          <p className="text-slate-500 text-sm italic">
            &copy; {new Date().getFullYear()} Coding Foxie • Visualizing logic one step at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinearSearchDemo;