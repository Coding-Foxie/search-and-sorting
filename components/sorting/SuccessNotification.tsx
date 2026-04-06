"use client";

import { Check } from 'lucide-react';
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
          /* Keep the -50% for centering, and animate the Y axis */
          0% { opacity: 0; transform: translate(-50%, 20px); } 
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes scanline {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        /* Using 'forwards' ensures it stays at the final state of the animation */
        .animate-subtle { 
          animation: subtleSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
      `}</style>

      {/* 1. Ensure the PARENT of this component has 'relative' class! */}
      <div className="absolute bottom-8 left-1/2 z-50 animate-subtle pointer-events-none">
        <div className="relative flex items-center gap-3 bg-slate-950/90 backdrop-blur-md border border-emerald-500/40 px-5 py-2 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.1)] overflow-hidden">

          {/* Technical Scanline */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -skew-x-12 animate-[scanline_3s_linear_infinite]" />

          <Check className="w-5 h-5 text-emerald-400 stroke-[3px]" />

          <div className="flex flex-col">
            <span className="text-emerald-500 font-mono text-[10px] font-black uppercase tracking-[0.2em]">
              Verified
            </span>
            <span className="text-slate-500 font-mono text-[8px] uppercase opacity-40">
              System State: Sorted
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessNotification;