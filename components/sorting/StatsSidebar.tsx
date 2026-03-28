interface StatsSidebarProps {
  isSorting: boolean;
  isSwapping: boolean;
  idxA: number;
  idxB: number;
  valA: number | null;
  valB: number | null;
}

export const StatsSidebar = ({ isSorting, isSwapping, idxA, idxB, valA, valB }: StatsSidebarProps) => (
  <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
    <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 shadow-xl">
      <span className="text-[10px] text-slate-500 font-mono uppercase block mb-4 tracking-widest">Complexity</span>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400">Worst Case</span>
          <span className="text-xs font-mono text-red-400">O(n²)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400">Best Case</span>
          <span className="text-xs font-mono text-green-400">O(n)</span>
        </div>
      </div>
    </div>

    <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex-1 shadow-xl">
      <span className="text-[10px] text-slate-500 font-mono uppercase block mb-4 tracking-widest">Live Trace</span>
      <div className="space-y-4">
        <div className={`p-3 rounded-lg border transition-all ${isSwapping ? 'bg-red-500/10 border-red-500/40' : 'bg-slate-900 border-slate-800'}`}>
          <span className="text-[9px] text-slate-500 uppercase block mb-1">Status</span>
          <span className={`text-sm font-bold ${isSwapping ? 'text-red-400' : 'text-purple-400'}`}>
            {isSwapping ? 'SWAPPING' : isSorting ? 'COMPARING' : 'IDLE'}
          </span>

          {/* Comparison Logic */}
          {isSorting && valA !== null && valB !== null && (
            <div className="flex items-center justify-between bg-slate-900 p-2 rounded-md border border-slate-800">
              <div className="flex flex-col items-center">
                <span className="text-[8px] text-slate-600">VAL A</span>
                <span className="text-xs font-bold text-slate-200">{valA}</span>
              </div>
              <span className="text-[10px] font-black text-slate-700 italic">VS</span>
              <div className="flex flex-col items-center">
                <span className="text-[8px] text-slate-600">VAL B</span>
                <span className="text-xs font-bold text-slate-200">{valB}</span>
              </div>
            </div>
          )}
        </div>

        {/* Indices Info */}
        {idxA !== -1 && (
          <div className="text-[10px] font-mono text-slate-500 flex justify-between">
            <span>Indices:</span>
            <span>{idxA} & {idxB}</span>
          </div>
        )}

        {/* Values Info */}
        {valA !== null && valB !== null && (
          <div className="text-[10px] font-mono text-slate-500 flex justify-between">
            <span>Values:</span>
            <span>{valA} & {valB}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);