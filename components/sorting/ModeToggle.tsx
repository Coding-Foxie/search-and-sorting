"use client";

import { useVisualizerStore } from '@/store/use-visualizer-store';

const ModeToggle = () => {
  // Grab exactly what you need from the store
  const mode = useVisualizerStore((s) => s.mode);
  const setMode = useVisualizerStore((s) => s.setMode);
  const setIsPaused = useVisualizerStore((s) => s.setIsPaused);

  const handleModeChange = (newMode: 'auto' | 'manual') => {
    setMode(newMode);
    // If switching to manual, auto-pause the execution
    if (newMode === 'manual') {
      setIsPaused(true);
    }
  };

  return (
    <div className="flex items-center p-1 bg-slate-950/50 border border-slate-800 rounded-lg">
      <button
        onClick={() => handleModeChange('auto')}
        className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-bold uppercase transition-all ${mode === 'auto' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-500 hover:text-slate-300'
          }`}
      >
        Auto
      </button>

      <button
        onClick={() => handleModeChange('manual')}
        className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-bold uppercase transition-all ${mode === 'manual' ? 'bg-amber-600/20 text-amber-400' : 'text-slate-500 hover:text-slate-300'
          }`}
      >
        Step
      </button>
    </div>
  );
};

export default ModeToggle;