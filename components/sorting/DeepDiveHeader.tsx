import { Terminal, Play, RotateCcw, Pause } from 'lucide-react';

interface DeepDiveHeaderProps {
  algorithmName: string;
  isSorting: boolean;
  onStart: () => void;
  onReset: () => void;
}

export const DeepDiveHeader = ({
  algorithmName,
  isSorting,
  onStart,
  onReset
}: DeepDiveHeaderProps) => (
  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-8">
    {/* Left Side: Title */}
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
        <Terminal size={20} />
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-100">Algorithm Deep-Dive</h2>
        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
          Exploring: {algorithmName}
        </p>
      </div>
    </div>

    {/* Right Side: Quick Controls */}
    <div className="flex items-center gap-2 bg-slate-950/50 p-1.5 rounded-xl border border-slate-800/50 shadow-inner">
      <button
        onClick={onStart}
        disabled={isSorting}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all duration-300 ${isSorting
            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
            : 'bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/20'
          }`}
      >
        {isSorting ? <Pause size={14} className="animate-pulse" /> : <Play size={14} />}
        {isSorting ? 'EXECUTING...' : 'START'}
      </button>

      <button
        onClick={onReset}
        className="p-1.5 rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
        title="Reset Algorithm"
      >
        <RotateCcw size={16} />
      </button>
    </div>
  </div>
);