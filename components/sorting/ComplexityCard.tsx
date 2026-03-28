"use client";

import React from 'react';

interface ComplexityCardProps {
  bestCase: string;
  averageCase: string;
  worstCase: string;
}

export const ComplexityCard = ({ bestCase, averageCase, worstCase }: ComplexityCardProps) => {
  return (
    <div className="space-y-2">
      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest ml-1">
        Complexity Analysis
      </span>

      <div className="grid grid-cols-3 gap-2">
        {/* BEST CASE */}
        <div className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-3 flex flex-col items-center justify-center transition-all hover:bg-emerald-500/5 group">
          <span className="text-[8px] text-emerald-500/50 uppercase font-bold mb-1">Best</span>
          <span className="text-xs font-mono text-emerald-400 group-hover:scale-110 transition-transform">
            {bestCase}
          </span>
        </div>

        {/* AVERAGE CASE */}
        <div className="bg-slate-900/50 border border-blue-500/20 rounded-xl p-3 flex flex-col items-center justify-center transition-all hover:bg-blue-500/5 group">
          <span className="text-[8px] text-blue-500/50 uppercase font-bold mb-1">Avg</span>
          <span className="text-xs font-mono text-blue-400 group-hover:scale-110 transition-transform">
            {averageCase}
          </span>
        </div>

        {/* WORST CASE */}
        <div className="bg-slate-900/50 border border-red-500/20 rounded-xl p-3 flex flex-col items-center justify-center transition-all hover:bg-red-500/5 group">
          <span className="text-[8px] text-red-500/50 uppercase font-bold mb-1">Worst</span>
          <span className="text-xs font-mono text-red-400 group-hover:scale-110 transition-transform">
            {worstCase}
          </span>
        </div>
      </div>
    </div>
  );
};