"use client";

import { useVisualizerStore } from '@/store/use-visualizer-store';

interface SpeedControlProps {
  isDisabled?: boolean;
}

// Using Standard Function for better Default Parameter support
const SpeedControl = ({
  isDisabled = false
}: SpeedControlProps) => {
  const speed = useVisualizerStore((state) => state.speed);
  const setSpeed = useVisualizerStore((state) => state.setSpeed);

  return (
    <div className={`absolute top-4 right-4 z-30 transition-opacity duration-300 ${isDisabled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <style>{`
        .speed-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 10px;
          width: 10px;
          border-radius: 2px;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
      `}</style>

      <div className="flex items-center gap-3 bg-[#0f172a]/60 backdrop-blur-md border border-slate-800/50 px-3 py-1.5 rounded-lg hover:border-blue-500/30 transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors">
          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
        </svg>

        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">Delay</span>
            <span className="text-[8px] font-mono text-blue-400 font-bold">{speed}ms</span>
          </div>

          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            // speed ?? 400 ensures it's NEVER undefined (Fixes "Uncontrolled" error)
            value={speed ?? 400}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (setSpeed) setSpeed(val); // Safety check (Fixes "Not a function" error)
            }}
            className="speed-slider appearance-none w-24 h-[2px] bg-slate-800 rounded-full outline-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default SpeedControl;