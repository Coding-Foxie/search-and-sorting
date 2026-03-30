"use client";

import React from 'react';

interface SuccessProps {
  isVisible: boolean;
}

const SuccessNotification: React.FC<SuccessProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes subtleSlide {
          0% { opacity: 0; transform: translate(-50%, 10px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes scanline {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .animate-subtle { animation: subtleSlide 0.4s ease-out forwards; }
      `}</style>

      {/* Positioned right under the array */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 animate-subtle">
        <div className="relative flex items-center gap-3 bg-[#0f172a]/80 backdrop-blur-md border border-green-500/30 px-4 py-1.5 rounded-lg overflow-hidden">

          {/* Technical Scanline across the box */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-green-500/10 to-transparent skew-x-12 animate-[scanline_2s_linear_infinite]" />

          {/* Minimalist Checkmark */}
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>

          <div className="flex items-baseline gap-2">
            <span className="text-green-500 font-mono text-[10px] font-bold uppercase tracking-widest">
              Verified
            </span>
            <span className="text-slate-500 font-mono text-[8px] uppercase opacity-60">
              [ State: Sorted ]
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessNotification;