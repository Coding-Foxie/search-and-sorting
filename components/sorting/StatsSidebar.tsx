interface StatsSidebarProps {
  isSorting: boolean;
  isSwapping: boolean;
  idxA: number;
  idxB: number;
}

export const StatsSidebar = ({ isSorting, isSwapping, idxA, idxB }: StatsSidebarProps) => (
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
        </div>
        {idxA !== -1 && (
          <div className="text-[10px] font-mono text-slate-500 flex justify-between">
            <span>Indices:</span>
            <span>{idxA} & {idxB}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);