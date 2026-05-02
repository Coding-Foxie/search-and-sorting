"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchStageProps {
  array: number[];
  currentIndex: number;
  foundIndex: number;
  target: number;
  isSearching: boolean;
}

export const SearchStage = ({ array, currentIndex, foundIndex, target, isSearching }: SearchStageProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center py-10">
      {array.map((value, index) => {
        const isCurrent = index === currentIndex;
        const isFound = index === foundIndex;
        const isPassed = index < currentIndex && !isFound;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isPassed ? 0.3 : 1,
              y: 0,
              scale: isCurrent || isFound ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
            className={`
              relative w-16 h-20 flex flex-col items-center justify-center rounded-2xl border-2 font-bold transition-all
              ${isFound ? 'border-emerald-500 bg-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.3)]' :
                isCurrent ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]' :
                  'border-slate-800 bg-slate-900/50'}
            `}
          >
            {/* The Pointer Arrow */}
            <AnimatePresence>
              {isCurrent && !isFound && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-10 text-blue-500 flex flex-col items-center"
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-tighter">Checking</span>
                  <div className="w-0.5 h-4 bg-blue-500 mt-1 animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Value */}
            <span className={`text-2xl ${isFound ? 'text-emerald-400' : isCurrent ? 'text-blue-400' : 'text-slate-300'}`}>
              {value}
            </span>

            {/* Index Label */}
            <span className="absolute -bottom-6 text-[10px] font-mono text-slate-600">i={index}</span>

            {/* Target Match Badge */}
            {isFound && (
              <div className="absolute -top-3 px-2 py-0.5 bg-emerald-500 text-slate-950 text-[8px] font-black rounded-full uppercase">
                Match
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};