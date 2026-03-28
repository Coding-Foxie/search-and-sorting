import { ComplexityCard } from './ComplexityCard';
import { DSANumber } from './DSAnumber';

interface StatsSidebarProps {
  isSorting: boolean;
  isSwapping: boolean;
  idxA: number;
  idxB: number;
  valA: number | null;
  valB: number | null;
}

export const StatsSidebar = ({ isSorting, isSwapping, idxA, idxB, valA, valB }: StatsSidebarProps) => (
  <div className="lg:col-span-1 flex flex-col gap-2 overflow-y-auto scrollbar-hide">

    {/* Comparison Card */}
    <ComplexityCard
      bestCase="O(n)"
      averageCase="O(n²)"
      worstCase="O(n²)"
    />

    {/* Live Trace Card */}
    <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex-1 shadow-xl">
      <span className="text-[10px] text-slate-500 font-mono uppercase block mb-4 tracking-widest">Live Trace</span>

      {/* Status Box */}
      <div className="space-y-2">
        <div className={`p-4 rounded-xl border transition-all duration-500 ${isSwapping
            ? 'bg-red-500/10 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
            : 'bg-slate-900 border-slate-800'
          }`}>
          <span className="text-[9px] text-slate-500 uppercase block mb-2 tracking-tighter">Current Operation</span>
          <span className={`text-sm font-black tracking-widest ${isSwapping ? 'text-red-400' : 'text-purple-400'}`}>
            {isSwapping ? 'SWAPPING' : isSorting ? 'COMPARING' : 'IDLE'}
          </span>

          {/* Value Comparison UI */}
          {isSorting && valA !== null && valB !== null && (
            <div className="mt-4 flex items-center justify-around bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
              <DSANumber label="Value A" value={valA} highlight={isSwapping} />
              <div className="text-[10px] font-black text-slate-700 italic px-2">VS</div>
              <DSANumber label="Value B" value={valB} highlight={isSwapping} />
            </div>
          )}
        </div>

        {/* Detailed Data Rows */}
        <div className="space-y-2 px-1">
          {idxA !== -1 && (
            <div className="flex justify-between items-center text-[10px] font-mono border-b border-slate-800/30 pb-2">
              <span className="text-slate-500 uppercase tracking-tighter">Pointer Indices</span>
              <div className="flex gap-2">
                <span className="text-blue-400">i:{idxA}</span>
                <span className="text-blue-400">j:{idxB}</span>
              </div>
            </div>
          )}

          {valA !== null && valB !== null && (
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-slate-500 uppercase tracking-tighter">Raw Data</span>
              <div className="flex gap-2">
                {/* We use DSANumber here too for perfect alignment */}
                <DSANumber value={valA} className="text-[10px]" />
                <span className="text-slate-700">|</span>
                <DSANumber value={valB} className="text-[10px]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);