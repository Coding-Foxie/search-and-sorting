interface SortingHeaderProps {
  sortingAlgorithm: string;
  dataInput: string;
  setDataInput: (val: string) => void;
  isSorting: boolean;
  onStart: () => void;
  onReset: () => void;
  currentArrayLength: number;
  speed: number;
  setSpeed: (val: number) => void;
  onRandomize?: () => void;
}

export const SortingHeader = ({
  sortingAlgorithm, dataInput, setDataInput, isSorting, onStart, onReset, currentArrayLength, speed, setSpeed, onRandomize
}: SortingHeaderProps) => (
  <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
    <h1 className="text-xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent uppercase tracking-tighter">
      InnoTrace: {sortingAlgorithm}
    </h1>

    <div className="flex flex-1 max-w-md gap-3">
      <input
        type="text"
        value={dataInput}
        onChange={(e) => setDataInput(e.target.value)}
        disabled={isSorting}
        className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all opacity-80"
        placeholder="Unsorted: 45, 12, 5, 31..."
      />
      <button
        onClick={onRandomize}
        disabled={isSorting}
        className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-orange-400 transition-all active:rotate-180 duration-500 disabled:opacity-30"
        title="Generate Random Array"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" /><path d="m18 2 4 4-4 4" /><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" /><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" /><path d="m18 14 4 4-4 4" /></svg>
      </button>
    </div>

<div className="flex items-center gap-4 bg-slate-950/50 px-4 py-2 rounded-xl border border-slate-800">
      <span className="text-[10px] font-mono text-slate-500 uppercase">Speed</span>
      <input
        type="range"
        min="50"
        max="1000"
        step="50"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        disabled={isSorting}
        className="w-24 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
      />
      <span className="text-[10px] font-mono text-orange-400 w-8 text-right">{speed}ms</span>
    </div>

    <div className="flex gap-2">
      <button
        onClick={onStart}
        disabled={isSorting || currentArrayLength === 0}
        className="bg-orange-600 hover:bg-orange-500 px-6 py-2 rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-20 shadow-[0_0_20px_rgba(234,88,12,0.3)]"
      >
        {isSorting ? 'SORTING...' : 'START SORT'}
      </button>
      <button onClick={onReset} disabled={isSorting} className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-xl font-bold text-sm border border-slate-700">
        RESET
      </button>
    </div>
  </div>
);