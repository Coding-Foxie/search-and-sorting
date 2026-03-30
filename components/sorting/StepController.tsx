import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface StepControllerProps {
  current: number;
  total: number;
  isPaused: boolean;
  onStepForward: () => void;
  onStepBackward: () => void;
  onTogglePause: () => void;
}

export const StepController = ({
  current, total, isPaused, onStepForward, onStepBackward, onTogglePause
}: StepControllerProps) => {
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {/* Progress Bar (Tiny & Subtle) */}
      <div className="w-full max-w-[200px] h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${(current / (total - 1)) * 100}%` }}
        />
      </div>

      <div className="flex items-center gap-4">
        <button onClick={onStepBackward} disabled={current <= 0} className="control-btn-style">
          <ChevronLeft size={18} />
        </button>

        <button onClick={onTogglePause} className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20">
          {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
        </button>

        <button onClick={onStepForward} disabled={current >= total - 1} className="control-btn-style">
          <ChevronRight size={18} />
        </button>
      </div>

      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
        Instruction {current + 1} of {total}
      </span>
    </div>
  );
};