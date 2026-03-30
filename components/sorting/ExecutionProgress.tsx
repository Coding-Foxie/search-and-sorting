export const ExecutionProgress = ({ current, total }: { current: number, total: number }) => {
  const percent = Math.round(((current + 1) / total) * 100) || 0;

  return (
    <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-4 shadow-sm mb-2">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">
            Progress
          </span>
          <div className="text-2xl font-mono font-black text-blue-500 leading-none">
            {percent}<span className="text-xs ml-1 text-blue-800">%</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-slate-600 font-mono uppercase block">Step Counter</span>
          <span className="text-[11px] font-mono text-slate-400">
            {current + 1}<span className="text-slate-700 mx-0.5">/</span>{total}
          </span>
        </div>
      </div>

      {/* Mini Progress Bar for visual reinforcement */}
      <div className="h-1 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(37,99,235,0.4)]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};